#include "bitmap_images/gas_sensor.h"
#include "bitmap_images/thermometer.h"
#include "scene.h"

#define KINDA_WHITE 0xCE59

double randomDouble(double minf, double maxf) {
    return minf + random(1UL << 31) * (maxf - minf) /
                      (1UL << 31);  // use 1ULL<<63 for max double values)
}

namespace TMP_S {
int aq;
double tmp;

void tftMoveCursor(int x, int y) {
    tft.setCursor(tft.getCursorX() + x, tft.getCursorY() + y);
}

void setup() {
    aq = random(750, 1500);
    tmp = randomDouble(15, 16);

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

void loop() {
    delay(500);
    aq = random(750, 1500);
    tmp = randomDouble(15, 16);

    tft.setCursor(56, 72, 2);
    tft.print(aq);
    tft.setCursor(56, 136, 2);
    tft.print(tmp, 2);
}
}  // namespace TMP_S

Scene tmp_s = Scene(&TMP_S::setup, &TMP_S::loop);
