#ifndef GPS_INCLUDE
#define GPS_INCLUDE
namespace GPS {
bool (*emit)(const String&, double[]);
double coords[2];
const unsigned long interval = 1000;
unsigned long last = 0, now;

void init(bool (*callback)(const String&, double[])) {
    emit = callback;
}

void update() {
    coords[0] = UTIL::randomDouble(95, 110);
    coords[1] = UTIL::randomDouble(60, 70);
}

void loop() {
    update();
    now = millis();
    if (now - last < interval) return;
    (*emit)("sendCoords", coords);
    last = now;
}
}  // namespace GPS
#endif