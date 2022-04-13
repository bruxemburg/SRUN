<script setup lang="ts">
import transportJson from '../transport.json'
import SortBar from './SortBar.vue'
import CaretIcon from '~icons/srun/caret'
import SearchIcon from '~icons/srun/search'

const emits = defineEmits<{
  (event: 'interaction', ibl: string, ion: string, ...args: any[]): void
}>()

const sortOptions = transportJson
const sortBy = $ref({ id: 'bus', label: 'Bus' })

function sortSetUp(by: string): void {
  for (let i = 0; i < sortOptions.length; i++) {
    if (sortOptions[i].id === by) {
      sortBy.id = by
      sortBy.label = sortOptions[i].label
      return
    }
  }
  console.log(`${by} is not a valid sort option`)
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-1.5em">
      <button class="flex justify-center items-center h-1.75em w-1.75em rounded-full bg-black-5" @click="emits('interaction', 'setting', 'cancel')">
        <CaretIcon class="p-0.05em text-black-60 transform rotate-180" />
      </button>
      <h3>Choose a route</h3>
      <button class="invisible">
        <CaretIcon class="p-0.05em text-black-60 transform rotate-180" />
      </button>
    </div>
    <SortBar class="px-1.75em flex flex-row justify-between pb-1.5em" :sort-by="sortBy" :sort-options="sortOptions" @sort-set-up="sortSetUp" />
    <div class="mb-0.5em">
      <div class="mb-1em py-0.75em px-1.25em bg-black-5 rounded-full rounded-0.875em flex justify-between items-center">
        <p class="text-black-60">
          Search for route...
        </p>
        <SearchIcon class="text-base" />
      </div>
      <div class="bg-black-5 h-11.25em rounded-1.25em">
        <div class="px-1.25em py-0.5em flex flex-row">
          <h4>512</h4>
          <h4 class="ml-1em">
            Paldiski-Tallinn
          </h4>
        </div>
      </div>
    </div>
    <button class="bg-blue-100 text-white rounded-1.375em py-1em">
      <h3>Choose</h3>
    </button>
  </div>
</template>
