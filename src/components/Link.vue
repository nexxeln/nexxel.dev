<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{ href: string }>()

const isExternal = computed(() => props.href.startsWith("http"))
</script>

<template>
  <a
    :href="props.href"
    :target="isExternal ? '_blank' : '_self'"
    class="underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-600 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-500) hover:(decoration-neutral-400 dark:decoration-neutral-500)"
  >
    <slot />
  </a>
</template>
