#ifndef TMP_INCLUDE
#define TMP_INCLUDE
#define MEASURE_TEMP

#include <Adafruit_MLX90614.h>
#include <Arduino.h>

#include "../utils.h"
#include "../variables.h"

namespace TMP {

void init(bool (*callback)(const String&, double[], int));

void update();

void loop();
}  // namespace TMP
#endif