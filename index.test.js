import LWWElementDictionary from './index';

describe('LWWElementDictionary', () => {
  let dictionary1, dictionary2;

  beforeEach(() => {
    dictionary1 = new LWWElementDictionary();
    dictionary2 = new LWWElementDictionary();
  });

  test('add entries', () => {
    dictionary1.add('A', 1);
    dictionary1.add('B', 2);
    expect(dictionary1.getEntries()).toEqual([['A', { value: 1, timestamp: expect.any(Number) }], 
                                        ['B', { value: 2, timestamp: expect.any(Number) }]]);
  });

  test('remove entries', () => {
    dictionary1.add('A', 1);
    dictionary1.add('B', 2);
    dictionary1.remove('B');
    expect(dictionary1.getEntries()).toEqual([['A', { value: 1, timestamp: expect.any(Number) }]]);
  });

  test('update entries', () => {
    dictionary1.add('A', 1);
    dictionary1.update('A', 2);
    expect(dictionary1.getEntries()).toEqual([['A', { value: 2, timestamp: expect.any(Number) }]]);
  });

  test('get value for a key', () => {
    dictionary1.add('A', 1);
    expect(dictionary1.getValue('A')).toBe(1);
    expect(dictionary1.getValue('B')).toBe(null);
  });

  test('merge dictionaries', () => {
    dictionary1.add('A', 1);
    dictionary1.update('A', 2);
    dictionary1.add('B', 3);
    dictionary2.add('A', 4);
    dictionary2.add('C', 5);
    dictionary1.merge(dictionary2);
    expect(dictionary1.getEntries()).toEqual([['A', { value: 2, timestamp: expect.any(Number) }], 
                                        ['B', { value: 3, timestamp: expect.any(Number) }], 
                                        ['C', { value: 5, timestamp: expect.any(Number) }]]);
  });

  test('merge dictionaries with overlapping entries', () => {
    dictionary1.add('A', 1);
    dictionary1.update('A', 2);
    dictionary2.add('A', 3);
    dictionary2.update('A', 4);
    dictionary1.merge(dictionary2);
    expect(dictionary1.getEntries()).toEqual([['A', { value: 2, timestamp: expect.any(Number) }]]);
  });
});