const callsSymbol = Symbol('calls')
const originalSymbol = Symbol('original')
const assert = require('assert')

function spy(fn) {
  function spyFn(...args) {
    const context = this
    const value = fn.call(context, ...args)

    spyFn[callsSymbol].push({this: context, arguments: args, return : value})

    return value
  }

  spyFn[originalSymbol] = fn
  spyFn[callsSymbol] = []

  return spyFn
}

function assertSpy(spyFn) {
  assert.ok(spyFn[callsSymbol], 'expected fn to be a spied on fn')
}

function calls(spyFn) {
  assertSpy(spyFn)

  return spyFn[callsSymbol]
}

function original(spyFn) {
  assertSpy(spyFn)

  return spyFn[originalSymbol]
}

module.exports = {
  calls,
  spy,
  original,
}
