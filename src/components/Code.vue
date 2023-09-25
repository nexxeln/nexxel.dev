<template>
  <code
    class="[letter-spacing:-0.02em] rounded text-sm after:(font-black text-gray-600) before:(font-black text-gray-600)"
  >
    <slot />
  </code>
</template>

<style>
code::before,
code::after {
  content: "`";
}

pre {
  --at-apply: "[tab-size:2] overflow-x-auto rounded p-4 text-sm [&code]:(text-base after:content-none before:content-none) [letter-spacing:unset]";
}

pre code::before,
pre code::after {
  content: none;
}
</style>
