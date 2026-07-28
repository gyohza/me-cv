<template>
  <section
    :aria-labelledby="headingId"
    class="flex flex-col gap-2 pb-8"
  >
    <div class="flex flex-row items-center gap-4">
      <h2
        :id="headingId"
        class="text-4xl text-accent font-display lowercase tracking-widest brightness-95"
      >
        {{ title }}
      </h2>
      <hr class="inline-block border-b-2 border-accent/50 w-full -mb-1">
    </div>
    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();

const headingId = useId();
</script>
