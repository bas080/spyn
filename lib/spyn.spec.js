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
    {arguments: [40, 2], return: 42},
    {arguments: [40,3,-1], return: 42}
  ])

  t.end()
})

test('getting the original function from a spy', t => {
  const fn = () => void 0
  const spied = spy(fn)

  t.equal(original(spied), fn)
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

