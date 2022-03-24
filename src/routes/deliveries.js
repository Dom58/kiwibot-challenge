import express from 'express';
import DeliveryController from '../controllers/deliveriesController.js';

const router = express.Router();

router.get('/', DeliveryController.getAllDeliveries);
router.post('/create', DeliveryController.createDelivery);
router.get('/:id', DeliveryController.getDelivery);
router.put('/update/:id', DeliveryController.updateDelivery);
router.delete('/delete/:id', DeliveryController.deleteDelivery);

export default router;
