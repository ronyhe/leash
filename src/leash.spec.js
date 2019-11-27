const leash = require('./leash')

const SOME_NUMBER = 5
const SOME_OTHER_NUMBER = SOME_NUMBER + 7

describe('API', () => {
    describe('Atom', () => {
        it('has accessors', () => {
            expectAccessors(leash())
        })

        it('returns its own value on get', () => {
            expectGet(leash(SOME_NUMBER)).toBe(SOME_NUMBER)
        })

        it('returns a new leash on set, and does not alter the original', () => {
            const original = leash(SOME_NUMBER)
            const changed = original.set(SOME_OTHER_NUMBER)

            expectGet(original).toBe(SOME_NUMBER)
            expectGet(changed).toBe(SOME_OTHER_NUMBER)
        })

        it('returns a new leash on update, and does not alter the original', () => {
            const plusOne = x => x + 1
            const original = leash(SOME_NUMBER)
            const changed = original.update(plusOne)

            expectGet(original).toBe(SOME_NUMBER)
            expectGet(changed).toBe(SOME_NUMBER + 1)
        })
    })
})

function expectGet(obj) {
    return expect(obj.get())
}

function expectAccessors(obj) {
    const accessors = ['get', 'set', 'update']
    accessors.forEach(acc => expect(obj).toHaveProperty(acc))
}
