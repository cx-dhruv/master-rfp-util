import mongoose from "mongoose";

const TemplateQuestionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'RFPQuestion' },
  positionIndex: Number,
  customText: String
});

const RFPTemplateSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  modulesIncluded: [String],
  questions: [TemplateQuestionSchema],
  isFinalized: { type: Boolean, default: false }
});

export default mongoose.model("RFPTemplate", RFPTemplateSchema);
