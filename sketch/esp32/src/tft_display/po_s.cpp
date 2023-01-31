#include "po_s.h"

void PO_S::setup() {
    tft.fillScreen(TFT_WHITE);
    tft.setTextColor(TFT_RED, TFT_WHITE);
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

void PO_S::loop() {
    tft.setTextWrap(false);
    tft.fillRect(64, 64, 25, 20, TFT_WHITE);
    tft.setCursor(64, 64, 2);
    tft.print(po[0], 0);
    tft.fillRect(64, 128, 25, 20, TFT_WHITE);
    tft.setCursor(64, 128, 2);
    tft.print(po[1], 0);
}

Scene po_s = Scene(&PO_S::setup, &PO_S::loop);