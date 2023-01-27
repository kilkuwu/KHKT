import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import io from "socket.io-client";
import { Typography, Box } from "@mui/material";
import RawVisualizedData from "./RawVisualizedData";
import { SignalWifi4Bar, SignalWifiOff } from "@mui/icons-material";
import { useAuth } from "providers/authProvider";
import Loading from "components/Loading";
import Forbidden from "components/Forbidden";

export async function loader({ params }) {
  return params.deviceId;
}

const MAX_DATA = 50;

// best name =

export default function Device() {
  const deviceId = useLoaderData();

  const socketRef = useRef(null);

  const [auth] = useAuth();

  const [connected, setConnected] = useState(false);

  const [hrSpO2s, setHRSpO2s] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [ECGs, setECGs] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (!auth.user.devices.includes(deviceId)) {
      setForbidden(true);
      return;
    }

    const fetchDevice = async () => {
      const response = await fetch(`/api/device/${deviceId}`, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) setForbidden(true);
      const jsonResponse = await response.json();
      setDevice(jsonResponse);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchDevice();
      return;
    }

    socketRef.current = io({
      query: {
        id: deviceId,
        fromWeb: true,
      },
    });
    const { current: socket } = socketRef;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("iot-sendHRSpO2", (heartRate, spO2) =>
      setHRSpO2s((prev) => [
        ...prev.slice(-MAX_DATA),
        {
          heartRate,
          spO2,
        },
      ])
    );

    socket.on("iot-sendTemp", (airQuality, temperature) => {
      setTemperatures((prev) => [
        ...prev.slice(-MAX_DATA),
        {
          airQuality,
          temperature,
        },
      ]);
    });

    socket.on("iot-sendCoords", (coordX, coordY) =>
      setCoordinates((prev) => [
        ...prev.slice(-MAX_DATA),
        {
          coordX,
          coordY,
        },
      ])
    );

    socket.on("iot-sendECG", (ecg) =>
      setECGs((prev) => [...prev.slice(-MAX_DATA), { ecg }])
    );

    socket.on("iot-sendBP", () => {
      fetchDevice();
    });

    return () => {
      socket.close();
    };
  }, [deviceId, auth, isLoading]);

  if (forbidden)
    return <Forbidden title={"Bạn không có quyền truy cập thiết bị này!"} />;

  if (isLoading) return <Loading title={"Loading data..."} />;

  return (
    <Box sx={{ bgcolor: "#f0f0f0", p: 3, my: 2, borderRadius: 5 }}>
      <Typography variant="h5" fontWeight={"bold"}>
        ID thiết bị: {deviceId}
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight={"light"}
        mb={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {connected ? "Đã kết nối" : "Chưa kết nối"}
        {connected ? (
          <SignalWifi4Bar sx={{ color: "green", mb: 0.5, ml: 1 }} />
        ) : (
          <SignalWifiOff sx={{ color: "#ee0000", mb: 0.5, ml: 1 }} />
        )}
      </Typography>
      <RawVisualizedData
        hrSpO2s={hrSpO2s}
        temperatures={temperatures}
        ECGs={ECGs}
        coordinates={coordinates}
        bloodPressures={device ? device.bloodPressures : []}
      />
    </Box>
  );
}
