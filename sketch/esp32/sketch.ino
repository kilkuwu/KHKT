// #define MEASURE_HR_SPO2
// #define MEASURE_TEMP
// #define MEASURE_BP
// #define GET_GPS
// #define MEASURE_ECG
#define PROD

#include <ArduinoJson.h>
#include <SocketIOclient.h>
#include <WiFiManager.h>

namespace IOC {
#ifdef PROD
String HOST = "pamonitor.kilk.ml";
int PORT = 443;
#else
String HOST = "192.168.235.236";
int PORT = 3001;
#endif

SocketIOclient client;
const int numberOfEvents = 7;
void (*eventHandlers[numberOfEvents])(uint8_t *, const size_t &);

void handleConnect(uint8_t *_, const size_t &length) {
    Serial.printf("[IOc] Connected to url: %s\n", _);
}

void handleDisconnect(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] Disconnected!\n");
}

void handleError(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] get error: %u\n", length);
}

void handleEvent(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] get event: %s\n", payload);
}

int getType(socketIOmessageType_t type) { return type - 48; }

void socketManager(socketIOmessageType_t type, uint8_t *payload,
                   size_t length) {
    if (type == sIOtype_CONNECT) client.send(sIOtype_CONNECT, "/");
    int baseType = getType(type);
    if (eventHandlers[baseType] != nullptr) {
        (*eventHandlers[baseType])(payload, length);
    }
}

void init(String &chipId) {
    eventHandlers[getType(sIOtype_CONNECT)] = &handleConnect;
    eventHandlers[getType(sIOtype_DISCONNECT)] = &handleDisconnect;
    eventHandlers[getType(sIOtype_ERROR)] = &handleError;
    eventHandlers[getType(sIOtype_EVENT)] = &handleEvent;

    client.beginSSL(HOST, PORT, (String("/socket.io/?EIO=4&id=") + chipId));
    client.onEvent(socketManager);
}

void loop() { IOC::client.loop(); }

void sendLoopEvent(const double hrAndSpO2[2], const double temperature[2],
                   const double coords[2], const double &ECG) {
    DynamicJsonDocument doc(512);
    JsonArray arr = doc.to<JsonArray>();
    arr.add("sendData");
    JsonObject param1 = arr.createNestedObject();
    param1["hrAndSpO2"][0] = hrAndSpO2[0];
    param1["hrAndSpO2"][1] = hrAndSpO2[1];
    param1["temperature"][0] = temperature[0];
    param1["temperature"][1] = temperature[1];
    param1["coords"][0] = coords[0];
    param1["coords"][1] = coords[1];
    param1["ECG"] = ECG;

    String payload;
    serializeJson(doc, payload);

    bool success = IOC::client.sendEVENT(payload);

    Serial.printf("[IOc] Sending Loop Event: %d\n", success);
}

void sendBP(const double &systolic, const double &diastolic) {
    DynamicJsonDocument doc(256);
    JsonArray arr = doc.to<JsonArray>();
    arr.add("sendBP");
    JsonObject param1 = arr.createNestedObject();
    param1["systolic"] = systolic;
    param1["diastolic"] = diastolic;

    String payload;
    serializeJson(doc, payload);

    bool success = IOC::client.sendEVENT(payload);

    Serial.printf("[IOc] Sending BP Event: %d\n", success);
}
}  // namespace IOC

#ifdef MEASURE_HR_SPO2
#include <MAX30100_PulseOximeter.h>

namespace PO {
double heartRate, SpO2;

void onBeatDetected() { Serial.printf("Beat detected\n"); }

PulseOximeter pox;
void init() {
    Serial.begin(115200);
    pinMode(17, OUTPUT);

    if (!pox.begin()) {
        Serial.println("FAILED");
        for (;;)
            ;
    } else {
        Serial.println("SUCCESS");

        pox.setOnBeatDetectedCallback(onBeatDetected);
    }

    pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
}

void loop() {
    pox.update();
    heartRate = pox.getHeartRate();
    SpO2 = pox.getSpO2();
}

void debug() { Serial.printf("HR: %f ; SPO2: %f\n", heartRate, SpO2); }
}  // namespace PO
#endif
#ifdef MEASURE_TEMP
#include <Adafruit_MLX90614.h>

namespace TMP {
Adafruit_MLX90614 mlx;

double ambientTemp, objectTemp;

void init() { mlx.begin(); }

void loop() {
    ambientTemp = mlx.readAmbientTempC();
    objectTemp = mlx.readObjectTempC();
}

void debug() {
    Serial.printf("Ambient: %f ; Object: %f\n", ambientTemp, objectTemp);
}
}  // namespace TMP
#endif
#ifdef MEASURE_ECG

#endif

String chipId;

void setup() {
    Serial.begin(115200);

    Serial.setDebugOutput(true);

    Serial.printf("\n\n\n");
    Serial.flush();
#ifdef ESP8266
    chipId = String(ESP.getChipId(), HEX);
#else
    chipId = String(ESP.getEfuseMac(), HEX);
#endif
    chipId.toUpperCase();

    WiFiManager wm;
    wm.autoConnect();

#ifdef MEASURE_HR_SPO2
    PO::init();
#endif
#ifdef MEASURE_TEMP
    TMP::init();
#endif

    IOC::init(chipId);
}

const unsigned long interval = 1000, BPInterval = 60000;
unsigned long lastSent = 0, lastBPSent = 0;
double hrAndSpO2[2], bloodPressure[2], coords[2], temperature[2], ECG;

double randomDouble(double minf, double maxf) {
    return minf + random(1UL << 31) * (maxf - minf) /
                      (1UL << 31);  // use 1ULL<<63 for max double values)
}

void loop() {
#ifdef MEASURE_ECG
    ECG::loop();
#endif
#ifdef MEASURE_HR_SPO2
    PO::loop();
#endif
#ifdef MEASURE_TEMP
    TMP::loop();
#endif
    IOC::loop();

    unsigned long now = millis();

    if (now - lastSent < interval) return;

    lastSent = now;

    if (WiFi.status() != WL_CONNECTED) {
        Serial.printf("[IOc] Not connected to internet\n");
        return;
    }

    if (IOC::client.isConnected() == false) {
        Serial.printf("[IOc] Not connected to server\n");
        return;
    }

#ifdef MEASURE_HR_SPO2
    hrAndSpO2[0] = PO::heartRate;
    hrAndSpO2[1] = PO::SpO2;
#else
    hrAndSpO2[0] = randomDouble(70, 80);
    hrAndSpO2[1] = randomDouble(95, 100);
#endif

#ifdef MEASURE_TEMP
    temperature[0] = TMP::ambientTemp;
    temperature[1] = TMP::objectTemp;
#else
    temperature[0] = randomDouble(21, 22);
    temperature[1] = randomDouble(21, 22);
#endif

    coords[0] = randomDouble(18.50, 18.51);
    coords[1] = randomDouble(105.05, 105.1);

    ECG = randomDouble(50, 128);

    IOC::sendLoopEvent(hrAndSpO2, temperature, coords, ECG);

    if (now - lastBPSent < BPInterval) return;
    lastBPSent = now;
    bloodPressure[0] = randomDouble(95, 110);
    bloodPressure[1] = randomDouble(60, 70);

    IOC::sendBP(bloodPressure[0], bloodPressure[1]);
}
