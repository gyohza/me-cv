<template>
  <article
    itemprop="alumniOf"
    itemscope
    itemtype="https://schema.org/EducationalOrganization"
    class="break-inside-avoid flex flex-col gap-1"
  >
    <div class="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 class="text-lg text-label tracking-widest font-semibold">
        <span itemprop="name">{{ entry.institution }}</span>
      </h3>
      <p class="text-md text-label flex items-center gap-1.5">
        <span>{{ entry.location }}</span>
        <Icon name="ph:dot-outline-fill" />
        <span>Graduated</span>
        <time>{{ entry.graduatedIn }}</time>
      </p>
    </div>
    <p class="text-md font-semibold">
      {{ entry.title }}
    </p>
    <AppHighlights :highlights="entry.highlights ?? []" />
  </article>
</template>

<script lang="ts" setup>
import type { CvEducation } from '~/shared/types/config';

defineProps<{ entry: CvEducation }>();
</script>
