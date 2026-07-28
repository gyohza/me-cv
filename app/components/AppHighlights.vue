<template>
  <ul
    v-if="highlights.length"
    class="list-none list-outside flex flex-col gap-1 text-sm"
  >
    <li
      v-for="highlight in highlights"
      :key="highlight"
      class="flex gap-2"
    >
      <Icon
        name="ph:seal-check-fill"
        size="1rem"
        class="inline-block text-accent shrink-0"
        aria-hidden
      />
      {{ highlight }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ highlights: string[] }>();
</script>
