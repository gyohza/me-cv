<template>
  <div class="w-fit">
    <h1
      itemprop="name"
      class="text-8xl font-display lowercase leading-14 [word-spacing:-1rem]"
    >
      {{ firstName }}
      <span class="text-accent">{{ lastName }}</span>
    </h1>
    <p
      role="doc-subtitle"
      itemprop="jobTitle"
      class="inline-block w-full pt-3 px-1 text-sm font-medium uppercase text-label [text-align-last:justify] [text-justify:inter-character]"
    >
      {{ title }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  firstName: string;
  lastName: string;
  title: string;
}>();
</script>
