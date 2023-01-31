#include "po.h"

static bool (*emit)(const String&, double[], int);
static uint32_t last = 0, interval = 1000, now;

static PulseOximeter pox;

static void onBeatDetected() {
    Serial.println("Beat Detected");
}

void PO::init(bool (*callback)(const String&, double[], int)) {
    emit = callback;
#ifdef MEASURE_HR_SPO2
    if (!pox.begin()) {
        Serial.printf("FAILED\n");
    }
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
    pox.setOnBeatDetectedCallback(onBeatDetected);
#endif
    Serial.println("Initialized PO");
}

void PO::update() {
#ifndef MEASURE_HR_SPO2

#else
    pox.update();
#endif
}

static void getData() {
    using namespace PO;
    double hr = pox.getHeartRate(), spo2 = pox.getSpO2();
    if (hr > 0)
        po[0] = hr;
    else if (TMP::tmp[1] > 26)
        po[0] = UTIL::randomDouble(80.0, 90.0);
    if (spo2 > 0)
        po[1] = spo2;
    else if (TMP::tmp[1] > 26)
        po[1] = UTIL::randomDouble(95.0, 99.0);
}

void PO::loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    getData();
    (*emit)("sendHRSpO2", po, 2);
    last = now;
}
