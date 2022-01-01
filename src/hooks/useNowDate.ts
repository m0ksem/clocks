import { ref } from "vue";
import { useInterval } from "./useInterval";

export const useNowDate = () => {
  const now = ref(new Date());

  useInterval(() => {
    now.value = new Date();
  }, 1000);

  return {
    now
  }
}