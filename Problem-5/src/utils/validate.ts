import { ERROR_MESSAGES } from '../const/messages';
import { IFlight } from '../types';
import { orderFlightItinerary } from './sorting';

/**
 * Validates the itinerary flights.
 * @param itinerary - The array of flights in the itinerary.
 */
export const validateIteraryFlights = (itinerary: IFlight[]) => {
  // Check for duplicate flights in the itinerary
  const isValid = validateVisitedFlights(itinerary);

  if (!isValid) throw new Error(ERROR_MESSAGES.DUPLICATE);

  // Find the starting point of the itinerary
  const startingPoint = itinerary.find((flight) => !itinerary.some((f) => f.to === flight.from));

  if (!startingPoint) throw new Error(ERROR_MESSAGES.ORPHAN_DEPARTURE);

  // Order the flight itinerary
  const orderedData = orderFlightItinerary(itinerary);

  // Check if all flights are in the correct order
  if (orderedData.length !== itinerary.length) throw new Error(ERROR_MESSAGES.ORPHAN_DEPARTURE);
};

/**
 * Validates if all airports in the itinerary are visited only once.
 * @param itinerary - The list of flights in the itinerary.
 * @returns True if all airports are visited only once, false otherwise.
 */
const validateVisitedFlights = (itinerary: IFlight[]): boolean => {
  const visitedAirports = new Set();

  for (let i = 0; i < itinerary.length; i++) {
    const { from, to } = itinerary[i];

    // Check if the destination airport has already been visited
    if (visitedAirports.has(to)) {
      return false;
    }

    visitedAirports.add(to);
  }

  return true;
};
