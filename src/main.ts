import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'myDashboardTheme',
    themes: {
      myDashboardTheme: {
        dark: true,
        colors: {
          primary: '#7c86ff',
          secondary: '#3fc6b7',
          accent: '#ff8a57',
          surface: '#262a31',
          background: '#0b0e13',
        },
      },
    },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
