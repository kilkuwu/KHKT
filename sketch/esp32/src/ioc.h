#ifndef IOC_INCLUDE
#define IOC_INCLUDE
// #define PROD
#include <Arduino.h>
#include <ArduinoJson.h>
#include <SocketIOclient.h>

namespace EH {
void handleConnect(uint8_t *_, const size_t &length);
void handleDisconnect(uint8_t *payload, const size_t &length);
void handleError(uint8_t *payload, const size_t &length);
void handleEvent(uint8_t *payload, const size_t &length);
}  // namespace EH

namespace IOC {
extern SocketIOclient client;

int getType(socketIOmessageType_t type);

void socketManager(socketIOmessageType_t type, uint8_t *payload, size_t length);

void init(String &chipId);

bool emit(const String &type, double data[], int n);

void loop();
}  // namespace IOC
#endif