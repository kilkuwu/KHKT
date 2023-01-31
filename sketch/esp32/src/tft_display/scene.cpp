#include "scene.h"

Scene::Scene(void (*setup)(), void (*loop)(), void (*onTouch)()) {
    __setup = setup;
    __loop = loop;
    __onTouch = onTouch;
}

void Scene::loop() {
    (*__loop)();
}

void Scene::setup() {
    (*__setup)();
}

void Scene::onTouch() {
    if (__onTouch == NULL) return;
    Serial.println("Touch function activated");
    (*__onTouch)();
}