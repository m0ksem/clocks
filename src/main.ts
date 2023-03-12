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

    }
  }))
  .use(createPinia())
  .mount('#app')
