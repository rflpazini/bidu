const UserHelper = require('../../src/utils/UserHelper');

describe('User helper ', () => {
  test('should return an encoded password', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';

    // when
    const actual = await UserHelper.createHashedPassword(mockedPassword);

    //then
    expect(actual).not.toBeNull();
  });

  test('should compare a password with a hashed one and return true', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';
    const hashedPassword = await UserHelper.createHashedPassword(mockedPassword);

    // when
    const actual = await UserHelper.comparePassword(hashedPassword, mockedPassword);

    //then
    expect(actual).toBeTruthy();
  });

  test('should compare a two differents passwords', async () => {
    //given
    const mockedPassword = 'Sh3rL0ck';
    const hashedPassword = await UserHelper.createHashedPassword('Another value');

    // when
    const actual = await UserHelper.comparePassword(hashedPassword, mockedPassword);

    //then
    expect(actual).toBeFalsy();
  });
});
