import express from "express";
import { createPoll, votePoll, getPoll,getActivePolls,getPollResults } from "../controllers/poll.controller";

const router = express.Router();

router.post("/create", createPoll);
router.post("/vote", votePoll);
router.get("/:id", getPoll);
router.get("/", getActivePolls); // if this is meant for active ones only
router.get("/:id/results", getPollResults);


export default router;
