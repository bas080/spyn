const test = require('tape')
const {spy, calls, original} = require('./spyn')

const sum3 = (a, b, c = 0) => a + b + c

test('spy that has not been called', t => {
  const spied = spy(sum3)

  t.deepEqual(calls(spied), [])
  t.end()
})

test('spy that has been called once', t => {
  const spied = spy(sum3)
  const context = {}

  spied.call(context, 40, 2)

  t.deepEqual(calls(spied), [{
    this: context,
    arguments: [40, 2],
    return: 42
  }])

  t.end()
})

test('spy that has been called twice', t => {
  const spied = spy(sum3)
  const context = this

  spied.call(context, 40, 2)
  spied.call(context, 40, 3, -1)

  t.deepEqual(calls(spied), [
    {this: context, arguments: [40, 2], return: 42},
    {this: context, arguments: [40, 3, -1], return: 42}
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
  t.throws(() => original(() => void 0))
  t.end()
})

test('getting the calls of a non spy will throw', t => {
  t.throws(() => calls(() => void 0))
  t.end()
})

test('calling function without this makes this global', t => {
  const context = this;

  function testFn() {
    t.equal(this, global)
  }

  const testFatArrowFn = () => {
    t.equal(this, context)
  }

  const spied = spy(testFn)
  const spiedFatArrow = spy(testFatArrowFn)

  spied(1, 2)
  spiedFatArrow(1,2)
  spiedFatArrow.call(context, 1,2)

  t.equal(calls(spied)[0].this, global)
  t.equal(calls(spiedFatArrow)[0].this, global)
  t.equal(calls(spiedFatArrow)[1].this, context)

  t.end()
})
