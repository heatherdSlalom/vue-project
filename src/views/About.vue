<template>
  <v-container class="py-8 py-md-12">
    <v-row justify="center">
      <v-col cols="12" md="9" lg="8">
        <v-card rounded="xl" elevation="10" class="pa-6 pa-md-8">
          <v-chip color="secondary" variant="tonal" class="mb-4">Project setup</v-chip>
          <h1 class="page-title text-h3 text-md-h2 font-weight-bold mb-4">Built for dashboard work</h1>
          <p class="text-body-1 text-medium-emphasis mb-6">
            This starter uses Vite, Vue 3, TypeScript, Vue Router, Vuetify 3, Material Design Icons, chart.js,
            and vue-chartjs so you can begin adding pages, metrics, and visualizations right away.
          </p>

          <v-list density="comfortable" lines="two">
            <v-list-item prepend-icon="mdi-vite">
              <template #title>Vite + TypeScript</template>
              <template #subtitle>Fast builds and strongly typed Vue single-file components.</template>
            </v-list-item>
            <v-list-item prepend-icon="mdi-router">
              <template #title>Vue Router</template>
              <template #subtitle>Two starter routes are ready for expansion.</template>
            </v-list-item>
            <v-list-item prepend-icon="mdi-chart-box-outline">
              <template #title>Chart.js + vue-chartjs</template>
              <template #subtitle>The home page includes a sample line chart.</template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>