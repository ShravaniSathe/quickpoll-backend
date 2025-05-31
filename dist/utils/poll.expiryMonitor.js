"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorPollExpiry = void 0;
// poll.expiryMonitor.ts
const poll_model_1 = require("../models/poll.model");
const poll_socket_1 = require("../sockets/poll.socket");
const monitorPollExpiry = async (pollId) => {
    const poll = await poll_model_1.Poll.findById(pollId);
    if (!poll)
        return;
    const expiryTime = poll.createdAt.getTime() + poll.duration * 60000;
    const delay = expiryTime - Date.now();
    if (delay > 0) {
        setTimeout(async () => {
            const updatedPoll = await poll_model_1.Poll.findById(pollId);
            if (updatedPoll && updatedPoll.isActive) {
                updatedPoll.isActive = false;
                await updatedPoll.save();
                (0, poll_socket_1.getIO)().emit("pollExpired", { pollId }); // 👈 emit real-time event
            }
        }, delay);
    }
};
exports.monitorPollExpiry = monitorPollExpiry;
