#include "bp_s.h"

static bool trying = 0;

void BP_S::setup() {
    tft.fillScreen(TFT_WHITE);
    tft.setTextColor(TFT_RED, TFT_WHITE);
    tft.setCursor(5, 5, 4);
    tft.setTextWrap(true);
    tft.print("HUYET AP");

    tft.drawFastHLine(0, 32, tft.width(), TFT_BLACK);

    tft.setTextColor(TFT_BLACK, TFT_WHITE);
    tft.setCursor(0, 40, 2);
    tft.printf("  Lan cuoi do duoc:\n  SYS: %0.0f\n  DIA: %0.0f\n", bp[0],
               bp[1]);
}

void BP_S::loop() {
    tft.fillRect(0, 33, 128, 128, TFT_WHITE);
    tft.setCursor(0, 40, 2);
    if (isMeasuring || finishMeasuring) trying = 0;
    if (isMeasuring) {
        tft.printf(" Dang do huyet ap\n");
    } else if (finishMeasuring) {
        if (finishMeasuring == 1) {
            tft.printf(" Da do duoc:\n SYS: %0.0f\n DIA: %0.0f", bp[0], bp[1]);
        } else {
            tft.printf(" Da xay ra loi!\n Xin hay thu lai!");
        }
        finishMeasuring = 0;
        delay(3000);
    } else if (trying)
        tft.print(" Chuan bi do huyet ap...");
    else {
        tft.printf(" Lan cuoi do duoc:\n SYS: %0.0f\n DIA: %0.0f\n", bp[0],
                   bp[1]);
    }
    delay(2000);
}

void BP_S::onTouch() {
    digitalWrite(START_BP_PIN, HIGH);
    delay(500);
    digitalWrite(START_BP_PIN, LOW); 
    trying = 1;
}

Scene bp_s = Scene(&BP_S::setup, &BP_S::loop, &BP_S::onTouch);