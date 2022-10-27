const axios = require('axios').default;
const calendarService = require('../services/calendarService');
const reservations = require('../__mocks__/response/reservations.json');

jest.mock('axios');

describe('Test reservationsRouter', () => {
  it('returns list of reservations', async () => {
    axios.get.mockResolvedValueOnce({ data: reservations });
    const res = await calendarService.getReservations('test', true);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(res.reservations.length).toBe(2);
  });
});
