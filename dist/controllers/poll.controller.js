"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPollResults = exports.getActivePolls = exports.getPoll = exports.votePoll = exports.createPoll = void 0;
const poll_model_1 = require("../models/poll.model");
const poll_socket_1 = require("../sockets/poll.socket");
const poll_expiryMonitor_1 = require("../utils/poll.expiryMonitor");
const createPoll = async (req, res) => {
    const { question, options, duration } = req.body;
    const poll = new poll_model_1.Poll({
        question,
        options: options.map((text) => ({ text })),
        duration
    });
    await poll.save();
    (0, poll_expiryMonitor_1.monitorPollExpiry)(poll._id.toString());
    res.status(201).json(poll);
};
exports.createPoll = createPoll;
const votePoll = async (req, res) => {
    const { pollId, optionIndex } = req.body;
    console.log("Received vote for pollId:", pollId, "optionIndex:", optionIndex);
    const poll = await poll_model_1.Poll.findOne({ _id: pollId });
    console.log("Poll found:", poll);
    if (!poll)
        return res.status(404).json({ message: "Poll not found" });
    const now = new Date();
    const expiry = new Date(poll.createdAt.getTime() + poll.duration * 60000);
    if (now > expiry) {
        poll.isActive = false;
        await poll.save();
        return res.status(400).json({ message: "Poll expired" });
    }
    poll.options[optionIndex].votes += 1;
    await poll.save();
    // Emit update
    const results = poll.options.map(({ text, votes }) => ({ option: text, votes }));
    (0, poll_socket_1.getIO)().to(pollId).emit("pollResultsUpdate", { question: poll.question, results });
    res.status(200).json({ message: "Vote recorded" });
};
exports.votePoll = votePoll;
const getPoll = async (req, res) => {
    const poll = await poll_model_1.Poll.findById(req.params.id);
    if (!poll)
        return res.status(404).json({ message: "Poll not found" });
    const now = new Date();
    const expiry = new Date(poll.createdAt.getTime() + poll.duration * 60000);
    if (now > expiry && poll.isActive) {
        poll.isActive = false;
        await poll.save();
        return res.status(400).json({ message: "Poll expired" });
    }
    res.json(poll);
};
exports.getPoll = getPoll;
const getActivePolls = async (_, res) => {
    const now = new Date();
    // You may also update expired polls here (optional background job idea)
    const polls = await poll_model_1.Poll.find();
    const activePolls = polls.filter(poll => {
        const expiry = new Date(poll.createdAt.getTime() + poll.duration * 60000);
        return now <= expiry && poll.isActive;
    });
    res.json(activePolls);
};
exports.getActivePolls = getActivePolls;
const getPollResults = async (req, res) => {
    const poll = await poll_model_1.Poll.findById(req.params.id);
    if (!poll)
        return res.status(404).json({ message: "Poll not found" });
    const results = poll.options.map(({ text, votes }) => ({ option: text, votes }));
    res.json({ question: poll.question, results });
};
exports.getPollResults = getPollResults;
