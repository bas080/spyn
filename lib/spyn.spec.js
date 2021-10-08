const test = require('tape')
const { spy, calls, original } = require('./spyn')

const sum3 = (a, b, c = 0) => a + b + c

test('spy that has not been called', t => {
  const spied = spy(sum3)

  t.deepEqual(calls(spied), [])
  t.end()
})

test('spy that has been called once', t => {
  const spied = spy(sum3)

  spied(40, 2)

  t.deepEqual(calls(spied), [{
    arguments: [40, 2],
    return: 42
  }])

  t.end()
})

test('spy that has been called twice', t => {
  const spied = spy(sum3)

  spied(40, 2)
  spied(40, 3, -1)

  t.deepEqual(calls(spied), [
    { arguments: [40, 2], return: 42 },
    { arguments: [40, 3, -1], return: 42 }
  ])

  t.end()
})

test('getting the original function from a spy', t => {
  const spied = spy(sum3)

  t.notEqual(spied, sum3)
  t.equal(original(spied), sum3)
  t.end()
})

test('getting the original fn of a non spy will throw', t => {
  t.throws(() => original(() => undefined))
  t.end()
})

test('getting the calls of a non spy will throw', t => {
  t.throws(() => calls(() => undefined))
  t.end()
})

test('allows spying on spies', t => {
  const nop = () => {}

  const one = spy(nop, { return: false })
  const two = spy(one, { return: false })

  one(41)
  two(42)

  t.deepEqual(calls(two), [{
    arguments: [42]
  }])

  t.deepEqual(calls(one), [{
    arguments: [41]
  }, {
    arguments: [42]
  }])

  t.equal(nop, original(original(two)))
  t.end()
})

test('configure to not respond with return or arguments', t => {
  function testFn () { return 24 }

  const spied = spy(testFn, { arguments: false, return: false })
  spied(42)
  t.deepEqual(calls(spied), [{}])
  t.end()
})

test('calling function without this makes this global', t => {
  const context = this

  function testFn () {
    t.equal(this, global)
  }

  const testFatArrowFn = () => {
    t.equal(this, context)
  }

  const spied = spy(testFn, { this: true })
  const spiedFatArrow = spy(testFatArrowFn, { this: true })

  spied(1, 2)
  spiedFatArrow(1, 2)
  spiedFatArrow.call(context, 1, 2)

  t.equal(calls(spied)[0].this, global)
  t.equal(calls(spiedFatArrow)[0].this, global)
  t.equal(calls(spiedFatArrow)[1].this, context)

  t.end()
})
