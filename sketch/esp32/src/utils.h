#ifndef UTIL_INCLUDE
#define UTIL_INCLUDE
#include <Arduino.h>
namespace UTIL {
String getChipId();
double randomDouble(double minf, double maxf);
int findNextChar(const String& s, int idx, char c);
}  // namespace UTIL
#endif