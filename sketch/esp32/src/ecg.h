#ifndef ECG_INCLUDE
#define ECG_INCLUDE
namespace ECG {
bool (*emit)(const String&, double[]);
double ecg[1];
const unsigned long interval = 1000;
unsigned long last = 0, now;

void init(bool (*callback)(const String&, double[])) {
    emit = callback;
}

void update() {
    ecg[0] = UTIL::randomDouble(50, 128);
}

void loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    (*emit)("sendECG", ecg);
    last = now;
}
}  // namespace ECG
#endif