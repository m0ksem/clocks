import { ref, watch } from "vue";

export const useLocalStorage = <T>(key: string, defaultValue: T = {} as T) => {
  const saved = JSON.parse(localStorage.getItem(key) || "null");
  const storage = ref<T>(saved || defaultValue);

  watch(
    storage,
    (newStorage) => { localStorage.setItem(key, JSON.stringify(newStorage)); },
    { deep: true }
  );

  return {
    storage
  }
}