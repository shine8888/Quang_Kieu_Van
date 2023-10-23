import { IFlight } from '../types';

/**
 * This function takes an array of flight data and an IP address as input,
 * and returns a new array of flight data with each flight object modified
 * to include the IP address and current timestamp.
 *
 * @param data - The array of flight data
 * @param ipAddress - The IP address to be added to each flight object
 * @returns The modified array of flight data
 */
export const handleDataBeforeInsert = (data: IFlight[], ipAddress: string, parentId: string): IFlight[] => {
  return data.map((d, index) => ({
    ...d,
    ipAddress,
    timestamp: new Date(),
    parentId,
    flightSequenceNumber: index + 1,
  }));
};

/**
 * Function to get the parent flight
 *
 * @param data
 * @param ipAddress
 * @returns IFlight
 */
export const getParentFlight = (data: IFlight[], ipAddress: string): IFlight => ({
  from: data[0].from,
  to: data[data.length - 1].to,
  ipAddress,
  timestamp: new Date(),
});

/**
 * Orders the itinerary based on the flights' connections.
 * @param itinerary - The list of flights in the itinerary.
 * @returns The ordered itinerary.
 */
export const orderFlightItinerary = (itinerary: IFlight[]): IFlight[] => {
  const result: IFlight[] = [];

  // Find the starting point
  const startingPoint = itinerary.find((flight) => !itinerary.some((f) => f.to === flight.from));

  // If starting point is found, rearrange the itinerary
  if (startingPoint) {
    let currentFlight: IFlight | undefined = startingPoint;

    while (currentFlight) {
      result.push(currentFlight);
      currentFlight = itinerary.find((flight) => flight.from === currentFlight?.to);
    }
  }

  return result;
};
