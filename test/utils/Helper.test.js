const Helper = require('../../src/utils/Helper');

describe('Helper ', () => {
  test('should return an encoded password', () => {
    //given
    const mockedPassword = 'Sh3rL0ck';

    // when
    const actual = Helper.createHashedPassword(mockedPassword);

    //then
    expect(actual).not.toBeNull();
  });
});
