import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-

createApp(App)
  .use(VuesticPlugin,{
    components: {
      VaCard: {
        color: 'cardColor'
      },
    }
  })
  .mount('#app')
