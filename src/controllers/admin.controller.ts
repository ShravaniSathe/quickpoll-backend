import { Request, Response } from "express";
import { Poll } from "../models/poll.model";

export const getAllPolls = async (req: Request, res: Response) => {
  const { status } = req.query;

  let filter: any = {};
  if (status === "active") filter.isActive = true;
  else if (status === "expired") filter.isActive = false;

  const polls = await Poll.find(filter).sort({ createdAt: -1 });
  res.json(polls);
};
