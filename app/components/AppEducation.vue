<template>
  <AppSection
    v-if="education.length"
    title="Education"
  >
    <div class="flex flex-col gap-5">
      <AppEducationEntry
        v-for="entry in education"
        :key="`${entry.institution}-${entry.graduatedIn}`"
        :entry="entry"
      />
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import type { CvEducation } from '~/shared/types/config';

defineProps<{ education: CvEducation[] }>();
</script>
