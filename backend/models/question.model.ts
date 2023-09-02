import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    type: { type: String, required: true },
    field: { type: [String], required: true },
    prompt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
