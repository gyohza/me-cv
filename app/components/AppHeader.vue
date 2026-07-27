<template>
  <header class="flex flex-col gap-6">
    <AppIdentity
      :first-name="firstName"
      :last-name="lastName"
      :title="title"
    />
    <AppContactLinks :links="links" />
  </header>
</template>

<script lang="ts" setup>
import type { CvLink } from '~/shared/types/config';

defineProps<{
  firstName: string;
  lastName: string;
  title: string;
  links: CvLink[];
}>();
</script>
