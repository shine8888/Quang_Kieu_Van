import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { getParentFlight, handleDataBeforeInsert, orderFlightItinerary } from '../utils/sorting';
import { validateIteraryFlights } from '../utils/validate';
import { errorHandler, successHandler } from '../middlewares/status';
import httpStatus from 'http-status';
import { sqlQueryAllFlights, sqlQueryFlight } from '../db/sql';

/**
 * Function to create flight
 *
 * @param <Request> req
 * @param <Response> res
 */
export const createFlights = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    // Validate the itinerary flights
    validateIteraryFlights(data);

    // Order the flight itinerary
    const orderedData = orderFlightItinerary(data);

    // Get and insert parent flight
    const parentFlight = getParentFlight(orderedData, req.ip);
    const { id: parentId } = await prisma.flight.create({
      select: {
        id: true,
      },
      data: parentFlight as any,
    });

    // Prepare the data before inserting
    const parsedData = handleDataBeforeInsert(orderedData, req.ip, parentId);

    // Insert the flights into the database
    await prisma.flight.createMany({
      data: parsedData as any,
    });

    // Handle success and send the ordered data
    successHandler(res, httpStatus.OK, orderedData);
  } catch (error) {
    // Handle error and send the response
    errorHandler(error, res);
  }
};

/**
 * Function to get all the flights of user
 *
 * @param <Request> req
 * @param <Response> res
 */
export const getAllFlights = async (req: Request, res: Response) => {
  try {
    // Get and parse the limit and offset values
    const { limit, offset } = req.query;
    const take = !isNaN(Number(limit)) ? Number(limit) : 10;
    const skip = !isNaN(Number(offset)) ? Number(offset) : 0;

    // Query to get all flights
    const results = await await prisma.$queryRaw(sqlQueryAllFlights(take, skip));

    // Handle success and send the result
    successHandler(res, httpStatus.OK, results);
  } catch (error) {
    // Handle error and send the response
    errorHandler(error, res);
  }
};

/**
 * Function to get a flight detail
 *
 * @param <Request> req
 * @param <Response> res
 * @returns
 */
export const getFlight = async (req: Request, res: Response) => {
  try {
    // Get the flight id
    const id = req.params.id as string;

    // Return error in case there is no provided id
    if (!id) return errorHandler(new Error('Id is missing'), res);

    // Query to get the flight
    const result = await await prisma.$queryRaw(sqlQueryFlight(id));

    // Handle success and send the result
    successHandler(res, httpStatus.OK, result);
  } catch (error) {
    // Handle error and send the response
    errorHandler(error, res);
  }
};

/**
 * Function to update a flight information: from/to values
 *
 * @param <Request> req
 * @param <Response> res
 * @returns
 */
export const updateFlight = async (req: Request, res: Response) => {
  try {
    // Get the flight id
    const id = req.params.id as string;
    const { data } = req.body;

    // Return error in case there is no provided id and data
    if (!id || !data) {
      return errorHandler(new Error('Flight Id or update values are missing'), res);
    }

    // Update new data to given flight
    const result = await prisma.flight.update({
      where: {
        id,
      },
      data,
    });

    // Handle success and send the result
    successHandler(res, httpStatus.OK, result);
  } catch (error) {
    // Handle error and send the response
    errorHandler(error, res);
  }
};

/**
 * Function to remove a flight
 *
 * @param <Request> req
 * @param <Response> res
 * @returns
 */
export const deleteFlight = async (req: Request, res: Response) => {
  try {
    // Get the flight id
    const id = req.query.id as string;

    // Return error in case there is no provided id
    if (!id) {
      return errorHandler(new Error('Flight Id is missing'), res);
    }

    // Remove the flight
    await prisma.flight.delete({
      where: {
        id,
      },
    });

    // Handle success and send the result
    successHandler(res, httpStatus.OK);
  } catch (error) {
    // Handle error and send the response
    errorHandler(error, res);
  }
};
