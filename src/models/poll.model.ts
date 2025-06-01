import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  question: String,
  createdBy: String,
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  expiresAt: {
    type: Date,
    required: true
  }
});

export const Poll = mongoose.model("Poll", pollSchema);
