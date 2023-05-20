<script setup lang="ts">
const props = defineProps<{ href: string }>()
</script>

<template>
  <a :href="props.href" class="underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-700 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-600) hover:(decoration-neutral-400 dark:decoration-neutral-600)">
    <slot />
  </a>
</template>
