import { ref, Ref } from "vue";
import { useInterval } from "./useInterval";
import { useStore } from '../store/store'
import { storeToRefs } from 'pinia'

export const useNowDate = () => {
  const now = ref(new Date());

  const store = useStore()
  const { calculatedTime } = storeToRefs(store)

  calculatedTime.value = now.value.getHours();
  
  useInterval(() => {
    now.value = new Date();
    now.value.setHours(calculatedTime.value);
  }, 1000);

  return {
    now,
  }
}