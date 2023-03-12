import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import { createPinia } from 'pinia'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import './scss/vuestic-overrides.scss'
import 'uno.css'

createApp(App)
  .use(createVuestic({
    config: {
      colors: {
        presets: {
          light: {
            primary: '#253fae',
            info: '#40a6f1',
            success: '#1da563',
            warning: '#e2cc1d',
            danger: '#f0210e',
            backgroundPrimary: '#dbe9fc'
            // backgroundPrimary: '#f0f'
          },
          dark: {
            backgroundPrimary: '#121213',
            backgroundSecondary: '#1a1a1c',
            backgroundElement: '#262629',
            primary: '#2b54fa'
          }
        }
      }
    }
  }))
  .use(createPinia())
  .mount('#app')
