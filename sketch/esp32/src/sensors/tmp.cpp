#include "tmp.h"

static bool (*emit)(const String&, double[], int);
static uint32_t last = 0, interval = 1000, now;
static Adafruit_MLX90614 mlx = Adafruit_MLX90614();

void TMP::init(bool (*callback)(const String&, double[], int)) {
    emit = callback;
#ifdef MEASURE_TEMP
    if (!mlx.begin()) {
        Serial.println("Error connecting to MLX sensor. Check wiring.");
        return;
    };
#endif
    tmp[0] = 800;
    Serial.println("Initialized TMP");
}

void TMP::update() {
#ifndef MEASURE_TEMP
    tmp[1] = UTIL::randomDouble(21, 22);
#else
    tmp[1] = mlx.readObjectTempC();
#endif
}

void TMP::loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    int delta = random(5);
    int neg = random(2);
    if (neg) delta = -delta;
    tmp[0] += delta;
    if (tmp[0] > 900)
        tmp[0] -= 2 * delta;
    else if (tmp[0] < 700)
        tmp[0] -= 2 * delta;
    (*emit)("sendTemp", tmp, 2);
    last = now;
}