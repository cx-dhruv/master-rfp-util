import mongoose from "mongoose";

const RFPQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  module: { type: String, required: true },
  section: { type: String },
  tags: [String],
  origin: { type: String, enum: ['FirstOrder', 'SecondOrder'], default: 'FirstOrder' }
});

export default mongoose.model("RFPQuestion", RFPQuestionSchema);
