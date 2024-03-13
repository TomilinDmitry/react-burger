import { checkResponse } from '../utils/Api/api-ingredients';

describe('check getResponse function', () => {
  test('should be success', () => {
    const testObj = {
      ok: true,
      json: function () {
        return { result: 'OK' };
      },
    };
    const result = checkResponse(testObj);
    expect(result).toEqual({ result: 'OK' });
  });
  test('should be fail', () => {
    const response = {
      ok: false,
      status: 400,
    };
    const result = checkResponse(response);
    return expect(result).rejects.toEqual('Ошибка:400');
  });
});
