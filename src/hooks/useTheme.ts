import { watch } from 'vue';
import { useColors } from 'vuestic-ui'
import { computed, ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const isBrowserSetToDarkTheme = () => Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

export const useTheme = () => {
  const { applyPreset, currentPresetName } = useColors()

  const { storage } = useLocalStorage('theme', { isDark: isBrowserSetToDarkTheme() })

  watch(currentPresetName, () => {
    storage.value.isDark = currentPresetName.value === 'dark'
  })

  const toggle = () => currentPresetName.value === 'dark' ? applyPreset('light') : applyPreset('dark')

  const clockColors = computed(() => {
    if (currentPresetName.value === 'dark') {
      return [
        "#007EA7",
        "#63326E",
        "#306B34",
        "#2B50AA",
        "#D44D5C",
        "#7D70BA",
        "#BC4B51",
      ]
    }

    return [
      "#4cc9f0",
      "#ffc6ff",
      "#06d6a0",
      "#4ea8de",
      "#f9c74f",
      "#bdb2ff",
      "#ffc6ff",
    ]
  })

  if (storage.value.isDark) {
    applyPreset('dark')
  } else {
    applyPreset('light')
  }

  return {
    toggle,
    clockColors,
    currentPresetName,
  }
}