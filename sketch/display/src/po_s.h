#include "bitmap_images/bubble.h"
#include "bitmap_images/heart.h"
#include "scene.h"

#define KINDA_WHITE 0xCE59

namespace PO_S {
int hr, spo2;

void setup() {
    hr = random(80, 90);
    spo2 = random(96, 99);

    tft.setTextColor(TFT_RED, TFT_WHITE);
    tft.fillScreen(TFT_WHITE);
    tft.setCursor(1, 5, 4);
    tft.setTextWrap(true);
    tft.print("HR & SpO2");

    tft.drawFastHLine(0, 32, tft.width(), TFT_BLACK);

    tft.setSwapBytes(true);
    tft.pushImage(6, 40, 48, 48, heart);
    tft.pushImage(6, 104, 48, 48, bubble);

    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.setCursor(64, 48, 2);
    tft.print("Nhip tim: ");
    tft.setCursor(90, 64, 2);
    tft.print("BPM");

    tft.setCursor(64, 112, 2);
    tft.print("SpO2: ");
    tft.setCursor(90, 128, 2);
    tft.print("%");
    tft.setTextColor(TFT_DARKGREEN, TFT_WHITE);
}

void loop() {
    delay(500);
    hr = random(80, 100);
    spo2 = random(96, 100);

    tft.setCursor(64, 64, 2);
    tft.print(hr);
    tft.setCursor(64, 128, 2);
    tft.print(spo2);
}
}  // namespace PO_S

Scene po_s = Scene(&PO_S::setup, &PO_S::loop);
