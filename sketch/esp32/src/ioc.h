#ifndef IOC_INCLUDE
#define IOC_INCLUDE
#include <ArduinoJson.h>
#include <SocketIOclient.h>

namespace EventHandler {
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
}  // namespace EventHandler

namespace IOC {
#ifdef PROD
String HOST = "pamonitor.kilk.ml";
int PORT = 443;
#else
String HOST = "192.168.1.18";
int PORT = 3001;
#endif

SocketIOclient client;
const int numberOfEvents = 7;
void (*eventHandlers[numberOfEvents])(uint8_t *, const size_t &);

int getType(socketIOmessageType_t type) {
    return type - 48;
}

void socketManager(socketIOmessageType_t type, uint8_t *payload,
                   size_t length) {
    if (type == sIOtype_CONNECT) client.send(sIOtype_CONNECT, "/");
    int baseType = getType(type);
    if (eventHandlers[baseType] != nullptr) {
        (*eventHandlers[baseType])(payload, length);
    }
}

void init(String &chipId) {
    eventHandlers[getType(sIOtype_CONNECT)] = &EventHandler::handleConnect;
    eventHandlers[getType(sIOtype_DISCONNECT)] =
        &EventHandler::handleDisconnect;
    eventHandlers[getType(sIOtype_ERROR)] = &EventHandler::handleError;
    eventHandlers[getType(sIOtype_EVENT)] = &EventHandler::handleEvent;
#ifdef PROD
    client.beginSSL(HOST, PORT, (String("/socket.io/?EIO=4&id=") + chipId));
#else
    client.begin(HOST, PORT, (String("/socket.io/?EIO=4&id=") + chipId));
#endif
    client.onEvent(socketManager);
}

bool emit(const String &type, double data[]) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.printf("[IOc] Not connected to internet\n");
        return 0;
    }

    if (IOC::client.isConnected() == false) {
        Serial.printf("[IOc] Not connected to server\n");
        return 0;
    }

    DynamicJsonDocument doc(128);
    JsonArray arr = doc.to<JsonArray>();
    arr.add(type);
    int n = type == "sendECG" ? 1 : 2;
    for (int i = 0; i < n; i++) {
        arr.add(data[i]);
    }
    String payload;
    serializeJson(doc, payload);
    bool success = IOC::client.sendEVENT(payload);
    Serial.printf("[IOc] Emit \"%s\": %d\n", type.c_str(), success);
    return success;
}

void loop() {
    IOC::client.loop();
}
}  // namespace IOC
#endif