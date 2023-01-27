#ifndef PO_INCLUDE
#define PO_INCLUDE
#include <MAX30100_PulseOximeter.h>

#include "utils.h"
namespace PO {
bool (*emit)(const String&, double[]);
const unsigned long interval = 1000;
unsigned long last = 0, now;
// 0 for hr, 1 for spo2
double PO[2];

void onBeatDetected() {
    Serial.printf("Beat detected\n");
}

PulseOximeter pox;
void init(bool (*callback)(const String&, double[])) {
    emit = callback;
#ifndef MEASURE_HR_SPO2
    return;
#endif
    Serial.begin(115200);
    pinMode(17, OUTPUT);
    if (!pox.begin()) {
        Serial.printf("FAILED\n");
        for (;;)
            ;
    } else {
        Serial.printf("SUCCESS\n");

        pox.setOnBeatDetectedCallback(onBeatDetected);
    }
    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
}

void update() {
#ifndef MEASURE_HR_SPO2
    PO[0] = UTIL::randomDouble(70, 80);
    PO[1] = UTIL::randomDouble(95, 99);
#else
    pox.update();
    PO[0] = pox.getHeartRate();
    PO[1] = pox.getSpO2();
#endif
}

void loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    (*emit)("sendHRSpO2", PO);
    last = now;
}

}  // namespace PO
#endif