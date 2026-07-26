<template>
  <div class="bg-surface min-h-dvh w-5xl py-16 px-10 container m-auto">
    <AppHeader
      :first-name="data?.firstName ?? ''"
      :last-name="data?.lastName ?? ''"
      :title="data?.title ?? ''"
      :links="data?.links ?? []"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CvConfig } from '~/shared/types/config';

const { locale } = useI18n()
const config = useRuntimeConfig().public.config as unknown as CvConfig;

const data = computed(() => config.data[locale.value]);

</script>
