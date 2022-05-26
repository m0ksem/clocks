import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import './scss/vuestic-overrides.scss'

createApp(App)
  .use(createVuestic({
    config: {
      components: {
        VaCard: {
          color: 'card-background'
        },
      }
    }
  }))
  .mount('#app')
