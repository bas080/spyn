const callsSymbol = Symbol('calls')
const originalSymbol = Symbol('original')
const assert = require('assert')

const defaultConfig = Object.freeze({
  this: false,
  arguments: true,
  return: true
})

function spy (fn, configs = {}) {
  const config = Object.assign({}, defaultConfig, configs)

  function spyFn (...args) {
    const context = this
    const value = fn.call(context, ...args)
    const values = {}

    if (config.this) { values.this = context }

    if (config.arguments) { values.arguments = args }

    if (config.return) { values.return = value }

    spyFn[callsSymbol].push(values)

    return value
  }

  spyFn[originalSymbol] = fn
  spyFn[callsSymbol] = []

  return spyFn
}

function assertSpy (spyFn) {
  assert.ok(spyFn[callsSymbol], 'expected fn to be a spied on fn')
}

function calls (spyFn) {
  assertSpy(spyFn)

  return spyFn[callsSymbol]
}

function original (spyFn) {
  assertSpy(spyFn)

  return spyFn[originalSymbol]
}

module.exports = {
  calls,
  spy,
  original
}
