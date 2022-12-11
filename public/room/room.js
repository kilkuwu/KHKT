const socket = io();

const heartRate = document.querySelector(".main-content.heartRate");
const temperature = document.querySelector(".main-content.temperature");
const bloodPressure = document.querySelector(".main-content.bloodPressure");
const spo2 = document.querySelector(".main-content.spo2");
const coordinates = document.querySelector(".main-content.coords");

socket.emit("join", ID, true);

socket.on("iot-sendData", (data) => {
  console.log({
    heartRate,
    temperature,
    bloodPressure,
    spo2,
    coordinates,
  });
  heartRate.innerHTML = data.heartRate;
  temperature.innerHTML = data.temperature;
  bloodPressure.innerHTML = `${data.bloodPressure[0]}/${data.bloodPressure[1]}`;
  spo2.innerHTML = data.spo2;
  coordinates.innerHTML = `x = ${data.coords[0]} / y = ${data.coords[1]}`;
});
