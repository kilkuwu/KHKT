#include "ecg.h"

static bool (*emit)(const String&, double[], int);

void ECG::init(bool (*callback)(const String&, double[], int)) {
    emit = callback;
    Serial.println("Initialized ECG");
}

void ECG::loop() {
    if (!doneMeasureECG) return;
    doneMeasureECG = 0;
    (*emit)("sendECG", ecgs, ECG_MX_SZ);
}