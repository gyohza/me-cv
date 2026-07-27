<template>
  <header class="flex flex-col gap-4">
    <section class="w-fit" itemscope itemtype="https://schema.org/Person">
      <h1 class="text-7xl lowercase leading-12" itemprop="name">
        {{ firstName }}
        <span class="text-accent"> {{ lastName }} </span>
      </h1>
      <p
        role="doc-subtitle"
        class="inline-block text-sm uppercase w-full text-label px-1 font-medium [text-align-last:justify] [text-justify:inter-character]"
        itemprop="jobTitle"
      >
        {{ title }}
      </p>
    </section>
    <ul class="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
      <li
        v-for="link in links"
        :key="link.url"
        class="flex items-center gap-2 text-sm odd:col-start-1 odd:text-left even:col-start-2 even:flex-row-reverse even:text-right even:justify-self-end"
      >
        <Icon
          :name="link.icon"
          size="1.125rem"
          class="text-accent"
          aria-hidden="true"
        />
        <a
          :href="link.url"
          :aria-label="link.label"
          class="tracking-wider"
        >
          {{ link.value }}
        </a>
      </li>
    </ul>
  </header>
</template>

<script lang="ts" setup>
import type { CvLink } from '~/shared/types/config';

interface Props {
  firstName: string;
  lastName: string;
  title: string;
  links: CvLink[];
}

const { firstName, lastName, title } = defineProps<Props>();
</script>
