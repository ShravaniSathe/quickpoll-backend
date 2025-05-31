"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const optionSchema = new mongoose_1.default.Schema({
    text: String,
    votes: { type: Number, default: 0 }
});
const pollSchema = new mongoose_1.default.Schema({
    question: String,
    options: [optionSchema],
    createdAt: { type: Date, default: Date.now },
    duration: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
});
exports.Poll = mongoose_1.default.model("Poll", pollSchema);
