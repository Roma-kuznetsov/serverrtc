import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}
// test new repo main
export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = [];
    console.log("create room");
    socket.emit("room-created", { roomId });
  };
  const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      rooms[roomId].push(peerId);
      socket.join(roomId);
      console.log(1)
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on("disconnect", () => {
      console.log("user left the room", peerId);
      leaveRoom({ roomId, peerId });
    });
  };
  const leaveRoom = ({ peerId, roomId }: IRoomParams) => {
    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
    socket.to(roomId).emit("user-disconnected", peerId);
  };
  socket.on("create-room", createRoom);
  socket.on("join-room", joinedRoom);
};
