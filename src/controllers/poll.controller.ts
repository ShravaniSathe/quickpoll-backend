import { Request, Response } from "express";
import { Poll } from "../models/poll.model";
import { getIO } from "../sockets/poll.socket";
import { monitorPollExpiry } from "../utils/poll.expiryMonitor";

export const createPoll = async (req: Request, res: Response) => {
  const { question, options, duration,userId } = req.body;
  const expiresAt = new Date(Date.now() + duration * 60 * 1000); // duration in minutes
  const poll = new Poll({
    question,
    options: options.map((text: string) => ({ text })),
    duration,
    createdBy: userId,
    expiresAt
  });
  await poll.save();
  monitorPollExpiry(poll._id.toString());
  res.status(201).json(poll);
};

export const votePoll = async (req: Request, res: Response) => {
  const { pollId, optionIndex } = req.body;
  console.log("Received vote for pollId:", pollId, "optionIndex:", optionIndex);
  const poll = await Poll.findOne({ _id: pollId });
  console.log("Poll found:", poll);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

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
  getIO().to(pollId).emit("pollResultsUpdate", { question: poll.question, results });
  res.status(200).json({ message: "Vote recorded" });
};

export const getPoll = async (req: Request, res: Response) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  const now = new Date();
  const expiry = new Date(poll.createdAt.getTime() + poll.duration * 60000);
  if (now > expiry && poll.isActive) {
    poll.isActive = false;
    await poll.save();
    return res.status(400).json({ message: "Poll expired" });
  }

  res.json(poll);
};

export const getActivePolls = async (_: Request, res: Response) => {
  const now = new Date();

  // You may also update expired polls here (optional background job idea)
  const polls = await Poll.find();

  const activePolls = polls.filter(poll => {
    const expiry = new Date(poll.createdAt.getTime() + poll.duration * 60000);
    return now <= expiry && poll.isActive;
  });

  res.json(activePolls);
};


export const getPollResults = async (req: Request, res: Response) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  const results = poll.options.map(({ text, votes }) => ({ option: text, votes }));
  res.json({ question: poll.question, results });
};

export const getUserPolls = async (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "Missing userId" });

  const polls = await Poll.find({ createdBy: userId });
  res.json(polls);
};
