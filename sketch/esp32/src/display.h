#ifndef DISPLAY_INCLUDE
#define DISPLAY_INCLUDE
#include <Arduino.h>

#include "tft_display/tft.h"
#include "variables.h"
// sensors
#include "tft_display/bp_s.h"
#include "tft_display/ecg_s.h"
#include "tft_display/po_s.h"
#include "tft_display/tmp_s.h"

#define S_SIZE 4

namespace DSP {
bool initStartupScreen();
void finishInit();
void cycle();
void displaySOS();
void explainNormalTouch();
void loop();
}  // namespace DSP
#endif