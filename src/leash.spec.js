const leash = require('./leash')

const addOne = 'addOne'
const addTwo = 'addTwo'

const text = 'text'

const transformers = {
    [addOne]: x => x + 1,
    [addTwo]: x => x + 2
}

const consumers = {
    [text]: x => x.toString()
}

it('Can be called without failing', () => {
    expect(() => leash()).not.toThrow()
})

it('Return a function', () => {
    expect(leash()).toBeInstanceOf(Function)
})

it('Takes transformers, then a value, and returns another object with the transformers', () => {
    expect(leash(transformers)()).toHaveProperty(addOne)
    expect(leash(transformers)()).toHaveProperty(addTwo)
})

it('Passes the value to the transformers as the first param', () => {
    const fn = jest.fn()
    const param = 1
    leash({ fn })(param).fn()
    expect(fn).toHaveBeenCalledWith(param)
})

it('Returns another leashed object from the chained methods, enabling chaining', () => {
    expect(() =>
        leash(transformers)(1)
            .addOne()
            .addTwo()
    ).not.toThrow()
})

it('Adds a get method to extract the value after chaining', () => {
    expect(
        leash(transformers)(1)
            .addOne()
            .addTwo()
            .get()
    ).toBe(4)
})

it('Accepts consumers and adds them to the object', () => {
    expect(leash(transformers, consumers)()).toHaveProperty(text)
})

it('Does not wrap the result of consumers', () => {
    expect(leash(transformers, consumers)(1)[text]()).not.toHaveProperty(text)
})
