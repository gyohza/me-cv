<template>
  <AppSection
    v-if="experience.length"
    title="Experience"
  >
    <div class="flex flex-col gap-5">
      <AppExperienceEntry
        v-for="entry in experience"
        :key="`${entry.employer}-${entry.tenure}`"
        :entry="entry"
      />
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import type { CvExperience } from '~/shared/types/config';

defineProps<{ experience: CvExperience[] }>();
</script>
