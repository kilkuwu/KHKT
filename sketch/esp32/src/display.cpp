#include "display.h"

static Scene* sc[] = {&po_s, &tmp_s, &ecg_s, &bp_s};
static uint16_t id = 0, x = 0, y = 0;

bool DSP::initStartupScreen() {
    // large block of text
    tft.init();  // Init tftS chip, green tab
    // Init touch
    uint16_t calData[5] = {321, 3369, 194, 3638, 4};
    tft.setTouch(calData);
    // init loading screen
    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.fillScreen(TFT_WHITE);
    tft.setCursor(5, 5, 2);
    tft.print("Reset WiFi?");
    tft.setCursor(5, 21, 2);
    tft.print("(Cham de reset)");
    int last = millis();
    int count = 0;
    const int RESET_COUNT = 5;
    while (!tft.getTouch(&x, &y) && count < RESET_COUNT * 1000) {
        count = millis() - last;
        tft.setCursor(5, 56);
        tft.fillRect(0, 56, 128, 20, TFT_WHITE);
        tft.print(RESET_COUNT - count / 1000);
        delay(100);
    }
    tft.fillScreen(TFT_WHITE);

    if (count < RESET_COUNT * 1000) tft.println("DA RESET");
    tft.println("LOADING");
    return count < RESET_COUNT * 1000;
}

void DSP::finishInit() {
    sc[id]->setup();
}

void DSP::cycle() {
    id++;
    if (id == S_SIZE) id = 0;
    tft.fillScreen(TFT_WHITE);
    sc[id]->setup();
}

void DSP::displaySOS() {
    tft.fillScreen(TFT_WHITE);
    tft.setCursor(0, 0, 4);
    tft.println("SOS\n");
    tft.setTextFont(2);
    tft.println(GPS::currentMessage);
}

void DSP::explainNormalTouch() {
    if (y <= 32) {
        cycle();
        return;
    }

    sc[id]->onTouch();
}

void DSP::loop() {
    delay(100);
    if (GPS::SOS_FINISH) {
        sc[id]->setup();
        GPS::SOS_FINISH = 0;
        GPS::currentMessage = "Chua co thong tin";
    }
    if (GPS::SOS_MODE) {
        displaySOS();
        return;
    }
    sc[id]->loop();
    if (BP::isMeasuring) return;
    bool pressed = tft.getTouch(&x, &y);
    if (!pressed) return;

    // begin sos or... not
    Serial.printf("x: %d\ty:%d\n", x, y);
    int last = millis();
    int count = 0;
    const int SOS_TIME = 5;
    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    while (pressed && count < SOS_TIME * 1000) {
        count = millis() - last;
        tft.setCursor(0, 33, 2);
        tft.print(SOS_TIME - count / 1000);
        tft.print("    ");
        delay(100);
        pressed = tft.getTouch(&x, &y);
    }
    if (count < SOS_TIME * 1000) {
        explainNormalTouch();
        return;
    }
    GPS::SOS_MODE = 1;
}