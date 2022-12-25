import User from "../models/User.js";
import Device from "../models/Device.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserDevices = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const devices = await Device.find({
      _id: {
        $in: user.devices,
      },
    });
    res.status(200).json(devices);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const addRemoveDevice = async (req, res) => {
  try {
    const { id, deviceId } = req.params;
    const user = await User.findById(id);

    if (user.devices.includes(deviceId)) {
      user.devices = user.devices.filter((id) => id != deviceId);
    } else {
      user.devices.push(deviceId);
    }
    await user.save();
    res.status(200).json(user.devices);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
