<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
})

const targetAttrs = computed(() => {
  if (props.url.startsWith('http')) {
    return {
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {}
})
</script>

<template>
  <v-btn
    block
    color="primary"
    variant="tonal"
    :href="props.url"
    v-bind="targetAttrs"
  >
    <template v-if="props.icon">
      <v-icon left>{{ props.icon }}</v-icon>
    </template>
    {{ props.label }}
  </v-btn>
</template>

<style scoped>
</style>
