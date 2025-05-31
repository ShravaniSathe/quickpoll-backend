"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", // or specify your frontend URL for security
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("A user connected");
        socket.on("joinPollRoom", (pollId) => {
            socket.join(pollId);
            console.log(`Socket joined room: ${pollId}`);
        });
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};
exports.initSocket = initSocket;
// Optional: export io instance if you want to emit from other files
const getIO = () => io;
exports.getIO = getIO;
