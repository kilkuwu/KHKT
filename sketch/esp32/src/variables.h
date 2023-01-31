#ifndef VARI_INCLUDE
#define VARI_INCLUDE

#define KINDA_WHITE 0xCE59
#include <Arduino.h>

namespace BP {
#define START_BP_PIN A15
extern double bp[2];
extern bool isMeasuring;
extern int finishMeasuring;  // 1 for have data and 2 for no data
}  // namespace BP

namespace TMP {
extern double tmp[2];
}

namespace GPS {
#define A9G_START_PIN A14
extern double coords[2];
extern bool SOS_MODE;
extern bool SOS_FINISH;
extern String currentMessage;
}  // namespace GPS

namespace ECG {
#define ECG_MX_SZ 128
extern double ecgs[ECG_MX_SZ];
extern int sz;
}  // namespace ECG

namespace PO {
extern double po[2];
}
#endif