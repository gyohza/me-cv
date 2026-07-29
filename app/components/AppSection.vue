<template>
  <section :aria-labelledby="headingId" class="flex flex-col gap-1 pb-6">
    <div class="flex flex-row items-center gap-4">
      <h2
        :id="headingId"
        class="text-3xl text-accent font-display lowercase tracking-widest brightness-95"
      >
        {{ title }}
      </h2>
      <hr
        class="inline-block border-t-2 border-accent/60 w-full -mb-1 rounded-full overflow-hidden"
      />
    </div>
    <slot />
  </section>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>();

const headingId = useId();
</script>
