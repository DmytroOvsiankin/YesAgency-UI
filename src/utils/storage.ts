import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async <T = string>(
  key: StorageKeyType,
  shouldParse = false,
): Promise<T | null> => {
  const data: string | null = await AsyncStorage.getItem(key);

  if (!data) {
    return null;
  }

  if (shouldParse && data) {
    return JSON.parse(data) as T;
  }

  return data as T;
};

export const setItem = (key: StorageKeyType, value: string) => {
  return AsyncStorage.setItem(key, value);
};

export const removeItem = (key: StorageKeyType) => {
  return AsyncStorage.removeItem(key);
};
