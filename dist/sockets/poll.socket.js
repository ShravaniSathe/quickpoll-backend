"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = exports.io = void 0;
const socket_io_1 = require("socket.io");
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: {
            origin: "*"
        }
    });
    exports.io.on("connection", (socket) => {
        console.log("Client connected");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
exports.initSocket = initSocket;
