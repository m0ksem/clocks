import { onBeforeUnmount, onMounted } from "@vue/runtime-core"

export const useInterval = (cb: (...args: []) => any, time: number) => {
  let interval: any = -1

  onMounted(() => {
    interval = setInterval(cb, time)
  })

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
}