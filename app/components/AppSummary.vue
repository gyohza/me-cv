<template>
  <section class="relative py-8">
    <Icon
      :name="quoteIconName"
      :size="quoteIconsize"
      class="absolute top-0 left-1/16 opacity-10 rotate-180 text-accent/60"
    />
    <p
      v-if="summary"
      itemprop="description"
      class="w-4/5 max-w-2xl m-auto text-justify whitespace-pre-wrap tracking-wider"
    >
      <strong class="sr-only">Summary: </strong>{{ summary }}
    </p>
    <Icon
      :name="quoteIconName"
      :size="quoteIconsize"
      class="absolute bottom-0 right-1/16 opacity-10 text-accent/60"
    />
  </section>
</template>

<script lang="ts" setup>
defineProps<{ summary: string }>();

const quoteIconName = ref('ph:quotes-fill');
const quoteIconsize = ref('6rem');
</script>
