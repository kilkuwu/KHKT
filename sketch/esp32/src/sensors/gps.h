#ifndef GPS_INCLUDE
#define GPS_INCLUDE
#include <Arduino.h>
#define MEASURE_GPS
//
#include "../utils.h"
#include "../variables.h"

#define SOS_NUM "+84911125212"
#define AUTO_START_PIN A14

namespace GPS {
void init(bool (*callback)(const String&, double[], int));
bool update();
void beginSOS();
void loop();
}  // namespace GPS
#endif