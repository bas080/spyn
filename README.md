# Spyn

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

## Calls

> Takes a spy function and returns an array containing information by the calls

```javascript
const spiedFn = spy(multiply)

spiedFn(1,2)

calls(spiedFn) // => [{ arguments: [1,2], returns: 2 }]
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
