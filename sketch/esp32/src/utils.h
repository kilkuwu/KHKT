#ifndef UTIL_INCLUDE
#define UTIL_INCLUDE
namespace UTIL {
String getChipId() {
    String chipId;
#ifdef ESP8266
    chipId = String(ESP.getChipId(), HEX);
#else
    chipId = String(ESP.getEfuseMac(), HEX);
#endif
    chipId.toUpperCase();
    return chipId;
}

double randomDouble(double minf, double maxf) {
    return minf + random(1UL << 31) * (maxf - minf) /
                      (1UL << 31);  // use 1ULL<<63 for max double values)
}

int findNextChar(const String& s, int idx, char c) {
    for (int i = idx; i < s.length(); i++) {
        if (s[idx] == c) return i;
    }
    return s.length();
}
}  // namespace UTIL
#endif