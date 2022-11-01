const axios = require('axios').default;
const calendarService = require('../services/calendarService');
const reservations = require('../__mocks__/response/reservations.json');
const reservation = require('../__mocks__/response/reservation.json');

jest.mock('axios');

describe('Test calendarService', () => {
  describe('success', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('returns list of reservations', async () => {
      axios.get.mockResolvedValueOnce({ data: reservations });
      const res = await calendarService.getReservations('test', true);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
      expect(res.reservations.length).toBe(2);
    });

    it('returns a single reservation', async () => {
      axios.get.mockResolvedValueOnce({ data: reservation });
      const res = await calendarService.getReservationById(123);
      expect(res).toHaveProperty('id', 123);
      expect(axios.get).toBeCalledTimes(1);
      expect(axios.get).toBeCalledWith(expect.stringContaining('123'), expect.any(Object));
    });
  });
});
