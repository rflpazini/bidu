const AuthHelper = require('../../src/utils/AuthHelper');

describe('Auth helper ', () => {
  test('should return an encoded token', async () => {
    //given
    const mockedId = '123312313213';

    // when
    const actual = await AuthHelper.createToken(mockedId);

    //then
    expect(actual).not.toBeNull();
  });
});
