<script setup lang="ts">
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const props = defineProps<{
  level: HeadingLevel
}>()
</script>

<template>
  <component v-bind="$attrs" :is="props.level" class="my-6 font-[555] [&:is(h1)]:text-2xl [&:is(h2)]:text-xl [&:is(h3)]:text-lg">
    <slot />
  </component>
</template>
