<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

:root {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --card-bg: #2a2a2a;
  --button-bg: #3a3a3a;
  --button-hover: #4a4a4a;
  --accent: #007bff;
}

.light-mode {
  --bg-color: #f8f9fa;
  --text-color: #212529;
  --card-bg: #ffffff;
  --button-bg: #e9ecef;
  --button-hover: #dee2e6;
  --accent: #0056b3;
}
</style>
