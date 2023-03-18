 
 
 
 
 #include <Arduino.h>
#include <WiFiManager.h>

#include "src/ioc.h"
#include "src/sensors/bp.h"
#include "src/sensors/ecg.h"
#include "src/sensors/gps.h"
#include "src/sensors/po.h"
#include "src/sensors/tmp.h"
#include "src/utils.h"
// nice
#include "src/display.h"

String chipId;
TaskHandle_t handler1, handler2;

void initParts() {
    BP::init(&IOC::emit);
    PO::init(&IOC::emit);
    TMP::init(&IOC::emit);
    ECG::init(&IOC::emit);
    GPS::init(&IOC::emit);
}

void setup() {
    // init serial
    Serial.begin(115200);
    Serial.setDebugOutput(true);
    Serial.printf("\n\n\n");
    Serial.flush();

    chipId = UTIL::getChipId();

    bool resetWiFi = DSP::initStartupScreen();
    WiFiManager wm;
    if (resetWiFi) wm.resetSettings();
    wm.autoConnect((chipId + "_AP").c_str());

    IOC::init(chipId);
    initParts();

    DSP::finishInit();

    // create a task that will be executed in the Task1code() function, with
    // priority 1 and executed on core 0
    xTaskCreatePinnedToCore(
        task1,     /* Task function. */
        "Task1",   /* name of task. */
        10000,     /* Stack size of task */
        NULL,      /* parameter of the task */
        1,         /* priority of the task */
        &handler1, /* Task handle to keep track of created task */
        0);        /* pin task to core 0 */
    delay(500);

    // create a task that will be executed in the Task2code() function, with
    // priority 1 and executed on core 1
    xTaskCreatePinnedToCore(
        task2,     /* Task function. */
        "Task2",   /* name of task. */
        10000,     /* Stack size of task */
        NULL,      /* parameter of the task */
        1,         /* priority of the task */
        &handler2, /* Task handle to keep track of created task */
        1);        /* pin task to core 1 */
    delay(500);
}

void task1(void *parameters) {
    for (;;) {
        GPS::loop();
        delay(1);
        TMP::loop();
        delay(1);
    }
}

void task2(void *parameters) {
    for (;;) {
        PO::loop();
        delay(1);
        BP::loop();
        delay(1);
        ECG::loop();
    }
}

void loop() {
    DSP::loop();
    IOC::loop();
}
