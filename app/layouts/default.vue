<template>
  <div class="bg-accent/15 print:bg-transparent min-h-dvh">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-surface focus:text-content focus:px-3 focus:py-2 focus:no-underline print:hidden"
    >
      Skip to content
    </a>
    <main
      id="main-content"
      tabindex="-1"
      class="container m-auto max-w-5xl bg-surface px-10 py-16 print:max-w-none"
    >
      <slot />
    </main>
  </div>
</template>
