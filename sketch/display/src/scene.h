#ifndef SCENE_INCLUDE
#define SCENE_INCLUDE
#include "tft.h"

class Scene {
   private:
    void (*__loop)();
    void (*__setup)();

   public:
    Scene(void (*setup)(), void (*loop)()) {
        __setup = setup;
        __loop = loop;
    }

    void loop() {
        (*__loop)();
    }

    void setup() {
        (*__setup)();
    }
};

#endif