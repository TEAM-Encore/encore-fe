import * as SecureStore from 'expo-secure-store';

type Key = 'accessToken' | 'userInfo';

export async function saveToken(key: Key, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: Key) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteToken(key: Key) {
  await SecureStore.deleteItemAsync(key);
}