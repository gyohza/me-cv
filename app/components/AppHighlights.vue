<template>
  <ul
    v-if="highlights.length"
    class="list-none marker:text-accent text-sm flex flex-col gap-1"
  >
    <li v-for="highlight in highlights" :key="highlight" class="flex gap-2">
      <span class="text-accent">•</span>
      {{ highlight }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ highlights: string[] }>();
</script>
