import React from "react";

import { List } from "@mui/material";
import {} from "@mui/icons-material";
import HeartRateAndSpO2 from "./HeartRateAndSpO2";
import Temperature from "./Temperature";
import BloodPressure from "./BloodPressure";
import Coords from "./Coords";
import ECG from "./ECG";

export default function RawVisualizedData({
  hrSpO2s,
  temperatures,
  coordinates,
  ECGs,
  bloodPressures,
}) {
  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          p: 0,
          borderRadius: 4,
        }}
      >
        <HeartRateAndSpO2 hrSpO2s={hrSpO2s} />
        <ECG ECGs={ECGs} />
        <Temperature temperatures={temperatures} />
        <BloodPressure bloodPressures={bloodPressures} />
        <Coords coordinates={coordinates} />
      </List>
    </>
  );
}
