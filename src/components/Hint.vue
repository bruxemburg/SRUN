<script setup lang="ts">

// import { Capacitor } from '@capacitor/core'
// import { ref } from 'vue'

// import Caret from '~icons/srun/caret'

</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <!-- Background -->
    <div class="bg-black-100 w-full h-full backdrop-filter backdrop-blur-4 bg-opacity-25 pointer-events-none" />
    <div
      class="absolute bottom-0 left-0 w-full p-1.5em pb-3.75em bg-white rounded-t-2em
      flex flex-col"
    >
      <div class="flex flex-row justify-center items-center p-1em pt-0">
        <!--<div class="flex items-center justify-center bg-black-5 p-0.5em rounded-full">
          <Caret class="transform rotate-180 text-base" />
        </div>-->
        <h4 class="font-semibold">
          Keep using SRUN in
        </h4>
      </div>
      <div class="w-full h-1px bg-black-15" />
      <div class="flex flex-col gap-y-1em p-1em">
        <div class="flex flex-row justify-between items-center">
          <h3>SRUN app</h3>
          <div class="bg-blue-100 flex items-center justify-center rounded-full w-1/3 py-1em text-white">
            <p>Open</p>
          </div>
        </div>
        <div class="flex flex-row justify-between items-center">
          <h3>Your browser</h3>
          <div class="bg-black-5 flex items-center justify-center rounded-full w-1/3 py-1em">
            <p>Continue</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
