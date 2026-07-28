<template>
  <div
    class="h-full w-full flex flex-col justify-center gap-4 px-24"
    :style="{ backgroundColor: surface, color: content }"
  >
    <span class="text-8xl font-semibold tracking-tight">{{ name }}</span>
    <span class="text-4xl" :style="{ color: accent }">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
const DARK_SURFACE = '#24272b';
const DARK_CONTENT = '#fffffa';

withDefaults(
  defineProps<{
    name?: string;
    title?: string;
    accent?: string;
    surface?: string;
    content?: string;
  }>(),
  {
    name: '',
    title: '',
    accent: DARK_CONTENT,
    surface: DARK_SURFACE,
    content: DARK_CONTENT,
  },
);
</script>
