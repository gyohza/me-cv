<template>
  <article
    itemscope
    itemtype="https://schema.org/Person"
    class="flex flex-col"
  >
    <AppHeader
      :first-name="data.firstName"
      :last-name="data.lastName"
      :title="data.title"
      :links="data.links"
    />
  </article>
</template>

<script lang="ts" setup>
import type { CvLocaleData } from '~/shared/types/config';

defineProps<{ data: CvLocaleData }>();
</script>
