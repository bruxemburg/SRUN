<script setup lang="ts">
import { ref } from 'vue'

// const emits = defineEmits(['proverka'])

const options = ref([
  {
    id: 'rec',
    title: 'Recent',
    enabled: true,
  },
  {
    id: 'freq',
    title: 'Frequent',
    enabled: false,
  },
  {
    id: 'act',
    title: 'Active',
    enabled: false,
  },
  {
    id: 'dis',
    title: 'Disabled',
    enabled: false,
  },
  {
    id: 'all',
    title: 'All',
    enabled: false,
  },
])

function sortBy(key: string) {
  options.value.forEach((element) => {
    element.enabled = element.id === key
  })
  /* console.log('here1')
  emits.proverka */
}

</script>

<template>
  <div class="flex flex-row inline-block overflow-x-scroll gap-x-0.5em">
    <div v-for="option in options" :key="option.title">
      <div v-if="option.enabled" class="py-0.625em px-1.25em rounded-full bg-black-100 text-white" @click="sortBy(option.id)">
        <p class="font-300">
          {{ option.title }}
        </p>
      </div>
      <div v-else class="py-0.625em px-1.25em rounded-full bg-black-5 text-black-100e" @click="sortBy(option.id)">
        <p class="font-300">
          {{ option.title }}
        </p>
      </div>
    </div>
    <!--<div class="py-0.625em px-1.25em bg-black-100 rounded-full text-white">
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
    </div>-->
  </div>
</template>
