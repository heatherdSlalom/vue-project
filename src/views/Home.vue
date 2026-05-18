<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDarkMode = computed(() => theme.global.name.value === 'dark')

const toggleTheme = () => {
  theme.global.name.value = isDarkMode.value ? 'light' : 'dark'
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card elevation="8" class="mx-auto pa-8 pb-12" max-width="480">
              <v-row justify="end">
                <v-btn icon @click="toggleTheme" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
                  <v-icon>{{ isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
                </v-btn>
              </v-row>

              <v-row justify="center" class="mt-6">
                <v-avatar size="120">
                  <v-img src="/Headshot.jpg" alt="Heather Davis" />
                </v-avatar>
              </v-row>

              <v-row>
                <v-col cols="12" class="text-center">
                  <h1 class="text-h5 font-weight-bold">Heather Davis, SHRM-CP, PHR</h1>
                  <p class="text-body-1">
                    I design the people systems that make AI adoption actually work | Enterprise Workforce Transformation,
                    Employee Experience, Learning Ecosystems, and Organizational Development.
                  </p>
                </v-col>
              </v-row>

              <v-row class="mt-6" dense>
                <v-col cols="12" class="mb-4">
                  <v-btn block color="primary" variant="tonal" href="mailto:your.email@example.com">
                    <v-icon left>mdi-email</v-icon>
                    Email
                  </v-btn>
                </v-col>
                <v-col cols="12" class="mb-4">
                  <v-btn block color="primary" variant="tonal" href="https://www.instagram.com/paintedlove.love/" target="_blank" rel="noopener">
                    <v-icon left>mdi-instagram</v-icon>
                    Instagram
                  </v-btn>
                </v-col>
                <v-col cols="12" class="mb-4">
                  <v-btn block color="primary" variant="tonal" href="https://www.linkedin.com/in/heatheredavis/" target="_blank" rel="noopener">
                    <v-icon left>mdi-linkedin</v-icon>
                    LinkedIn
                  </v-btn>
                </v-col>
              </v-row>

              <v-row justify="center" class="mt-4 mb-4">
                <v-btn text color="secondary" to="/about">
                  About
                </v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>