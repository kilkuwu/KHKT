#include "tmp_s.h"

void TMP_S::tftMoveCursor(int x, int y) {
    tft.setCursor(tft.getCursorX() + x, tft.getCursorY() + y);
}

void TMP_S::setup() {
    tft.setTextColor(TFT_RED);
    tft.fillScreen(TFT_WHITE);
    tft.setCursor(5, 5, 4);
    tft.setTextWrap(true);
    tft.print(" PPM & ");
    tftMoveCursor(0, -5);
    tft.setTextFont(2);
    tft.print("o");
    tftMoveCursor(0, 5);
    tft.setTextFont(4);
    tft.print("C");

    tft.drawFastHLine(0, 32, tft.width(), TFT_BLACK);

    tft.setSwapBytes(true);
    tft.pushImage(2, 40, 48, 48, gas_sensor);
    tft.pushImage(2, 104, 48, 48, thermometer);

    tft.setTextColor(TFT_BLACK);
    tft.setCursor(56, 40, 2);
    tft.print("Chat luong");
    tft.setCursor(56, 52, 2);
    tft.print("khong khi: ");
    tft.setCursor(96, 72, 2);
    tft.print("PPM");

    tft.setCursor(56, 104, 2);
    tft.print("Nhiet do");
    tft.setCursor(56, 116, 2);
    tft.print("co the: ");
    tft.setCursor(99, 136, 2);
    tft.setTextFont(1);
    tft.print("o");
    tft.setTextFont(2);
    tft.print("C");
    tft.setTextColor(TFT_DARKGREEN, TFT_WHITE);
}

void TMP_S::loop() {
    tft.fillRect(56, 72, 39, 20, TFT_WHITE);
    tft.setCursor(56, 72, 2);
    tft.print(tmp[0], 0);
    tft.fillRect(56, 136, 39, 20, TFT_WHITE);
    tft.setCursor(56, 136, 2);
    tft.print(tmp[1], 2);
}

Scene tmp_s = Scene(&TMP_S::setup, &TMP_S::loop);