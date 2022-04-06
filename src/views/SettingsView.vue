<script setup lang="ts">
import { ref } from 'vue'
// import { Power2, gsap } from 'gsap'
import AlarmIcon from '~icons/srun/alarm'
import HomeIcon from '~icons/srun/home'
import BulbIcon from '~icons/srun/bulb'
import SearchIcon from '~icons/srun/search'
import CaretIcon from '~icons/srun/caret'
const searchDialog = () => {
  // console.log('searhc')
}
const isInViewport = (element: string) => {
  // const e = element.getBoundingClientRect()
  const e = document.querySelector(`#${element}`)?.getBoundingClientRect()
  if (e == null)
    return false
  if (e.top >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  /* && e.left >= 0 && e.right <= (window.innerWidth || document.documentElement.clientWidth) */)
    return false
  return true
}
const header = ref(false)
window.addEventListener('scroll', () => {
  header.value = isInViewport('relative-header-end')
  const fixedHeader: HTMLElement | null = document.querySelector('#fixed-header')
  if (fixedHeader == null)
    return
  const state = fixedHeader.getAttribute('data-animation-state')
  /* const tl = gsap.timeline({ paused: true })
  tl.to(fixedHeader, {
    opacity: 1,
    duration: 0.3,
    ease: Power2.easeInOut,
  }) */
  if (state === 'show') {
    // show anima
    fixedHeader.style.opacity = '1'
  }
  else if (state === 'hide') {
    // hide anima
    fixedHeader.style.opacity = '0'
  }
})
</script>

<template>
  <header>
    <div id="relative-header" class="relative">
      <div class="flex flex-row items-center w-full mt-2.5em p-0.5em gap-x-6em">
        <div class="container-blur" />
        <button class="ml-auto mr-auto text-blue-100 text-sm">
          <p class="font-100">Cancel</p>
        </button>
         <h1 class="ml-auto mr-auto text-lg font-400">
          Edit alarm
        </h1>
        <button class="ml-auto mr-auto text-blue-100 text-sm">
          <p class="font-100">Save</p>
        </button>
       </div>             
      <div class="w-full h-0.5px bg-black-15" />
    </div>
    <div id="relative-header-end" />

    <div
      id="fixed-header"
      :data-animation-state="header ? 'show' : 'hide'"
      class="fixed top-0 left-0 w-full"
    >
      <div class="flex flex-row items-center w-full p-1em pb-0.25em gap-x-4em justify-between">
        <div class="container-blur" />
        <button class="ml-auto mr-auto text-blue-100 text-sm">
          <p class="font-100">Cancel</p>
        </button>
         <h1 class="ml-auto mr-auto text-lg font-400">
          Edit alarm
        </h1>
        <button class="ml-auto mr-auto text-blue-100 text-sm">
          <p class="font-100">Save</p>
        </button>
      </div>

      <div class="w-full h-0.5px bg-black-15" />
    </div>
  </header>
  <header>
    <div class="items-center w-full p-1em">
        <h1 class="mt-2em ml-auto mr-auto text-base text-black-60 font-100">
          General
        </h1>
        <div class="mb-1em w-full h-0.5px bg-black-15" />
        
        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Route </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> 145 | Paldiski-Tallinn </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>
        
        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Stop </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> Vabaduse Valjak </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Wake up before </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> 5 minutes </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Label </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> Bus </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>

        <h1 class="mt-2em ml-auto mr-auto text-base text-black-60 font-100">
          Options
        </h1>
        <div class="mb-1em w-full h-0.5px bg-black-15" />

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Repeat </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> Weekdays </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Snooze </p>

            </div>
        </div>

        <h1 class="mt-2em ml-auto mr-auto text-base text-black-60 font-100">
          Sound
        </h1>
        <div class="mb-1em w-full h-0.5px bg-black-15" />

        
        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Play sound </p>
            
            </div>
        </div>

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Sound </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> Radar </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>

        <div class="mt-0.5em py-0.625em px-1.25em rounded-large bg-black-5">
            <div class="flex flex-row text-base"><p class="mr-auto ml-0 font-300"> Volume </p>
            <button class="ml-auto mr-0 text-black-60"><p class="font-100 text-xs"> 8 </p></button><CaretIcon class="flex ml-0.5em w-1.25em h-1.25em text-black-60" /></div>
        </div>
        <div class="mt-5em"></div>
    </div>
  </header>
      <footer>
    <div class="fixed bottom-0 left-0 w-full">
      <div class="container-blur" />
      <!-- black thing -->
      <!-- TODO: make this thing moving but dunno why -->
      <div
        class="absolute top-1/2 left-2.265em items-center
      w-4.5em h-3/5 bg-black-100 rounded-full
      transform -translate-y-1/2 -z-1"
      />
      <!-- actual tabbar -->
      <div class="flex flex-row items-center justify-evenly w-full py-1.5em">
        <AlarmIcon class="text-2xl text-white" />
        <HomeIcon class="text-xl text-black-100" />
        <BulbIcon class="text-xl text-black-100" />
        <SearchIcon class="text-xl text-black-100" />
      </div>
    </div>
  </footer>
</template>
