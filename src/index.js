/**
 * SparseSet is a performant, set-like unsigned integer collection, providing O(1) time complexity for addition, deletion, and lookup. Iteration is O(n).
 */
export default class SparseSet {
  #sparse
  #dense
  #n
  #capacity
  #maximumValue

  #assert(value) {
    if (!Number.isInteger(value) || value < 0 || value > this.#maximumValue) {
      throw new TypeError('SparseSet only supports unsigned (non-negative) integers less than the SparseSet\'s maximumValue.')
    }
  }

  /**
   * 
   * @param {*} capacity Maximum quantity of integers that the SparseSet can contain.
   * @param {*} maximumValue Highest possible integer that the SparseSet can contain.
   * @param {*} UintXXArray Unsigned integer TypedArray constructor for the sparse and dense arrays.
   */
  constructor(capacity, maximumValue, UintXXArray = Uint32Array) {
    this.#assert(capacity);
    this.#assert(maximumValue);
    const maxTypedValue = 2 ** (UintXXArray.BYTES_PER_ELEMENT * 8) - 1;
    if (maximumValue > maxTypedValue) {
      throw new RangeError(`maximumValue exceeds maximum storable value for ${UintXXArray.name}: ${maxTypedValue}.`);
    }

    /**Maximum size */
    this.#capacity = capacity;

    /**Maximum value that can be stored */
    this.#maximumValue = maximumValue;

    /**Cardinality - number of elements in the set */
    this.#n = 0;

    /**Dense array of data/values*/
    this.#dense = new UintXXArray(capacity);

    /**Sparse array of indices/keys*/
    this.#sparse = new UintXXArray(maximumValue + 1);
  }

  /**
   * @returns the number of (unique) elements in SparseSet.
   */
  get size() {
    return this.#n;
  }
  get capacity() {
    return this.#capacity;
  }
  set capacity(value) {
    this.#assert(value);
    // if (value < this.#n) throw new RangeError('Cannot set SparseSet capacity to less than the number of elements in the set.');
    this.#capacity = value;
  }

  /**
   * Appends a new element with a specified value to the end of the SparseSet.
   */
  add(value) {
    this.#assert(value);

    if (this.#n >= this.#capacity) throw new RangeError('SparseSet is full');

    const i = this.#sparse[value];
    if (i < this.#n && this.#dense[i] === value)
      throw new Error('Value is not unique');

    this.#dense[this.#n] = value;
    this.#sparse[value] = this.#n;
    this.#n++;
  }

  /**
   * Removes a specified value from the SparseSet.
   * @returns Returns true if an element in the SparseSet existed and has been removed, or false if the element does not exist.
   */
  delete(value) {
    this.#assert(value);

    if (!this.has(value)) return false;

    const index = this.#sparse[value];
    const last = this.#dense[this.#n - 1];

    this.#dense[index] = last;
    this.#sparse[last] = index;
    this.#n--;

    return true;
  }

  /**
   * @returns a boolean indicating whether an element with the specified value exists in the SparseSet or not.
   */
  has(value) {
    if (value > this.#maximumValue) return false;

    const i = this.#sparse[value];
    return Number.isInteger(i) && i < this.#n && this.#dense[i] === value;
  }

  clear() {
    this.#n = 0;
  }

  /**
   * Executes a provided function once per each value in the SparseSet object, in insertion order.
   */
  forEach(callbackfn, thisArg) {
    for (let i = 0; i < this.#n; i++) {
      callbackfn.call(thisArg, this.#dense[i], i, this);
    }
  }

  /**
   * @returns Returns the dense array value from the given dense array index. If no element is associated with the specified index, undefined is returned.
   */
  get(index) {
    if (!Number.isInteger(index) || index > this.#maximumValue || index < 0 || index >= this.#n) return undefined;
    return this.#dense[index];
  }

  *keys() {
    for (let i = 0; i < this.#n; i++) {
      yield i;
    }
  }

  *values() {
    for (let i = 0; i < this.#n; i++) {
      yield this.#dense[i];
    }
  }

  *entries() {
    for (let i = 0; i < this.#n; i++) {
      yield [i, this.#dense[i]];
    }
  }


  [Symbol.iterator]() {
    return this.entries();
  }

  toArray() {
    return this.#dense.slice(0, this.#n);
  }

  isEmpty() {
    return this.#n === 0;
  }
}