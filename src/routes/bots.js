import express from 'express';
import BotController from '../controllers/botsController.js'

const router = express.Router();

router.get('/', BotController.getAllBots);
router.post('/create', BotController.createBot);
router.get('/:id', BotController.getBot);
router.put('/update/:id', BotController.updateBot);
router.delete('/delete/:id', BotController.deleteBot);

export default router;
