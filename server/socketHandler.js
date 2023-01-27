import Device from "./models/Device.js";

/**
 *
 * @param {import("socket.io").Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 */
const socketHandler = async (socket) => {
  const { id, fromWeb } = socket.handshake.query;
  console.log(id, fromWeb);
  if (!fromWeb) {
    // arduino client
    const device = await Device.findById(id);
    if (device == null) {
      console.log("nice");
      return socket.disconnect();
    }

    socket.on("sendHRSpO2", (hr, spo2) => {
      console.log("hrspo2", hr, spo2);
      socket.broadcast.to(id).emit("iot-sendHRSpO2", hr, spo2);
    });

    socket.on("sendTemp", (air, tmp) => {
      console.log("tmp", air, tmp);
      socket.broadcast.to(id).emit("iot-sendTemp", air, tmp);
    });

    socket.on("sendCoords", (x, y) => {
      console.log("coords", x, y);
      socket.broadcast.to(id).emit("iot-sendCoords", x, y);
    });

    socket.on("sendECG", (ecg) => {
      console.log("ECG", ecg);
      socket.broadcast.to(id).emit("iot-sendECG", ecg);
    });

    socket.on("sendBP", async (systolic, diastolic) => {
      console.log("BP", systolic, diastolic);
      device.bloodPressures.push({
        value: { systolic, diastolic },
        timestamp: new Date(),
        metadata: {
          id: id,
        },
      });

      device.bloodPressures.splice(0, device.bloodPressures.length - 50);
      console.log(device.bloodPressures.length);
      await device.save();
      socket.broadcast.to(id).emit("iot-sendBP", systolic, diastolic);
    });
  }

  socket.on("disconnect", () => {
    console.log("A client disconnected from", id);
    socket.broadcast.to(id).emit("client-disconnected");
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.join(id);
  socket.broadcast.to(id).emit("client-connected");
  console.log("A client connected to", id);
};

export default socketHandler;
