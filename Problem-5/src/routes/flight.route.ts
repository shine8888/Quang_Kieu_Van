import { Router } from 'express';
import { createFlights, deleteFlight, getAllFlights, getFlight, updateFlight } from '../controllers/flight.controller';
import { validate } from 'express-validation';
import { createFlightsValidation, getFlightValidation, updateFlightValidation } from '../validation/flights.validation';

const flightRoute = () => {
  const router = Router();

  router.post('/', validate(createFlightsValidation), createFlights);
  router.get('/', getAllFlights);
  router.get('/:id', validate(getFlightValidation), getFlight);
  router.put('/:id', validate(updateFlightValidation), updateFlight);
  router.delete('/:id', validate(getFlightValidation), deleteFlight);

  return router;
};

export { flightRoute };
