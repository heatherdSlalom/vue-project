<script setup lang="ts">
import LinkButton from './LinkButton.vue'

const props = defineProps({
  items: {
    type: Array as () => Array<{ label: string; url: string; icon?: string }>,
    required: true,
  },
})
</script>

<template>
  <v-row class="mt-6" dense>
    <v-col
      v-for="(item, i) in props.items"
      :key="i"
      cols="12"
      sm="12"
      class="mb-4"
    >
      <LinkButton :label="item.label" :url="item.url" :icon="item.icon" />
    </v-col>
  </v-row>
</template>

<style scoped>
</style>
