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

    const cardBackground = '#292928'
    const background = '#1f201e'
    const textColor = '#ffffff'

    setColors({
      primary: '#5650cb',
      secondary: '#592bf6',
      background: background,
      success: '#00aa61',
      info: '#9a9ea1',
      danger: '#f51500',
      warning: '#e5cc00',
      gray: '#5650cb',
      dark: textColor,
      white: cardBackground,
      divider: cardBackground,
      'card-background': cardBackground,
      'card-color': textColor,
      'modal-dialog-background': cardBackground,
      'dropdown-content-background': background,
      'dropdown-content-text': textColor,
      'select-dropdown-background': background,
      'select-dropdown-text': textColor,
    })
  }

  const toWhite = () => {
    isDark.value = false

    const cardBackground = '#fffeff'
    const background = '#e1e7f2'
    const textColor = '#010b0b'

    setColors({
      primary: '#592bf6',
      secondary: '#3567ad',
      background: background,
      success: '#00aa61',
      info: '#35a5db',
      danger: '#f51500',
      warning: '#e5cc00',
      gray: '#592bf6',
      dark: textColor,
      white: cardBackground,
      divider: cardBackground,
      'card-background': cardBackground,
      'card-color': textColor,
      'modal-dialog-background': cardBackground,
      'dropdown-content-background': background,
      'dropdown-content-text': textColor,
      'select-dropdown-background': background,
      'select-dropdown-text': textColor, 
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

  isDark.value ? toDark() : toWhite()

  return {
    isDark,
    toggle,
    toDark,
    toWhite,
    clockColors,
  }
}