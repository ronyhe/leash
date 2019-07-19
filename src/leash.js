const mapValues = require('lodash/mapValues')

const leash = (transformers = {}, consumers = {}) => {
    const leasher = value => {
        const obj = mapValues(transformers, method => (...args) =>
            leasher(method(value, ...args))
        )

        obj.get = () => value

        Object.entries(consumers).forEach(([name, consumer]) => {
            console.log(name)
            obj[name] = (...args) => consumer(value, ...args)
        })

        return obj
    }

    return leasher
}

module.exports = leash
