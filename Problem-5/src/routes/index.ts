import express from 'express';
import { flightRoute } from './flight.route';

const router = express.Router();

router.use('/flights', flightRoute());

export default router;
