const mapValues = require('lodash/mapValues')

const leash = (chainMethod = {}) => {
    const leasher = value => {
        const obj = mapValues(chainMethod, method => (...args) =>
            leasher(method(value, ...args))
        )
        obj.get = () => value
        return obj
    }

    return leasher
}

module.exports = leash
