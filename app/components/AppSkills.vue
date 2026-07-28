<template>
  <AppSection
    v-if="skillCategories.length"
    title="Skills"
  >
    <div class="flex flex-col gap-3">
      <AppSkillCategory
        v-for="category in skillCategories"
        :key="category.name"
        :category="category"
      />
    </div>
  </AppSection>
</template>

<script lang="ts" setup>
import type { CvSkillCategory } from '~/shared/types/config';

defineProps<{ skillCategories: CvSkillCategory[] }>();
</script>
