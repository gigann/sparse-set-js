export default class SparseSet {
  constructor(capacity: number, maximumValue: number, UintXXArray?: typeof Uint32Array);
  get size(): number;
  get capacity(): number;
  set capacity(value: number);
  add(value: number): void;
  delete(value: number): boolean;
  has(value: number): boolean;
  clear(): void;
  forEach(callback: (value: number, index: number, set: SparseSet) => void, thisArg?: any): void;
  get(index: number): number | undefined;
  isEmpty(): boolean;
  toArray(): number[];
  keys(): IterableIterator<number>;
  values(): IterableIterator<number>;
  entries(): IterableIterator<[number, number]>;
}
