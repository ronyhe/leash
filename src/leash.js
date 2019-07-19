const leash = (transformers = {}, consumers = {}) => {
    class Leasher {
        constructor(value) {
            this.value = value
        }

        get() {
            return this.value
        }
    }

    const proto = Leasher.prototype

    Object.entries(transformers).forEach(([name, t]) => {
        proto[name] = function(...args) {
            return new Leasher(t(this.value, ...args))
        }
    })

    Object.entries(consumers).forEach(([name, c]) => {
        proto[name] = function(...args) {
            return c(this.value, ...args)
        }
    })

    return v => new Leasher(v)
}

module.exports = leash
