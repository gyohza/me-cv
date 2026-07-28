<template>
  <AppResume
    v-if="data"
    :data="data"
  />
  <p
    v-else
    role="status"
  >
    Resume data is unavailable right now.
  </p>
</template>

<script lang="ts" setup>
import { resolveLocaleData } from '~/shared/cv/locale';
import type { CvConfig } from '~/shared/types/config';

const { locale } = useI18n();
const config = useRuntimeConfig().public.config as unknown as CvConfig;

const data = computed(() => resolveLocaleData(config, locale.value));
</script>
