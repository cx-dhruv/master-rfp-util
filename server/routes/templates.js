import express from 'express';
import {
  createTemplate,
  getTemplateById,
  generateMergedTemplate
} from '../controllers/templatesController.js';

const router = express.Router();

router.post('/', createTemplate);
router.get('/:id', getTemplateById);
router.post('/merge', generateMergedTemplate);

export default router;
