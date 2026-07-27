<template>
  <section
    v-if="links.length"
    data-nosnippet
    class="py-2"
  >
    <ul
      class="grid grid-cols-2 gap-x-4 gap-y-1.5"
    >
      <li
        v-for="link in links"
        :key="link.url"
        class="flex items-center gap-2 text-sm odd:col-start-1 odd:text-left even:col-start-2 even:flex-row-reverse even:justify-self-end even:text-right"
      >
        <Icon
          :name="link.icon ?? 'ph:dot-fill'"
          size="1.125rem"
          class="text-accent"
          aria-hidden="true"
        />
        <a
          :href="link.url"
          class="tracking-wider"
        >
          <strong class="sr-only">
            {{ link.label }}:
          </strong>
          {{ link.value }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { CvLink } from '~/shared/types/config';

const { links } = defineProps<{ links: CvLink[] }>();
</script>
