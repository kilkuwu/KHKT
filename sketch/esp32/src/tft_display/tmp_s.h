#ifndef TMP_S_INCLUDE
#define TMP_S_INCLUDE
#include "bitmap_images/gas_sensor.h"
#include "bitmap_images/thermometer.h"
#include "scene.h"
// var
#include "../variables.h"

namespace TMP_S {
using namespace TMP;
void tftMoveCursor(int x, int y);
void setup();
void loop();
}  // namespace TMP_S

extern Scene tmp_s;
#endif