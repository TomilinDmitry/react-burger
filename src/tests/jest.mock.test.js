import { login, register } from '../utils/Api/api-ingredients';

describe('check register', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        result: 'OK',
      }),
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should be success', async () => {
    const results = await register('email', 'password', 'name');
    expect(results).toEqual({ success: true, result: 'OK' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('should be failed', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' }),
        status: 500,
      }),
    );
    await expect(register('email', 'password', 'name')).rejects.toBe(
      'Ошибка:500',
    );
    expect(fetch).toBeCalledTimes(1);
  });
  test('should be success login', async () => {
    const results = await login('email', 'password');
    expect(results).toEqual({ success: true, result: 'OK' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('should be failed login', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ result: 'OK' }),
        status: 500,
      }),
    );
    await expect(login('email', 'password')).rejects.toBe(
      'Ошибка:500',
    );
    expect(fetch).toBeCalledTimes(1);
  });
});
