// #define MEASURE_HR_SPO2
// #define MEASURE_TEMP
// #define MEASURE_BP
// #define GET_GPS
// #define MEASURE_GAS
// #define MEASURE_ECG

#ifdef MEASURE_HR_SPO2
#include <MAX30100_PulseOximeter.h>
#endif

#ifdef MEASURE_TEMP
#include <Adafruit_MLX90614.h>
#endif

#include <ArduinoJson.h>
#include <SocketIOclient.h>
#include <WiFiManager.h>

#define str(x) String(x)

String chipId;
String HOST = "172.20.10.2";
int PORT = 3000;

namespace IOC {
    SocketIOclient client;
    const int numberOfEvents = 7;
    void (*eventHandlers[numberOfEvents])(uint8_t *, const size_t &);

    void handleConnect(uint8_t *_, const size_t &length) {
        Serial.printf("[IOc] Connected to url: %s\n", _);

        String payload = str("[\"join\",\"") + chipId + "\"]";

        bool success = false;
        while(!success) {
            delay(1000);
            Serial.printf("[IOc] Trying to join a room\n");
            success = client.sendEVENT(payload);
        }

        Serial.printf("[IOc] Successfully joined a room\n");
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

    int getType(socketIOmessageType_t type) {
        return type - 48;
    }

    void socketManager(socketIOmessageType_t type, uint8_t *payload, size_t length) {
        if(type == sIOtype_CONNECT)
            client.send(sIOtype_CONNECT, "/");
        int baseType = getType(type);
        if(eventHandlers[baseType] != nullptr) {
            (*eventHandlers[baseType])(payload, length);
        }
    }

    void init() {
        eventHandlers[getType(sIOtype_CONNECT)] = &handleConnect;
        eventHandlers[getType(sIOtype_DISCONNECT)] = &handleDisconnect;
        eventHandlers[getType(sIOtype_ERROR)] = &handleError;
        eventHandlers[getType(sIOtype_EVENT)] = &handleEvent;

        client.begin(HOST.c_str(), PORT, "/socket.io/?EIO=4");
        client.onEvent(socketManager);
    }

    void loop() {
        IOC::client.loop();
    }

    void sendLoopEvent(const double &heartRate, const double &SpO2, const double temperature[2], const double bloodPressure[2], const double coords[2]) {
        DynamicJsonDocument doc(512);
        JsonArray arr = doc.to<JsonArray>();
        arr.add("sendData");
        JsonObject param1 = arr.createNestedObject();
        param1["heartRate"] = heartRate;
        param1["SpO2"] = SpO2;
        param1["temperature"][0] = temperature[0];
        param1["temperature"][1] = temperature[1];
        param1["bloodPressure"][0] = bloodPressure[0];
        param1["bloodPressure"][1] = bloodPressure[1];
        param1["coords"][0] = coords[0];
        param1["coords"][1] = coords[1];

        String payload;
        serializeJson(doc, payload);

        bool success = IOC::client.sendEVENT(payload);

        Serial.printf("[IOc] Sending Loop Event: %d\n", success);
    }
}

#ifdef MEASURE_HR_SPO2
namespace PO {
    double heartRate, SpO2;

    void onBeatDetected() {
        Serial.printf("Beat detected\n");
    }

    PulseOximeter pox;
    void init() {
        Serial.begin(115200);
        pinMode(17, OUTPUT);

        if(!pox.begin()) {
            Serial.println("FAILED");
            for(;;)
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
}
#endif

#ifdef MEASURE_TEMP
namespace TMP {
    Adafruit_MLX90614 mlx;

    double ambientTemp, objectTemp;

    void init() {
        mlx.begin();
    }

    void loop() {
        ambientTemp = mlx.readAmbientTempC();
        objectTemp = mlx.readObjectTempC();
    }
}
#endif

void setup() {
    Serial.begin(115200);

    Serial.printf("\n\n\n");
    Serial.flush();

    chipId = String(ESP.getEfuseMac(), HEX);
    chipId.toUpperCase();

    WiFiManager wm;
    wm.autoConnect();

#ifdef MEASURE_HR_SPO2
    PO::init();
#endif
#ifdef MEASURE_TEMP
    TMP::init();
#endif

    IOC::init();
}

const unsigned long interval = 1000;
unsigned long lastSent = 0;
double heartRate, SpO2;
double bloodPressure[2], coords[2], temperature[2];

double randomDouble(double minf, double maxf) {
    return minf + random(1UL << 31) * (maxf - minf) / (1UL << 31); // use 1ULL<<63 for max double values)
}

void loop() {
#ifdef MEASURE_HR_SPO2
    PO::loop();
#endif
#ifdef MEASURE_TEMP
    TMP::loop();
#endif
    IOC::loop();

    unsigned long now = millis();

    if(now - lastSent < interval)
        return;

    lastSent = now;

    if(WiFi.status() != WL_CONNECTED) {
        Serial.printf("[IOc] Not connected to internet\n");
        return;
    }

    if(IOC::client.isConnected() == false) {
        Serial.printf("[IOc] Not connected to server\n");
        return;
    }

#ifdef MEASURE_HR_SPO2
    heartRate = PO::heartRate;
    SpO2 = PO::SpO2;
#else
    heartRate = randomDouble(70, 80);
    SpO2 = randomDouble(95, 100);
#endif

#ifdef MEASURE_TEMP
    temperature[0] = TMP::ambientTemp;
    temperature[1] = TMP::objectTemp;
#else
    temperature[0] = randomDouble(35, 39);
    temperature[1] = randomDouble(35, 39);
#endif

    bloodPressure[0] = random(95, 110);
    bloodPressure[1] = random(70, 85);
    coords[0] = randomDouble(19.5, 19.6);
    coords[1] = randomDouble(105, 105.1);

    IOC::sendLoopEvent(heartRate, SpO2, temperature, bloodPressure, coords);
}
