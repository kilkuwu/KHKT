#ifndef TMP_INCLUDE
#define TMP_INCLUDE
#include <Adafruit_MLX90614.h>

namespace TMP {
Adafruit_MLX90614 mlx;

double tmp[2];
bool (*emit)(const String&, double[]);
const unsigned long interval = 1000;
unsigned long last = 0, now;

void init(bool (*callback)(const String&, double[])) {
    emit = callback;
#ifndef MEASURE_TEMP
    return;
#endif
    mlx.begin();
}

void update() {
#ifndef MEASURE_TEMP
    tmp[0] = UTIL::randomDouble(21, 22);
    tmp[1] = UTIL::randomDouble(21, 22);
#else
    tmp[0] = mlx.readAmbientTempC();
    tmp[1] = mlx.readObjectTempC();
#endif
}

void loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    (*emit)("sendTemp", tmp);
    last = now;
}
}  // namespace TMP
#endif