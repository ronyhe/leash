const leash = require('./leash')

const addOne = 'addOne'
const addTwo = 'addTwo'

const chainMethods = {
    [addOne]: x => x + 1,
    [addTwo]: x => x + 2
}

it('Can be called without failing', () => {
    expect(() => leash()).not.toThrow()
})

it('Return a function', () => {
    expect(leash()).toBeInstanceOf(Function)
})

it('Takes chainMethods, then a value, and returns another object with the chainMethods', () => {
    expect(leash(chainMethods)()).toHaveProperty(addOne)
    expect(leash(chainMethods)()).toHaveProperty(addTwo)
})

it('Passes the value to the chained methods as the first param', () => {
    const fn = jest.fn()
    const param = 1
    leash({ fn })(param).fn()
    expect(fn).toHaveBeenCalledWith(param)
})

it('Returns another leashed object from the chained methods, enabling chaining', () => {
    expect(() =>
        leash(chainMethods)(1)
            .addOne()
            .addTwo()
    ).not.toThrow()
})

it('Adds a get method to extract the value after chaining', () => {
    expect(
        leash(chainMethods)(1)
            .addOne()
            .addTwo()
            .get()
    ).toBe(4)
})
