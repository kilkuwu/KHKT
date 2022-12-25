import mongoose, { mongo } from "mongoose";

const DayTimeSeriesSchema = new mongoose.Schema(
  {
    value: Object,
    timestamp: Date,
    metadata: Object,
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "hours",
    },
    autoCreate: false,
    _id: false,
  }
);

const DeviceSchema = new mongoose.Schema(
  {
    _id: String,
    forPatient: {
      type: String,
      required: true,
      min: 4,
      max: 101,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      default: "",
    },
    picturePath: {
      type: String,
      default: "",
    },
    bloodPressures: [DayTimeSeriesSchema],
  },
  { timestamps: true }
);

const Device = mongoose.model("Device", DeviceSchema);
export default Device;
