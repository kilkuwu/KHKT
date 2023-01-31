#ifndef BP_INCLUDE
#define BP_INCLUDE
#define MEASURE_BP

#include <Arduino.h>

#include "../utils.h"
#include "../variables.h"

namespace BP {

void init(bool (*callback)(const String&, double[], int));
bool update();

void loop();
}  // namespace BP
#endif