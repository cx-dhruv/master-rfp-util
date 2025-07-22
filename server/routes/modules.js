import express from 'express';
import { getAllModules, addModule } from '../controllers/modulesController.js';

const router = express.Router();

router.get('/', getAllModules);
router.post('/', addModule);

export default router;
