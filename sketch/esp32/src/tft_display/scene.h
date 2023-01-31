#ifndef SCENE_INCLUDE
#define SCENE_INCLUDE
#include "tft.h"

class Scene {
   private:
    void (*__loop)();
    void (*__setup)();
    void (*__onTouch)();

   public:
    Scene(void (*setup)(), void (*loop)(), void (*onTouch)() = NULL);

    void loop();

    void setup();

    void onTouch();
};

#endif