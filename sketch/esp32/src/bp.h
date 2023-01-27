#ifndef BP_INCLUDE
#define BP_INCLUDE
#include "utils.h"
namespace BP {
bool (*emit)(const String&, double[]);
double BP[2];
const unsigned long interval = 120000;
unsigned long last = 0, now;

void init(bool (*callback)(const String&, double[])) {
    emit = callback;
}

void update() {
    BP[0] = UTIL::randomDouble(95, 110);
    BP[1] = UTIL::randomDouble(60, 70);
}

void loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    (*emit)("sendBP", BP);
    last = now;
}

}  // namespace BP
#endif