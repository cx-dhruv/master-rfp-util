import RFPQuestion from "../models/RFPQuestion.js";

/**
 * Merge logic to:
 * - Load questions from all modules
 * - Remove duplicates
 * - Assign order/index
 */
export const mergeRFPQuestions = async (modules) => {
  const allQuestions = await RFPQuestion.find({
    module: { $in: modules }
  });

  const deduplicated = [];

  const seen = new Set();

  for (const q of allQuestions) {
    const key = q.questionText.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push({
        questionId: q._id,
        positionIndex: deduplicated.length,
        customText: q.questionText
      });
    }
  }

  return deduplicated;
};
