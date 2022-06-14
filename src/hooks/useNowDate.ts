import { ref, Ref } from "vue";
import { useInterval } from "./useInterval";
import { useStore } from '../store/store'
import { storeToRefs } from 'pinia'

export const useNowDate = () => {
  const now = ref(new Date());

  const store = useStore()
  const { nowTimeOffset } = storeToRefs(store)

  nowTimeOffset.value = now.value.getHours();
  
  useInterval(() => {
    now.value = new Date();
    now.value.setHours(nowTimeOffset.value);
  }, 1000);

  return {
    now,
  }
}