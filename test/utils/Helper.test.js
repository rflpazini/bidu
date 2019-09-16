const Helper = require('../../src/utils/Helper');

describe('Helper ', () => {
  test('should return an encoded password', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';

    // when
    const actual = await Helper.createHashedPassword(mockedPassword);

    //then
    expect(actual).not.toBeNull();
  });

  test('should compare a password with a hashed one and return true', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';
    const hashedPassword = await Helper.createHashedPassword(mockedPassword);

    // when
    const actual = await Helper.comparePassword(hashedPassword, mockedPassword);

    //then
    expect(actual).toBeTruthy();
  });

  test('should compare a two differents passwords', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';
    const hashedPassword = await Helper.createHashedPassword('Another value');

    // when
    const actual = await Helper.comparePassword(hashedPassword, mockedPassword);

    //then
    expect(actual).toBeFalsy();
  });
});
