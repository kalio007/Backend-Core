const login = require('./login');

//User creation test
//CHORE: WRITE A BETTER TEST
test('User should be Created with post method', () => {
    user = { password: 'test', username: 'test' }
    expect(functions.login(user)).toEqual({
        username: 'test',
        password: 'test'
    })
})