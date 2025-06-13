import SparseSet from '../src/sparse-set'

describe('SparseSet', () => {
  it('constructs with valid parameters', () => {
    const set = new SparseSet(10, 100);
    expect(set.size).toBe(0);
    expect(set.capacity).toBe(10);
    expect(set.isEmpty()).toBe(true);
  });

  it('throws on invalid constructor arguments', () => {
    expect(() => new SparseSet(-1, 10)).toThrow();
    expect(() => new SparseSet(10, -1)).toThrow();
    expect(() => new SparseSet(10, 2 ** 32, Uint32Array)).toThrow();
  });

  it('adds and checks values', () => {
    const set = new SparseSet(3, 10);
    set.add(2);
    set.add(5);
    expect(set.size).toBe(2);
    expect(set.has(2)).toBe(true);
    expect(set.has(5)).toBe(true);
    expect(set.has(3)).toBe(false);
  });

  it('throws when adding duplicate values', () => {
    const set = new SparseSet(2, 10);
    set.add(1);
    expect(() => set.add(1)).toThrow('Value is not unique');
  });

  it('throws when adding beyond capacity', () => {
    const set = new SparseSet(2, 10);
    set.add(1);
    set.add(2);
    expect(() => set.add(3)).toThrow('SparseSet is full');
  });

  it('deletes values', () => {
    const set = new SparseSet(3, 10);
    set.add(2);
    set.add(5);
    expect(set.delete(2)).toBe(true);
    expect(set.has(2)).toBe(false);
    expect(set.size).toBe(1);
    expect(set.delete(2)).toBe(false);
  });

  it('clear empties the set', () => {
    const set = new SparseSet(3, 10);
    set.add(1);
    set.add(2);
    set.clear();
    expect(set.size).toBe(0);
    expect(set.isEmpty()).toBe(true);
    expect(set.has(1)).toBe(false);
  });

  it('forEach iterates in insertion order', () => {
    const set = new SparseSet(3, 10);
    set.add(1);
    set.add(2);
    const values = [];
    set.forEach((v) => values.push(v));
    expect(values).toEqual([1, 2]);
  });

  it('get returns correct values and undefined for out-of-bounds', () => {
    const set = new SparseSet(3, 10);
    set.add(7);
    set.add(8);
    expect(set.get(0)).toBe(7);
    expect(set.get(1)).toBe(8);
    expect(set.get(2)).toBeUndefined();
    expect(set.get(-1)).toBeUndefined();
    expect(set.get(100)).toBeUndefined();
  });

  it('keys, values, entries, and iterator work', () => {
    const set = new SparseSet(3, 10);
    set.add(4);
    set.add(7);

    expect(Array.from(set.keys())).toEqual([0, 1]);
    expect(Array.from(set.values())).toEqual([4, 7]);
    expect(Array.from(set.entries())).toEqual([[0, 4], [1, 7]]);
    expect(Array.from(set)).toEqual([[0, 4], [1, 7]]);
  });

  it('toArray returns dense array', () => {
    const set = new SparseSet(3, 10);
    set.add(3);
    set.add(6);
    expect(set.toArray()).toEqual([3, 6]);
  });

  it('capacity getter/setter works', () => {
    const set = new SparseSet(2, 10);
    expect(set.capacity).toBe(2);
    set.capacity = 3;
    expect(set.capacity).toBe(3);
    // Setting to invalid value throws
    expect(() => { set.capacity = -1; }).toThrow();
  });

  it('has returns false for values above maximumValue', () => {
    const set = new SparseSet(2, 5);
    expect(set.has(6)).toBe(false);
  });

  it('works with different TypedArray constructors', () => {
    const set = new SparseSet(2, 255, Uint8Array);
    set.add(1);
    set.add(2);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
  });
});