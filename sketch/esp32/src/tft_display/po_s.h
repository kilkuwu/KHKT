#ifndef PO_S_INCLUDE
#define PO_S_INCLUDE
#include "../variables.h"
#include "bitmap_images/bubble.h"
#include "bitmap_images/heart.h"
#include "scene.h"

#define KINDA_WHITE 0xCE59

namespace PO_S {
using namespace PO;
void setup();
void loop();
}  // namespace PO_S

extern Scene po_s;
#endif