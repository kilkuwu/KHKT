#ifndef BP_INCLUDE
#define BP_INCLUDE
#include "utils.h"
namespace BP {
bool (*emit)(const String&, double[]);
double BP[2];

void init(bool (*callback)(const String&, double[])) {
    emit = callback;
#ifndef MEASURE_BP
    return;
#endif
    Serial2.begin(115200, SERIAL_8N1, 32, 33);
}

bool update() {
    if (Serial2.available() <= 0) return 0;
    char c = Serial2.read();
    if (c != 'b') {
        String payload = Serial2.readString();
        Serial.print("Data got: ");
        Serial.print(c);
        Serial.println(payload);
        return 0;
    }
    c = Serial2.read();
    if (c != 'p') return 0;
    BP[0] = Serial2.parseFloat();
    BP[1] = Serial2.parseFloat();
    Serial.printf("Finished measuring BP: %f %f\n", BP[0], BP[1]);
    return 1;
}

void loop() {
    if (update()) (*emit)("sendBP", BP);
}

}  // namespace BP
#endif