import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { Server } from "socket.io";

import socketHandler from "./socketHandler.js";

import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import deviceRoutes from "./routes/device.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* API ROUTES */
const api = express.Router();
api.use("/auth", authRoutes);
api.use("/user", userRoutes);
api.use("/device", deviceRoutes);

app.use("/api", api);
app.use(express.static(path.resolve(__dirname, "public")));

/* Socket io setup */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socketHandler);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err, "Mongo did not connect"));
