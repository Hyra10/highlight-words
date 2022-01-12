
export interface StorageItem {
  key: string;
  value: any;
}

export class LocalStorageItem {
  key: string;
  value: any;

  constructor(data: StorageItem) {
    this.key = data.key;
    this.value = data.value;
  }
}

export default class LocalStorageHelper {

  constructor() {}

  /**
   * adds an item in local storage for the given key
   * @param key the key for the data
   * @param item the data to store
   */
  static add<T>(key: string, item: T) {
    const stringifyObject = JSON.stringify(item);
    localStorage.setItem(key, stringifyObject);
  }

  /**
   * gets an item in local storage for the given key
   * @param key the key for the data
   * @returns the data for the given key
   */
  static get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * removes an item in localstorage
   * @param key the key for the given data
   */
  static remove(key: string): void {
    localStorage.removeItem(key);
  }

}
