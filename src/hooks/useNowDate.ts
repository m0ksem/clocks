import { ref, Ref } from "vue";
import { useInterval } from "./useInterval";

export const useNowDate = (slideDate: Ref<number>) => {
  const now = ref(new Date());

  useInterval(() => {
    now.value = new Date();
    now.value.setHours(slideDate.value);
  }, 1000);

  return {
    now
  }
}