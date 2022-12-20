// functions for use
function openOrClose(e) {
  const elem = e.target;
  elem.dataset.state = elem.dataset.state == "close" ? "open" : "close";
}

// socketio
const socket = io();

socket.emit("join", ID, true);

// map
let map = L.map("map");
map.setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker, circle, zoomed;

function updateMap(lat, long) {
  if (marker) {
    map.removeLayer(marker);
  }

  if (circle) {
    map.removeLayer(circle);
  }

  marker = L.circleMarker([lat, long]).addTo(map);
  circle = L.circle([lat, long], { radius: 1 }).addTo(map);

  if (!zoomed) {
    const radius = 0.1;
    map.fitBounds(
      [
        [
          [lat - radius, long - radius],
          [lat + radius, long + radius],
        ],
      ],
      13
    );
    zoomed = 1;
  }

  map.setView([lat, long]);
}

function success(pos) {
  const lat = pos.coords.latitude;
  const long = pos.coords.longitude;
  const accuracy = pos.coords.accuracy;

  if (marker) {
    map.removeLayer(marker);
  }

  if (circle) {
    map.removeLayer(circle);
  }

  marker = L.circleMarker([lat, long]).addTo(map);
  circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

  if (!zoomed) zoomed = map.fitBounds(circle.getBounds());

  map.setView([lat, long]);
}

function error(err) {
  if (err.code === 1) {
    alert("Please allow geolocation access");
  } else {
    alert("Cannot get current location");
  }
}

// charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(chartLoad);

class Chart {
  constructor(container, options, arr, maxDatas = 50) {
    this.data = google.visualization.arrayToDataTable([
      arr,
      new Array(arr.length).fill(0),
    ]);
    this.options = options;
    this.chart = new google.visualization.LineChart(container);
    this.maxDatas = maxDatas;
  }

  draw() {
    this.chart.draw(this.data, this.options);
  }

  updateData(arr) {
    if (this.data.getNumberOfRows() > this.maxDatas) {
      this.data.removeRows(0, this.data.getNumberOfRows() - this.maxDatas);
    }

    this.data.addRow(arr);
  }
}

function chartLoad() {
  let hrSpO2Chart = new Chart(
    document.querySelector("#hr-spo2 .chart"),
    {
      title: "Heart Rate and SpO2",
      legend: {
        position: "bottom",
        textStyle: {
          italic: true,
        },
      },
      vAxes: {
        // Adds titles to each axis.
        0: { title: "Heart Rate (BPM)" },
        1: { title: "SpO2 (%)" },
      },
      series: {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 },
      },
    },
    ["Time", "Heart Rate", "SpO2"]
  );

  let tempChart = new Chart(
    document.querySelector("#temperature .chart"),
    {
      title: "Temperature",
      legend: { position: "bottom" },
    },
    ["Time", "Ambient Temperature", "Object Temperature"]
  );

  let bloodPressureChart = new Chart(
    document.querySelector("#blood-pressure .chart"),
    {
      title: "Blood Pressure",
      legend: {
        position: "bottom",
        textStyle: {
          italic: true,
        },
      },
      vAxes: {
        // Adds titles to each axis.
        0: { title: "Systolic (mmHg)" },
        1: { title: "Diastolic (mmHg)" },
      },
      series: {
        0: { targetAxisIndex: 0 },
        1: { targetAxisIndex: 1 },
      },
    },
    ["Time", "Systolic", "Diastolic"]
  );

  const heartRate = document.querySelector("#hr-spo2 .hr-data .raw-data");
  const spO2 = document.querySelector("#hr-spo2 .spo2-data .raw-data");
  const ambientTemp = document.querySelector(
    "#temperature .ambient-data .raw-data"
  );
  const objectTemp = document.querySelector(
    "#temperature .object-data .raw-data"
  );
  const systolic = document.querySelector(
    "#blood-pressure .sys-data .raw-data"
  );
  const diastolic = document.querySelector(
    "#blood-pressure .dia-data .raw-data"
  );
  // const coordinates = document.querySelector(".main-content.coords");

  tempChart.draw();
  hrSpO2Chart.draw();
  bloodPressureChart.draw();

  let index = 0;

  socket.on("iot-sendData", (data) => {
    heartRate.textContent = data.heartRate;
    spO2.textContent = data.SpO2;
    ambientTemp.textContent = data.temperature[0];
    objectTemp.textContent = data.temperature[1];
    systolic.textContent = data.bloodPressure[0];
    diastolic.textContent = data.bloodPressure[1];
    // coordinates.innerHTML = `x = ${data.coords[0]} / y = ${data.coords[1]}`;

    hrSpO2Chart.updateData([index, data.heartRate, data.SpO2]);
    hrSpO2Chart.draw();
    tempChart.updateData([index, data.temperature[0], data.temperature[1]]);
    tempChart.draw();
    bloodPressureChart.updateData([
      index,
      data.bloodPressure[0],
      data.bloodPressure[1],
    ]);
    bloodPressureChart.draw();
    updateMap(data.coords[0], data.coords[1]);

    index++;
  });
}
