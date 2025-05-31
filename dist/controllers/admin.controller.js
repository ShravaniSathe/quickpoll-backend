"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPolls = void 0;
const poll_model_1 = require("../models/poll.model");
const getAllPolls = async (req, res) => {
    const { status } = req.query;
    let filter = {};
    if (status === "active")
        filter.isActive = true;
    else if (status === "expired")
        filter.isActive = false;
    const polls = await poll_model_1.Poll.find(filter).sort({ createdAt: -1 });
    res.json(polls);
};
exports.getAllPolls = getAllPolls;
