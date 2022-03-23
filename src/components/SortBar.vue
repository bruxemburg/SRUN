<script setup lang="ts">
// import { ref } from 'vue'

/* data() {
  return {
    sortingOptions: {
      Recent: {
        active: true,
        bg: 'black-100',
        text: 'text-white'
      }
      Style: {
        active: {
          bg: 'black-100',
          text: 'text-white'
        }
        disabled: {

        }
      }
    }
  }
} */

</script>

<template>
  <div class="flex flex-row inline-block overflow-x-scroll gap-x-0.5em">
    <div class="py-0.625em px-1.25em bg-black-100 rounded-full text-white">
      <p class="font-300">
        Recent
      </p>
    </div>
    <div class="py-0.625em px-1.25em bg-black-5 rounded-full text-black-100">
      <p class="font-300">
        Frequent
      </p>
    </div>
    <div class="py-0.625em px-1.25em bg-black-5 rounded-full text-black-100">
      <p class="font-300">
        Active
      </p>
    </div>
    <div class="py-0.625em px-1.25em bg-black-5 rounded-full text-black-100">
      <p class="font-300">
        Disabled
      </p>
    </div>
    <div class="py-0.625em px-1.25em bg-black-5 rounded-full text-black-100">
      <p class="font-300">
        All
      </p>
    </div>
  </div>
</template>
