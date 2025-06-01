import express from "express";
import { createPoll, votePoll, getPoll,getActivePolls,getPollResults,getUserPolls } from "../controllers/poll.controller";

const router = express.Router();

router.post("/create", createPoll);
router.post("/vote", votePoll);
router.get("/", getActivePolls); // if this is meant for active ones only
router.get("/:id/results", getPollResults);
router.get("/mypolls", getUserPolls);
router.get("/:id", getPoll);


export default router;
