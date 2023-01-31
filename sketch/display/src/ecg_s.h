#include "scene.h"

#define KINDA_WHITE 0xCE59

namespace ECG_S {
int ecgs[32];
int sz = 1;

void add(int u) {
    if (sz < 32)
        ecgs[sz++] = u;
    else {
        for (int i = 0; i < 31; i++) {
            ecgs[i] = ecgs[i + 1];
        }
        ecgs[sz - 1] = u;
    }
}

void tftPrintTitle() {
    tft.setTextColor(TFT_BLACK);
    tft.setCursor(5, 5, 1);
    tft.print("Current ECG: ");
}

void tftPrintCurrentECG() {
    tft.fillRect(0, 15, 128, 17, TFT_WHITE);
    tft.setCursor(5, 15, 2);
    tft.print(ecgs[sz - 1]);
}

void tftDrawGrid() {
    for (int x = 0; x < tft.width(); x += 4) {
        tft.drawFastVLine(x, 32, 128, KINDA_WHITE);
    }
    for (int y = 32; y < tft.height(); y += 4) {
        tft.drawFastHLine(0, y, tft.width(), KINDA_WHITE);
    }
}

void tftDrawGraph() {
    tft.fillRect(0, 32, 128, 128, TFT_WHITE);
    tftDrawGrid();
    for (int i = 1; i < sz; i++) {
        int y1 = map(ecgs[i - 1], 0, 4039, 160, 32);
        int y2 = map(ecgs[i], 0, 4039, 160, 32);
        int x1 = (i - 1) * 4;
        int x2 = i * 4;
        tft.drawLine(x1, y1, x2, y2, TFT_RED);
    }
}

void setup() {
    ecgs[0] = 0;
    tftPrintTitle();
}

void loop() {
    delay(100);
    add(random(4040));
    tftPrintCurrentECG();
    tftDrawGraph();
}
}  // namespace ECG_S

Scene ecg_s = Scene(&ECG_S::setup, &ECG_S::loop);
