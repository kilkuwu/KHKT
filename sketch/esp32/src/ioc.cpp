#include "ioc.h"

#ifdef PROD
static String HOST = "pamonitor.kilk.ml";
static int PORT = 443;
#else
static String HOST = "192.168.0.170";
static int PORT = 3001;
#endif

SocketIOclient IOC::client;
const int numberOfEvents = 7;
void (*eventHandlers[numberOfEvents])(uint8_t *, const size_t &);

void EH::handleConnect(uint8_t *_, const size_t &length) {
    Serial.printf("[IOc] Connected to url: %s\n", _);
}

void EH::handleDisconnect(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] Disconnected!\n");
}

void EH::handleError(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] get error: %u\n", length);
}

void EH::handleEvent(uint8_t *payload, const size_t &length) {
    Serial.printf("[IOc] get event: %s\n", payload);
}

int IOC::getType(socketIOmessageType_t type) {
    return type - 48;
}

void IOC::socketManager(socketIOmessageType_t type, uint8_t *payload,
                        size_t length) {
    if (type == sIOtype_CONNECT) client.send(sIOtype_CONNECT, "/");
    int baseType = getType(type);
    if (eventHandlers[baseType] != nullptr) {
        (*eventHandlers[baseType])(payload, length);
    }
}

void IOC::init(String &chipId) {
    eventHandlers[getType(sIOtype_CONNECT)] = &EH::handleConnect;
    eventHandlers[getType(sIOtype_DISCONNECT)] = &EH::handleDisconnect;
    eventHandlers[getType(sIOtype_ERROR)] = &EH::handleError;
    eventHandlers[getType(sIOtype_EVENT)] = &EH::handleEvent;
    Serial.printf("HOST: %s\nPORT: %d\n", HOST.c_str(), PORT);
    client.setReconnectInterval(2500);
#ifdef PROD
    client.beginSSL(HOST, PORT, (String("/socket.io/?EIO=4&id=") + chipId));
#else
    client.begin(HOST, PORT, (String("/socket.io/?EIO=4&id=") + chipId));
#endif
    client.onEvent(socketManager);
}

bool IOC::emit(const String &type, double data[], int n) {
    if (WiFi.status() != WL_CONNECTED) return 0;

    if (client.isConnected() == false) return 0;

    DynamicJsonDocument doc(128);
    JsonArray arr = doc.to<JsonArray>();
    arr.add(type);
    for (int i = 0; i < n; i++) {
        arr.add(data[i]);
    }
    String payload;
    serializeJson(doc, payload);
    bool success = IOC::client.sendEVENT(payload);
    if (!success)
        Serial.printf("[IOc] Failed to emit \"%s\": %d\n", type.c_str(),
                      success);
    return success;
}

void IOC::loop() {
    client.loop();
}