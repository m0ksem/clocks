import { ref, Ref } from "vue";
import { useInterval } from "./useInterval";

export const useNowDate = () => {
  const now = ref(new Date());
  let slide: Ref<number> = ref(now.value.getHours());
  
  useInterval(() => {
    now.value = new Date();
    now.value.setHours(slide.value);
  }, 1000);

  return {
    now,
    slide
  }
}