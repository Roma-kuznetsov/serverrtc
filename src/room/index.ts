import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidV4();
    console.log("create room");
    socket.emit("room-created", { roomId });
  };
  const joinedRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId);
    socket.join(roomId);
  };
  socket.on("create-room", createRoom);
  socket.on("join-room", joinedRoom);
};
