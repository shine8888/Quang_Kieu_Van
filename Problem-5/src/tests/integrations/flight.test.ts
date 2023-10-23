import request from 'supertest';
import httpStatus from 'http-status';
import { expect } from 'chai';
import App from '../../app';
import { DuplicatedVisitDestinationData, MissingFieldsData, OrphanDepartureData, ValidFlightData } from '../mocks';
import { ERROR_MESSAGES } from '../../const/messages';

describe('Forms API', () => {
  let app;
  before(async () => {
    app = App.getInstance();
  });

  describe('POST /flights', () => {
    it('should create a form when requested by an admin and request is ok', (done) => {
      request(app)
        .post('/flights')
        .send({ data: ValidFlightData })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.data.length).to.equal(ValidFlightData.length);
          done();
        })
        .catch(done);
    });

    it('should not create a form with incorrect data', async () => {
      await request(app)
        .post('/flights')
        .send({ data: MissingFieldsData })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal(ERROR_MESSAGES.VALIDATE);
        });
    });

    it('should not create a flight and throw error message: Your data has duplicate visited destination', async () => {
      await request(app)
        .post('/flights')
        .send({ data: DuplicatedVisitDestinationData })
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.equal(ERROR_MESSAGES.DUPLICATE);
        });
    });

    it('should not create a flight and throw error message: Your data contains orphan departure', async () => {
      await request(app)
        .post('/flights')
        .send({ data: OrphanDepartureData })
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.equal(ERROR_MESSAGES.ORPHAN_DEPARTURE);
        });
    });
  });
});
