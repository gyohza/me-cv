<template>
  <div class="w-fit">
    <h1
      itemprop="name"
      class="text-7xl font-display lowercase leading-14 print:normal-case print:leading-tight"
    >
      {{ firstName }}
      <span class="text-accent">{{ lastName }}</span>
    </h1>
    <p
      role="doc-subtitle"
      itemprop="jobTitle"
      class="inline-block w-full px-1 text-sm font-medium uppercase text-label [text-align-last:justify] [text-justify:inter-character] print:normal-case print:[text-align-last:auto] print:[text-justify:auto]"
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
