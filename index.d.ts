type TypedArrayConstructor =
  | Uint8ArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | BigUint64ArrayConstructor;

/**
 * SparseSet is a performant, set-like unsigned integer collection,
 * providing O(1) time complexity for addition, deletion, and lookup.
 * Iteration is O(n).
 */
export default class SparseSet {
  /**
   * Creates a new SparseSet.
   * @param capacity Maximum quantity of integers the SparseSet can contain.
   * @param maximumValue Highest possible integer the SparseSet can contain.
   * @param UintXXArray Optional TypedArray constructor to use for internal storage (default: Uint32Array).
   */
  constructor(
    capacity: number,
    maximumValue: number,
    UintXXArray?: TypedArrayConstructor
  );

  /** Number of unique elements currently in the set */
  get size(): number;

  /** Maximum capacity of the set */
  get capacity(): number;

  /** Sets a new capacity for the set */
  set capacity(value: number);

  /**
   * Adds a value to the set.
   * @param value The unsigned integer to add.
   */
  add(value: number): void;

  /**
   * Removes a value from the set.
   * @param value The unsigned integer to remove.
   * @returns True if the value existed and was removed, false otherwise.
   */
  delete(value: number): boolean;

  /**
   * Checks if a value exists in the set.
   * @param value The unsigned integer to check.
   * @returns True if the value exists, false otherwise.
   */
  has(value: number): boolean;

  /** Removes all elements from the set. */
  clear(): void;

  /**
   * Gets the element at a given index in the dense array.
   * @param index The dense array index.
   * @returns The value at the index or undefined if out of bounds.
   */
  get(index: number): number | undefined;

  /**
   * Calls a function for each element in insertion order.
   * @param callbackfn Function to execute for each element.
   * @param thisArg Optional this context for callbackfn.
   */
  forEach(
    callbackfn: (value: number, index: number, set: SparseSet) => void,
    thisArg?: any
  ): void;

  /** Returns an iterator over dense array indices. */
  keys(): IterableIterator<number>;

  /** Returns an iterator over set values in insertion order. */
  values(): IterableIterator<number>;

  /** Returns an iterator over [index, value] pairs in insertion order. */
  entries(): IterableIterator<[number, number]>;

  /** Converts the set contents to an array. */
  toArray(): number[];

  /** Checks if the set is empty. */
  isEmpty(): boolean;

  /** Iterates over [index, value] pairs (default iterator). */
  [Symbol.iterator](): IterableIterator<[number, number]>;
}
