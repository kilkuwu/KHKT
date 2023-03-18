#include "gps.h"

static bool (*emit)(const String&, double[], int);
static uint32_t last = 0, interval = 30000, now;
static bool inCall = 0;

void GPS::init(bool (*callback)(const String&, double[], int)) {
    emit = callback;
#ifdef MEASURE_GPS
    Serial1.begin(115200, SERIAL_8N1, 25, 26);
    pinMode(A9G_START_PIN, OUTPUT);
    digitalWrite(A9G_START_PIN, HIGH);
    delay(5000);
    digitalWrite(A9G_START_PIN, LOW);
    int count = 5;
    while (count > 0) {
        Serial.printf("Waiting for A9G: %ds\n", count);
        count--;
        delay(1000);
    }

    Serial.println("Trying to enable everything");
    String res = "";
    Serial1.println("AT");  // Just Checking
    delay(1000);
    while (Serial1.available()) res += Serial1.readStringUntil('\n');

    Serial1.println("AT+GPS = 1");  // Turning ON GPS
    delay(1000);
    while (Serial1.available()) res += Serial1.readStringUntil('\n');
#endif
    Serial.println("Initialized A9G");
}

bool GPS::update() {
#ifdef MEASURE_GPS
    Serial1.println("AT+LOCATION = 2");
    int last = millis(), now = millis();
    while (!Serial1.available() && now - last < 5000) delay(50), now = millis();
    delay(50);
    if (now - last >= 5000) return 0;
    String res = Serial1.readString();
    Serial.printf("GPS DATA GOT: \n%s", res.c_str());
    res = res.substring(17, 38);
    if (strstr(res.c_str(), "GPS NOT")) return 0;
    if (!strstr(res.c_str(), ",")) return 0;
    int i = 0;
    while (i < res.length() && res[i] != ',') i++;
    String lat = res.substring(2, i);
    String longi = res.substring(i + 1);
    coords[0] = lat.toDouble();
    coords[1] = longi.toDouble();
#else
    coords[0] = 18.3398148;
    coords[1] = 105.9013139;
#endif
    return 1;
}

void GPS::beginSOS() {
    bool updated = update();
    (*emit)("sendSOS", coords, 2);
    Serial1.println("AT+CMGF=1");
    delay(1000);
    Serial1.println("AT+CMGS=\"" SOS_NUM "\"\r");
    delay(1000);
    if (!updated) {
        Serial.println("No Location data");
        Serial1.println("Unable to fetch location. Please try again");
    } else {
        String gmLink = ("http://maps.google.com/maps?q=");
        gmLink += String(coords[0], 8);
        gmLink += "+";
        gmLink += String(coords[1],
                         8);  // http://maps.google.com/maps?q=38.9419+-78.3020
        Serial1.print("SOS!!! Toi dang o day!!");
        Serial1.println(gmLink);
    }

    delay(1000);
    Serial1.println((char)26);
    delay(1000);
    Serial1.println("AT+CMGD=1,4");  // delete stored SMS to save memory
    delay(1000);
    currentMessage = "Dang goi";
    Serial.println(currentMessage);
    Serial1.println("ATD" SOS_NUM);
    inCall = 1;
    while (inCall) {
        while (!Serial1.available()) delay(100);
        delay(100);
        String res = Serial1.readStringUntil('\n');
        Serial.print("FROM GSM: ");
        Serial.println(res);
        if (strstr(res.c_str(), "RING")) {
            Serial.println("It is ringing...");
        } else if (strstr(res.c_str(), "NO CARRIER")) {
            Serial.println("Call ends");
            currentMessage = "Cuoc goi ket thuc";
            inCall = 0;
        } else if (strstr(res.c_str(), "BUSY")) {
            Serial.println("User busy");
            currentMessage = "Nguoi nhan ban";
            inCall = 0;
        }
    }
    SOS_MODE = 0;
    SOS_FINISH = 1;
}

void GPS::loop() {
    if (SOS_MODE) {
        beginSOS();
        return;
    }
    now = millis();
    if (now - last < interval) return;
    if (update()) (*emit)("sendCoords", coords, 2);
    last = now;
}