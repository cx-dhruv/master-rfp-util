import RFPTemplate from '../models/RFPTemplate.js';
import RFPQuestion from '../models/RFPQuestion.js';
import { mergeRFPQuestions } from '../utils/mergeRFP.js';

export const createTemplate = async (req, res) => {
  try {
    const { name, createdBy, modulesIncluded, questions } = req.body;

    const newTemplate = new RFPTemplate({
      name,
      createdBy,
      modulesIncluded,
      questions,
      isFinalized: false
    });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const template = await RFPTemplate.findById(req.params.id).populate("questions.questionId");
    if (!template) return res.status(404).json({ error: "Template not found" });
    res.status(200).json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateMergedTemplate = async (req, res) => {
  try {
    const { modules } = req.body;

    const mergedQuestions = await mergeRFPQuestions(modules);

    res.status(200).json({
      modulesIncluded: modules,
      questions: mergedQuestions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
