#ifndef ECG_INCLUDE
#define ECG_INCLUDE
#define MEASURE_ECG

#include <Arduino.h>

#include "../variables.h"

namespace ECG {
void init(bool (*callback)(const String&, double[], int));
void loop();
}  // namespace ECG
#endif