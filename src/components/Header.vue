<script setup lang="ts">
import { ref } from "vue";
import { Capacitor } from "@capacitor/core";

// import { Power2, gsap } from 'gsap'
// import SearchIcon from "~icons/srun/search";
// import PlusIcon from "~icons/srun/plus";

const emits = defineEmits<{
  (event: "interaction", interactable: string, interaction: string, ...args: any[]): void;
}>();

const searchDialog = () => {
  // console.log('searhc')
};

const isInViewport = (element: string) => {
  // const e = element.getBoundingClientRect()
  const e = document.querySelector(`#${element}`)?.getBoundingClientRect();

  if (e == null) return false;

  if (
    e.top >= 0 &&
    e.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    /* && e.left >= 0 && e.right <= (window.innerWidth || document.documentElement.clientWidth) */
  )
    return false;

  return true;
};

const header = ref(false);

window.addEventListener("scroll", () => {
  header.value = isInViewport("relative-header-end");

  const fixedHeader: HTMLElement | null = document.querySelector("#fixed-header");
  if (fixedHeader == null) return;

  const state = fixedHeader.getAttribute("data-animation-state");

  /* const tl = gsap.timeline({ paused: true })
  tl.to(fixedHeader, {
    opacity: 1,
    duration: 0.3,
    ease: Power2.easeInOut,
  }) */

  if (state === "show") {
    // show anima
    fixedHeader.style.opacity = "1";
  } else if (state === "hide") {
    // hide anima
    fixedHeader.style.opacity = "0";
  }
});
</script>

<template>
  <header class="releative">
    <div
      id="relative-header"
      class="relative z-98"
      :class="Capacitor.getPlatform() === 'ios' ? 'pt-3.75em' : 'pt-1em'"
    >
      <div class="flex flex-row items-center w-full mt-1em p-1em">
        <div class="container-blur" />
        <h1 class="ml-0 mr-auto">
          <!-- TODO: Replace hardcoded values -->
          <span class="font-medium">Your</span>
          alarms
        </h1>
        <div class="flex flex-row gap-1em mr-0 ml-auto">
          <i-srun-search
            class="w-2.25em h-2.25em mt-0.5em min-w-31.30434782608696px min-h-31.30434782608696px"
            @click="searchDialog()"
          />
          <i-srun-plus
            class="w-2.25em h-2.25em mt-0.5em min-w-31.30434782608696px min-h-31.30434782608696px"
            @click="emits('interaction', 'alarm', 'new')"
          />
        </div>
      </div>
      <div class="w-full h-0.5px bg-black-15" />
    </div>
    <div id="relative-header-end" />

    <div
      id="fixed-header"
      :data-animation-state="header ? 'show' : 'hide'"
      class="fixed top-0 left-0 w-full z-98"
    >
      <div
        class="flex flex-row items-center w-full px-1em pb-0.25em gap-x-1em justify-between"
        :class="Capacitor.getPlatform() === 'ios' ? 'pt-3.75em' : 'pt-1em'"
      >
        <div class="container-blur" />
        <i-srun-search
          class="w-2.25em h-2.25em min-w-31.30434782608696px min-h-31.30434782608696px"
          @click="searchDialog()"
        />
        <!-- TODO: Replace hardcoded values -->
        <h3>Your alarms</h3>
        <i-srun-plus
          class="w-2.25em h-2.25em min-w-31.30434782608696px min-h-31.30434782608696px"
          @click="emits('interaction', 'alarm', 'new')"
        />
      </div>
      <div class="w-full h-0.5px bg-black-15" />
    </div>
  </header>
</template>
