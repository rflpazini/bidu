const target = require('../../src/utils/UserHelper');

describe('User helper ', () => {
  test('should return true with a valid email', async () => {
    //given
    const mockedEmail = 'rflpazini@gmail.com';

    // when
    const actual = await target.isValidEmail(mockedEmail);

    //then
    expect(actual).toBeTruthy();
  });

  test('should return false with an invalid email', async () => {
    //given
    const mockedEmail = 'rflpazini';

    // when
    const actual = await target.isValidEmail(mockedEmail);

    //then
    expect(actual).toBeFalsy();
  });
});
