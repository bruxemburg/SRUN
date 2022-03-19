import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/main.css'
import 'virtual:windi-utilities.css'

// only for dev purposes
import 'virtual:windi-devtools'

const app = createApp(App)

app.use(router)

app.mount('#app')
