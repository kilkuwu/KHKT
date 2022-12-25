import Device from "../models/Device.js";
import User from "../models/User.js";

export const deviceRegister = async (req, res) => {
  try {
    const { id, forPatient, phoneNumber, information, picturePath } = req.body;

    const { id: userId } = req.user;
    const user = await User.findById(userId);
    if (user == null) return res.status(404).json({ msg: "Not found" });

    const newDevice = new Device({
      forPatient,
      phoneNumber,
      information,
      picturePath,
      _id: id,
      bloodPressures: [],
    });

    user.devices.push(id);
    await user.save();

    const savedDevice = await newDevice.save();

    res.status(201).json(savedDevice);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getDevice = async (req, res) => {
  try {
    const { id: deviceId } = req.params;
    const { id: userId } = req.user;
    const user = await User.findById(userId);
    if (user == null || !user.devices.includes(deviceId))
      return res.status(403).json({ msg: "Access denied" });

    const device = await Device.findById(deviceId);
    if (device == null) return res.status(404).json({ msg: "Not found" });
    res.status(200).json(device);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
