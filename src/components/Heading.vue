<script setup lang="ts">
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

const props = defineProps<{
  level: HeadingLevel
}>()
</script>

<template>
  <component v-bind="$attrs" :is="props.level" class="my-6 font-[555] font-semibold [&:is(h1)]:text-xl [&:is(h2)]:text-lg [&:is(h3)]:text-base text-imp">
    <slot />
  </component>
</template>
