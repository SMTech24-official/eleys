// Slot.routes: Module file for the Slot.routes functionality.
import express from 'express';
import { SlotController } from './Slot.controller';

const router = express.Router();

// create slot
router.post('/', SlotController.generateSlots);
router.get('/', SlotController.getAllSlots);
router.get('/:slotId', SlotController.getSlotById);
router.get('/service/:serviceId', SlotController.getScheduleByServiceId);
router.put('/:slotId', SlotController.updateSlot);
router.delete('/:slotId', SlotController.deleteSlot);
// router.put('/:slotId', SlotController.updateSlot);

export const SlotRoutes = router;
