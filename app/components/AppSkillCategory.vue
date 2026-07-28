<template>
  <div class="break-inside-avoid flex flex-col gap-1">
    <h3 class="text-sm uppercase tracking-wide text-label">
      {{ category.name }}
    </h3>
    <ul class="flex flex-wrap gap-y-1 text-sm overflow-x-hidden">
      <li v-for="skill in category.skills" :key="skill">
        <Icon
          name="ph:dot-outline-fill"
          size="1rem"
          class="-ml-6 mr-2 -mb-0.5 text-accent"
        />
        <span itemprop="knowsAbout" class="mr-8 font-semibold tracking-wider">
          {{ skill }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { CvSkillCategory } from '~/shared/types/config';

defineProps<{ category: CvSkillCategory }>();
</script>
