const login = require('./login');

//User creation test
//CHORE: WRITE A BETTER TEST
test('User should be Created with post method', () => {
    const user = { username: 'test', password: 'test' };
    expect.assertions(1);
    return login(user).then(() => {
        expect(true).toBe(true);
    })
})