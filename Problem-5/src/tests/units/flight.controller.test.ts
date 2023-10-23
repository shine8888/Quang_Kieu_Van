import { expect } from 'chai';
import sinon, { spy, stub } from 'sinon';
import { createFlights } from '../../controllers/flight.controller';
import { DuplicatedVisitDestinationData, ValidFlightData } from '../mocks';
import { Request, Response } from 'express';

describe('createFlights', () => {
  let status, json, res;
  beforeEach(() => {
    status = stub();
    json = spy();
    res = { json, status };
  });

  it('should fail when inserting data to database', async () => {
    const req = {
      body: {
        data: DuplicatedVisitDestinationData,
      },
      ip: '127.0.0.1',
    } as Request;
    res = {
      json: sinon.spy(),
      status,
    } as unknown as Response;

    // Stub the necessary functions
    const orderFlightItineraryStub = sinon.stub().returns(req.body.data);
    const handleDataBeforeInsertStub = sinon.stub().throws();

    // Call the controller function
    await createFlights(req, res);

    // Assert that the necessary functions were called with the correct arguments
    expect(orderFlightItineraryStub.calledWith(req.body.data));
    expect(handleDataBeforeInsertStub.calledWithExactly(req.body.data, req.ip));

    // Assert that the response was sent with the correct data
    expect(json.calledWith({ success: false }));
  });

  it('should call the necessary functions and return the ordered data', async () => {
    const req = {
      body: {
        data: ValidFlightData,
      },
      ip: '127.0.0.1',
    } as Request;
    res = {
      json: sinon.spy(),
      status,
    } as unknown as Response;

    // Stub the necessary functions
    const orderFlightItineraryStub = sinon.stub().returns(req.body.data);
    const handleDataBeforeInsertStub = sinon.stub().returns(req.body.data);
    const prismaCreateManyStub = sinon.stub().resolves();

    // Call the controller function
    await createFlights(req, res);

    // Assert that the necessary functions were called with the correct arguments
    expect(orderFlightItineraryStub.calledWith(req.body.data));
    expect(handleDataBeforeInsertStub.calledWithExactly(req.body.data, req.ip));
    expect(prismaCreateManyStub.calledWithExactly({ data: req.body.data }));

    // Assert that the response was sent with the correct data
    expect(json.calledWith({ success: true }));
  });
});
