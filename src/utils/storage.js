export default class Storage {
  static getItem(key) {
    let storage = localStorage.getItem(key);
    if (typeof storage === 'object') {
      storage = JSON.parse(storage);
    } else if (typeof storage === 'number') {
      storage = parseInt(storage, 2);
    }
    return storage;
  }

  static setItem(key, value) {
    let body = value;
    if (typeof value === 'object') {
      body = JSON.stringify(value);
    }
    return localStorage.setItem(key, body);
  }

  static removeItem(key) {
    if (key === undefined) {
      return;
    }
    localStorage.removeItem(key);
  }

  static clearAll() {
    localStorage.clear();
  }
}
