# sparse-set-js

A sparse set is a performant, set-like unsigned integer collection, providing O(1) time complexity for addition, deletion, and lookup. Iteration is O(n).

## Features

- ECMA Script 2015 (ES6) style API
- Framework agnostic
- TypeScript compatible

## Installation

```js
npm install https://github.com/gigann/sparse-set.git
```

## Usage

### Import

```js
import SparseSet from 'sparse-set';
```

### Initialize

```js
let sset = new SparseSet(capacity, maximumValue);
```

### Insert - O(1)

```js
sset.add(1);
```

### Delete - O(1)

```js
sset.delete(1);
```

### Lookup - O(1)

```js
sset.has(1);
```

### Iterate - O(n)

```js
sset.forEach(e => {
  someFunction(e);
});
```

### Clear - O(1)

```js
sset.clear();
```
