import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import './scss/vuestic-overrides.scss'

createApp(App)
  .use(VuesticPlugin,{
    components: {
      VaCard: {
        color: 'card-background'
      },
    }
  })
  .mount('#app')
