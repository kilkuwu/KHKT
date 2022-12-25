import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, picturePath } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: passwordHash,
      picturePath,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ msg: "Used email." });
    }
    res.status(500).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  const INVALID_CREDENTIALS = "Invalid email or password.";
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: INVALID_CREDENTIALS });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: INVALID_CREDENTIALS });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const verify = async (req, res) => {
  const { accessToken } = req.body;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user == null)
      return res.status(404).json({
        msg: "Cannot find a user with the given email",
      });
    const foundUser = user.toJSON();
    delete foundUser.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      user: foundUser,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
