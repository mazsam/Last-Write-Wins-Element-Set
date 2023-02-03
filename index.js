export default class LWWElementDictionary {
  constructor() {
    this.dict = new Map();
  }

  add(key, value) {
    const timestamp = new Date().getTime();
    this.dict.set(key, { value, timestamp });
  }

  remove(key) {
    this.dict.delete(key);
  }

  update(key, value) {
    const timestamp = new Date().getTime();
    this.dict.set(key, { value, timestamp });
  }

  getValue(key) {
    const entry = this.dict.get(key);
    return entry ? entry.value : null;
  }

  getEntries() {
    return Array.from(this.dict.entries());
  }

  merge(other) {
    for (const [key, entry] of other.dict) {
      const thisEntry = this.dict.get(key);
      if (!thisEntry || entry.timestamp > thisEntry.timestamp) {
        this.dict.set(key, entry);
      }
    }
  }
}