#include "variables.h"

double BP::bp[2];
bool BP::isMeasuring = false;
int BP::finishMeasuring = false;

double TMP::tmp[2];

double GPS::coords[2];
bool GPS::SOS_MODE = 0;
bool GPS::SOS_FINISH = 0;
String GPS::currentMessage = "Chua co thong tin";

double ECG::ecgs[ECG_MX_SZ];
int ECG::sz = 0;

double PO::po[2];