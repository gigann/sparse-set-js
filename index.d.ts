type TypedArrayConstructor =
  | Uint8ArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | BigUint64ArrayConstructor;

export default class SparseSet {
  constructor(
    capacity: number,
    maximumValue: number,
    UintXXArray?: TypedArrayConstructor
  );

  get size(): number;
  get capacity(): number;
  set capacity(value: number);

  add(value: number): void;
  delete(value: number): boolean;
  has(value: number): boolean;
  clear(): void;
  get(index: number): number | undefined;

  forEach(
    callbackfn: (value: number, index: number, set: SparseSet) => void,
    thisArg?: any
  ): void;

  keys(): IterableIterator<number>;
  values(): IterableIterator<number>;
  entries(): IterableIterator<[number, number]>;

  toArray(): number[];
  isEmpty(): boolean;

  [Symbol.iterator](): IterableIterator<[number, number]>;
}
