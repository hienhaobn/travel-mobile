import AsyncStorage from '@react-native-async-storage/async-storage';

export enum KeyStorage {
    Language = 'drcex_language',
    Theme = 'drcex_theme',
    LastEmailLogin = 'drcex_last_email_login',
    TimeAutoLock = 'drcex_time_auto_lock',
}

type StorageValue = string;

const get = async (key: KeyStorage): Promise<string | undefined> => {
    const value = await AsyncStorage.getItem(key);
    return value || undefined;
};

const set = async (key: KeyStorage, value: StorageValue) => {
    await AsyncStorage.setItem(key, value);
};

const setTimeLock = async (key: KeyStorage, value: string, userID: number) => {
    await AsyncStorage.setItem(`${key}_${userID}`, value);
};

const getTimeLock = async (key: KeyStorage, userID: number): Promise<string | undefined> => {
    const value = await AsyncStorage.getItem(`${key}_${userID}`);
    return value || undefined;
};

const remove = async (key: KeyStorage) => {
    await AsyncStorage.removeItem(key);
};

const Storages = {
    get,
    set,
    remove,
    setTimeLock,
    getTimeLock,
};

export default Storages;
