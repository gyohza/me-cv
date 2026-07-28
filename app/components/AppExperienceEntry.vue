<template>
  <article
    itemprop="worksFor"
    itemscope
    itemtype="https://schema.org/Organization"
    class="break-inside-avoid flex flex-col gap-0.5"
  >
    <div class="flex flex-wrap items-center justify-between gap-x-4">
      <h3 class="text-lg text-label tracking-widest font-semibold">
        <span itemprop="name">{{ entry.employer }}</span>
      </h3>
      <p class="text-md text-label flex items-center gap-1.5">
        <span>{{ entry.location }}</span>
        <span class="text-accent">•</span>
        <time>{{ entry.tenure }}</time>
      </p>
    </div>

    <div
      v-for="role in entry.roles"
      :key="role.name"
      class="flex flex-col gap-1"
    >
      <h4 class="text-md font-semibold tracking-wider">
        {{ role.name }}
      </h4>
      <AppHighlights :highlights="role.highlights" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { CvExperience } from '~/shared/types/config';

defineProps<{ entry: CvExperience }>();
</script>
