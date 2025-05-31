"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const poll_controller_1 = require("../controllers/poll.controller");
const router = express_1.default.Router();
router.post("/create", poll_controller_1.createPoll);
router.post("/vote", poll_controller_1.votePoll);
router.get("/:id", poll_controller_1.getPoll);
router.get("/", poll_controller_1.getActivePolls); // if this is meant for active ones only
router.get("/:id/results", poll_controller_1.getPollResults);
exports.default = router;
