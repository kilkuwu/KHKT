#include <SPI.h>
#include <TFT_eSPI.h>

#include "src/ecg_s.h"
#include "src/po_s.h"
#include "src/tmp_s.h"

const uint16_t S_SIZE = 3;
Scene* sc[] = {&ecg_s, &po_s, &tmp_s};
uint16_t id = 0, x = 0, y = 0;

void cycle() {
    id++;
    if (id == S_SIZE) id = 0;
    tft.fillScreen(TFT_WHITE);
    sc[id]->setup();
}

void setup(void) {
    Serial.begin(115200);
    Serial.printf("Hello World\n");

    // OR use this initializer if using a 1.8" TFT screen with offset such as
    tft.init();  // Init tftS chip, green tab

    uint16_t calData[5] = {321, 3369, 194, 3638, 4};
    tft.setTouch(calData);

    Serial.printf("Initialized\n");
    delay(500);

    // large block of text
    tft.setTextColor(TFT_BLACK);
    tft.fillScreen(TFT_WHITE);
    sc[id]->setup();
}

void loop() {
    delay(100);
    sc[id]->loop();
    bool pressed = tft.getTouch(&x, &y);
    if (pressed) {
        cycle();
    }
}