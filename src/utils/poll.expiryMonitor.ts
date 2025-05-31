// poll.expiryMonitor.ts
import { Poll } from "../models/poll.model";
import { io } from "../sockets/poll.socket";

export const monitorPollExpiry = async (pollId: string) => {
  const poll = await Poll.findById(pollId);
  if (!poll) return;

  const expiryTime = poll.createdAt.getTime() + poll.duration * 60000;
  const delay = expiryTime - Date.now();

  if (delay > 0) {
    setTimeout(async () => {
      const updatedPoll = await Poll.findById(pollId);
      if (updatedPoll && updatedPoll.isActive) {
        updatedPoll.isActive = false;
        await updatedPoll.save();
        io.emit("pollExpired", { pollId }); // 👈 emit real-time event
      }
    }, delay);
  }
};
