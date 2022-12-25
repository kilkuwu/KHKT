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

    socket.on("sendData", (data) => {
      socket.broadcast.to(id).emit("iot-sendData", data);
    });

    socket.on("sendBP", async (data) => {
      const { systolic, diastolic } = data;

      device.bloodPressures.push({
        value: { systolic, diastolic },
        timestamp: new Date(),
        metadata: {
          id: id,
        },
      });

      await device.save();
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
