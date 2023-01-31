#ifndef PO_INCLUDE
#define PO_INCLUDE
#define MEASURE_HR_SPO2
#include <Arduino.h>
#include <MAX30100_PulseOximeter.h>

#include "../utils.h"
#include "../variables.h"
namespace PO {
void init(bool (*callback)(const String&, double[], int));
void update();
void loop();
}  // namespace PO
#endif