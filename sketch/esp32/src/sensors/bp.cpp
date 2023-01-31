#include "bp.h"

static bool (*emit)(const String&, double[], int);

void BP::init(bool (*callback)(const String&, double[], int)) {
    emit = callback;
#ifdef MEASURE_BP
    Serial2.begin(115200, SERIAL_8N1, 32, 33);
    pinMode(START_BP_PIN, OUTPUT);
#endif
    Serial.println("Initialized BP");
}

bool BP::update() {
#ifdef MEASURE_BP
    if (Serial2.available() <= 0) return 0;
    char c = Serial2.read();
    if (c != 'b') {
        if (c == 'e') {
            isMeasuring = false;
            finishMeasuring = 2;
        } else if (c == 's') {
            isMeasuring = true;
        }
        String payload = Serial2.readString();
        Serial.print("Data got: \n");
        Serial.println(payload);
        return 0;
    }
    bp[0] = Serial2.parseFloat();
    bp[1] = Serial2.parseFloat();
    Serial.printf("Finished measuring BP: %f %f\n", bp[0], bp[1]);
    isMeasuring = false;
    return 1;
#else
    bp[0] = UTIL::randomDouble(0, 1);
    bp[1] = UTIL::randomDouble(0, 1);
    return 0;
#endif
}

void BP::loop() {
    if (update()) (*emit)("sendBP", bp, 2);
}