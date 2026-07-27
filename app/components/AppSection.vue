<template>
  <section
    :aria-labelledby="headingId"
    class="flex flex-col gap-3 pb-8"
  >
    <div class="flex flex-row items-center gap-2">
      <h2
        :id="headingId"
        class="text-3xl text-accent text-shadow-content/5 text-shadow-lg font-display lowercase tracking-wide"
      >
        {{ title }}
      </h2>
      <hr class="inline-block border-b-2 border-accent/20 w-full -mb-1">
    </div>
    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();

const headingId = useId();
</script>
