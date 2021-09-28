# Spyn
[![Build Status](https://travis-ci.org/bas080/spyn.svg?branch=master)](https://travis-ci.org/bas080/spyn)

Safe and minimal spying tool for testing purposes.

# Installation

`npm install spyn --save-dev`

# Reference

## Spy

> Takes a function and returns a function that is being spied on.

```javascript
const spiedFn = spy(sum)

spiedFn(1, 2) // => 3
```

There is also a optional configuration object which allows you to define what
function call properties are stored in the calls array. By default it stores
arguments and return values.

```js
const spiedFn = spy(sum, {arguments: false, this: true})

spiedFn.call('thiz', 'a', 'b') // => 'ab'

calls(spiedFn) // => [{this: 'thiz', return: 'ab'}]
```

## Calls

> Takes a spy function and returns an array containing information of each call

```javascript
const spiedFn = spy(multiply)

spiedFn(1,2)

calls(spiedFn) // => [{arguments: [1,2], return: 2}]
```

## Original

> Returns the original function of the spy.

```javascript
const spiedFn = spy(divide)

spiedFn === divide // => false

original(spiedFn) === divide // => true
```

# Usage

Spies tend to be used only in tests. They allow you to observe and automate the
checking of function calls.

It is good practice to remove a spy when the test has completed. This prevents
edge cases.

# Tests

```javascript
npm install && npm test
```

# Example

- [form-data-extended](https://github.com/bas080/form-data-extended/blob/master/lib/form-data.spec.js#L27)
