#ifndef ECG_S_INCLUDE
#define ECG_S_INCLUDE
#include "../variables.h"
#include "scene.h"

#define KINDA_WHITE 0xCE59

namespace ECG_S {
using namespace ECG;
void tftPrintTitle(const char* title);
void tftPrintCurrentECG();
void tftDrawGrid();
void tftDrawGraph();
void setup();
void loop();
void onTouch();
}  // namespace ECG_S

extern Scene ecg_s;
#endif