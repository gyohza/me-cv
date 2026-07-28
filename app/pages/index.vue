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
import { toOgAccentColor } from '~/shared/cv/accent';
import { resolveLocaleData } from '~/shared/cv/locale';
import { buildSeo } from '~/shared/cv/seo';
import type { CvConfig } from '~/shared/types/config';

const { locale } = useI18n();
const config = useRuntimeConfig().public.config as unknown as CvConfig;

const data = computed(() => resolveLocaleData(config, locale.value));
const seo = computed(() => buildSeo(data.value));

useHead({
  meta: [{ name: 'keywords', content: () => seo.value.keywords }],
});

useSeoMeta({
  title: () => seo.value.title,
  description: () => seo.value.description,
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
});

defineOgImageComponent('Resume', {
  name: computed(() => `${data.value?.firstName ?? ''} ${data.value?.lastName ?? ''}`.trim()),
  title: computed(() => data.value?.title ?? ''),
  accent: toOgAccentColor(config.ui),
});
</script>
