const socket = io();

const heartRate = document.querySelector('.info[data-label="heartRate"]');
const temperature = document.querySelector('.info[data-label="temperature"]');
const bloodPressure = document.querySelector(
  '.info[data-label="bloodPressure"]'
);
const spo2 = document.querySelector('.info[data-label="spo2"]');
const coordinates = document.querySelector('.info[data-label="coordinates"]');

socket.emit("join", ID, true);

socket.on("iot-sendData", (data) => {
  heartRate.innerHTML = data.heartRate;
  temperature.innerHTML = data.temperature;
  bloodPressure.innerHTML = `${data.bloodPressure[0]}/${data.bloodPressure[1]}`;
  spo2.innerHTML = data.spo2;
  coordinates.innerHTML = `x = ${data.coords[0]} / y = ${data.coords[1]}`;
});
