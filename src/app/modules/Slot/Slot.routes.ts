// Slot.routes: Module file for the Slot.routes functionality.
import express from 'express';
import { SlotController } from './Slot.controller';

const router = express.Router();

// create slot
router.post('/', SlotController.generateSlots);

export const SlotRoutes = router;
