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
      <v-container fluid class="fill-height py-12 pa-0">
        <v-row align="center" justify="center" class="ma-0">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="mx-auto pa-8 pb-10" elevation="10">
              <v-row justify="end">
                <v-btn icon @click="toggleTheme" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
                  <v-icon>{{ isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
                </v-btn>
              </v-row>
              <v-row justify="center" class="mt-8">
                <v-avatar size="120">
                  <v-img src="/Headshot.jpg" alt="Heather Davis" />
                </v-avatar>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <div class="text-h5 font-weight-bold">Heather Davis, SHRM-CP, PHR</div>
                  <div class="text-body-2 mt-3">
                    I design the people systems that make AI adoption actually work | Enterprise Workforce Transformation, Employee Experience, Learning Ecosystems, and Organizational Development.
                  </div>
                </v-col>
              </v-row>
              <v-row class="mt-10" dense>
                <v-col cols="12" class="mb-4">
                  <v-btn block color="primary" variant="tonal" href="mailto:heather.d@slalom.com">
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>