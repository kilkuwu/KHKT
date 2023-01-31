#include "ecg_s.h"

void ECG_S::tftPrintTitle(const char* title) {
    tft.setTextColor(TFT_BLACK);
    tft.setCursor(5, 5, 1);
    tft.setTextWrap(1);
    tft.print(title);
}

void ECG_S::tftDrawGrid() {
    for (int x = 0; x < tft.width(); x += 4)
        tft.drawFastVLine(x, 32, 128, KINDA_WHITE);
    for (int y = 32; y < tft.height(); y += 4)
        tft.drawFastHLine(0, y, tft.width(), KINDA_WHITE);
}

void ECG_S::tftDrawGraph() {
    tft.fillRect(0, 32, 128, 128, TFT_WHITE);
    tftDrawGrid();
    if (!sz) return;
    int itv = 128 / ECG_MX_SZ;
    for (sz = 0; sz < ECG_MX_SZ; sz++) {
        int y1 = map(ecgs[sz - 1], 0, 4096, 160, 32);
        int y2 = map(ecgs[sz], 0, 4096, 160, 32);
        int x1 = (sz - 1) * itv;
        int x2 = sz * itv;
        tft.drawLine(x1, y1, x2, y2, TFT_RED);
    }
}

void ECG_S::setup() {
    tft.fillScreen(TFT_WHITE);
    tftPrintTitle("ECG lan truoc (mV): ");
    tftDrawGraph();
}

void ECG_S::loop() {
    delay(1);
}

void ECG_S::onTouch() {
    Serial.println("Touched");
    tft.fillScreen(TFT_WHITE);
    tftPrintTitle("Tien hanh do ECG");
    tftDrawGrid();
    uint32_t now, last;
    last = millis();
    now = last;
    int itv = 128 / ECG_MX_SZ;
    int rate = 50 * 256 / ECG_MX_SZ;
    for (sz = 0; sz < ECG_MX_SZ; sz++) {
        while (now - last < rate) {
            delay(5);
            now = millis();
        }
        last = now;
        ecgs[sz] = analogRead(A7);
        int y1 = map(ecgs[sz - 1], 0, 4096, 160, 32);
        int y2 = map(ecgs[sz], 0, 4096, 160, 32);
        int x1 = (sz - 1) * itv;
        int x2 = sz * itv;
        tft.drawLine(x1, y1, x2, y2, TFT_RED);
    }

    tft.fillScreen(TFT_WHITE);
    tftPrintTitle("Do ECG thanh cong!");
    delay(2500);
    setup();
}

Scene ecg_s = Scene(&ECG_S::setup, &ECG_S::loop, &ECG_S::onTouch);