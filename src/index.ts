import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({}));

const server = http.createServer(app);

app.get("/test", (req, res) => {
  const a = req;
  res.send("Server working!");
});

const io = new Server(server, {
  cors: {
    origin: process.env.CORS || "*",
  },
});

// socket core
io.on("connection", (socket) => {
  const date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} --> USER IS CONNECTED`);

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started port ${PORT}`);
});
