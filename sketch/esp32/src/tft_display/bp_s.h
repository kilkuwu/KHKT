#ifndef BP_S_INCLUDE
#define BP_S_INCLUDE
#include "../variables.h"
#include "scene.h"

#define KINDA_WHITE 0xCE59

namespace BP_S {
using namespace BP;
void setup();
void loop();
void onTouch();
}  // namespace BP_S

extern Scene bp_s;
#endif