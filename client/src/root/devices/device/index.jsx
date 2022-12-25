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

export default function Device() {
  const deviceId = useLoaderData();

  const socketRef = useRef(null);

  const [auth] = useAuth();

  const [connected, setConnected] = useState(false);

  const [realtimeData, setRealtimeData] = useState({
    hrSpO2s: [],
    temperatures: [],
    coordinates: {},
  });
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (!auth.user.devices.includes(deviceId)) {
      setForbidden(true);
      return;
    }

    if (isLoading) {
      fetch(`/api/device/${deviceId}`, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) setForbidden(true);
          return response.json();
        })
        .then((response) => {
          setDevice(response);
          setIsLoading(false);
        });
      return;
    }

    socketRef.current = io({
      query: {
        id: deviceId,
        fromWeb: true,
      },
    });

    const { current: socket } = socketRef;

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("iot-sendData", (sentData) => {
      const { hrAndSpO2, temperature, coords } = sentData;

      setRealtimeData((prev) => {
        return {
          hrSpO2s: [
            ...prev.hrSpO2s.slice(prev.hrSpO2s.length - MAX_DATA + 1),
            {
              heartRate: hrAndSpO2[0],
              spO2: hrAndSpO2[1],
            },
          ],
          temperatures: [
            ...prev.temperatures.slice(prev.temperatures.length - MAX_DATA + 1),
            {
              ambientTemperature: temperature[0],
              objectTemperature: temperature[1],
            },
          ],
          coordinates: {
            coordX: coords[0],
            coordY: coords[1],
          },
        };
      });
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
        data={realtimeData}
        bloodPressures={device ? device.bloodPressures : []}
      />
    </Box>
  );
}
