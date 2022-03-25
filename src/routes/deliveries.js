import express from 'express';
import DeliveryController from '../controllers/deliveriesController.js';

const router = express.Router();

router.get('/', DeliveryController.getAllDeliveries);
router.post('/create', DeliveryController.createDelivery);
router.get('/:id', DeliveryController.getDelivery);
router.put('/update/:id', DeliveryController.updateDelivery);
router.delete('/delete/:id', DeliveryController.deleteDelivery);

// assign port to delivery
router.post('/assign/:id/bot/:botId', DeliveryController.assignBotToDelivery);

// change deliverystate
router.patch('/update/in_transit/:id', DeliveryController.makeInTransit);
router.patch('/update/delivered/:id', DeliveryController.makeInDelivery);

export default router;
