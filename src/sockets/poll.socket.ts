import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

let io: Server;

export const initSocket = (server: HTTPServer) => {
  io = new Server(server, {
    cors: {
      origin: "*", // or specify your frontend URL for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinPollRoom", (pollId: string) => {
      socket.join(pollId);
      console.log(`Socket joined room: ${pollId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

// Optional: export io instance if you want to emit from other files
export const getIO = () => io;
