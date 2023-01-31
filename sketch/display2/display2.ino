#include <SPI.h>
#include <TFT_eSPI.h>

#include "src/bmpimgs/bubble.h"
#include "src/bmpimgs/heart.h"

TFT_eSPI tft = TFT_eSPI();

void setup() {
    Serial.begin(115200);
    Serial.printf("Hello World\n");

    tft.init();

    tft.setTextColor(TFT_RED, TFT_WHITE);
    tft.fillScreen(TFT_WHITE);
    tft.setCursor(1, 5, 4);
    tft.setTextWrap(true);
    tft.print("HR & SpO2");

    tft.drawFastHLine(0, 32, tft.width(), TFT_BLACK);

    tft.setSwapBytes(true);
    tft.pushImage(6, 40, 48, 48, heart);
    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.setCursor(64, 48, 2);
    tft.print("Nhip tim: ");
    tft.setCursor(64, 64, 2);
    tft.setTextColor(TFT_DARKGREEN, TFT_WHITE);
    tft.print("97 ");
    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.print("BPM");
    
    tft.pushImage(6, 104, 48, 48, bubble);
    tft.setCursor(64, 112, 2);
    tft.print("SpO2: ");
    tft.setTextColor(TFT_DARKGREEN, TFT_WHITE);
    tft.setCursor(64, 128, 2);
    tft.print("98 ");
    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.print("%");
}

void loop() {
    delay(200);
}