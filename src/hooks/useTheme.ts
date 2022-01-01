import { useColors } from 'vuestic-ui'
import { computed, ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'

const isBrowserSetToDarkTheme = () => Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

export const useTheme = () => {
  const { setColors } = useColors()

  const { storage } = useLocalStorage('theme', { isDark: isBrowserSetToDarkTheme() })

  const isDark = computed({
    get() { return storage.value.isDark },
    set(val: boolean) { storage.value.isDark = val }
  })

  const toDark = () => {
    isDark.value = true
    setColors({
      primary: '#6320EE',
      secondary: '#202020',
      background: '#121212',
      success: '#60a315',
      info: '#827ef3',
      danger: '#f00a67',
      warning: '#febf6d',
      gray: '#aeaeb1',
      dark: '#ffffff',
      white: '#020000',
      cardColor: '#202020',
    })
  }

  const toWhite = () => {
    isDark.value = false
    setColors({
      primary: '#2C82E0',
      secondary: '#cbe4f0',
      background: '#f4f8fa',
      success: '#40e583',
      info: '#2c82e0',
      danger: '#DE1041',
      warning: '#FFAC0A',
      gray: '#202020',
      dark: '#0a1622',
      white: '#ffffff',
      cardColor: '#fcfdff',
    })
  }

  const toggle = () => isDark.value ? toWhite() : toDark()

  const clockColors = computed(() => {
    if (isDark.value) {
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

  return {
    isDark,
    toggle,
    toDark,
    toWhite,
    clockColors,
  }
}