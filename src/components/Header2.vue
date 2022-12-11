<script setup lang="ts">
export interface Props {
  newAlarm: boolean;
}
const { newAlarm = false } = defineProps<Props>();

const emits = defineEmits<{
  (event: "interaction", ibl: string, ion: string, ...args: any[]): void;
}>();

// const canc = $ref('Cancel')
let title = $ref("Edit alarm");
let save = $ref("Save");

if (newAlarm) {
  title = "Add alarm";
  save = "Create";
}

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

let header = $ref(false);

window.addEventListener("scroll", () => {
  header = isInViewport("relative-header-end");

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
  <header>
    <div id="relative-header" class="relative">
      <div class="flex flex-row items-center w-full mt-2em p-1em pb-0.5em justify-between">
        <div class="container-blur" />
        <button class="text-blue-100 text-sm" @click="emits('interaction', 'alarm', 'cancel')">
          <p class="font-100">Cancel</p>
        </button>
        <h1 class="text-lg font-400">
          {{ title }}
        </h1>
        <button class="text-blue-100 text-sm" @click="emits('interaction', 'alarm', 'save')">
          <p class="font-100">
            {{ save }}
          </p>
        </button>
      </div>
      <div class="w-full h-0.5px bg-black-15" />
    </div>
    <div id="relative-header-end" />
    <div id="fixed-header" :data-animation-state="header ? 'show' : 'hide'" class="fixed top-0 left-0 w-full">
      <div class="flex flex-row items-center w-full p-1em pb-0.25em gap-x-4em justify-between mt-1em">
        <div class="container-blur" />
        <button class="text-blue-100 text-sm" @click="emits('interaction', 'alarm', 'cancel')">
          <p class="font-100">Cancel</p>
        </button>
        <h1 class="text-lg font-400">
          {{ title }}
        </h1>
        <button class="text-blue-100 text-sm" @click="emits('interaction', 'alarm', 'save')">
          <p class="font-100">
            {{ save }}
          </p>
        </button>
      </div>
      <div class="w-full h-0.5px bg-black-15" />
    </div>
  </header>
</template>
