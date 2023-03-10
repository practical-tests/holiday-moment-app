import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage<TypeItem = any> {
  constructor(private readonly storageName: string) {}

  public async insert(key: string, data: TypeItem) {
    await AsyncStorage.setItem(
      `${this.storageName}@${key}`,
      JSON.stringify(data)
    );
  }

  public async getKeys() {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter((key) => key.startsWith(`${this.storageName}@`));
  }

  public async get(key: string): Promise<TypeItem | undefined> {
    const searchKey = key.startsWith(`${this.storageName}@`)
      ? key
      : `${this.storageName}@${key}`;
    const item = await AsyncStorage.getItem(searchKey);

    if (!item) return undefined;
    return JSON.parse(item);
  }

  public async getAll(): Promise<TypeItem[]> {
    const keys = await this.getKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items
      .filter(([, value]) => value)
      .map(([, value]) => JSON.parse(value));
  }

  public async remove(key: string) {
    const searchKey = key.startsWith(`${this.storageName}@`)
      ? key
      : `${this.storageName}@${key}`;

    await AsyncStorage.removeItem(searchKey);
  }

  public async clear() {
    const keys = await this.getKeys();
    await Promise.all(keys.map((key) => AsyncStorage.removeItem(key)));
  }
}

export { Storage };
