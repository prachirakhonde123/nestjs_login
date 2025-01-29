// for testing we use jest

// command to run :  npm test --watch

describe('Example test', () => {
    it('equals true', () => {
        expect(true).toEqual(true);
        expect('Hello').toEqual('Hello');
    });
})