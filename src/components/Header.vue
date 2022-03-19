<script setup lang="ts">
import SearchIcon from '~icons/srun/search'
import PlusIcon from '~icons/srun/plus'
</script>

<template>
  <header>
    <div
      class="flex flex-row items-center w-full mt-1em p-1em
    bg-white dark:bg-black-100 bg-opacity-90 backdrop-filter
    backdrop-blur-30 backdrop-brightness-130"
    >
      <h1 class="ml-0 mr-auto">
        <span class="font-medium">Your</span>
        alarms
      </h1>
      <div class="flex flex-row gap-1em mr-0 ml-auto">
        <SearchIcon class="w-2.25em h-2.25em mt-0.5em min-w-31.30434782608696px min-h-31.30434782608696px" />
        <PlusIcon class="w-2.25em h-2.25em mt-0.5em min-w-31.30434782608696px min-h-31.30434782608696px" />
      </div>
    </div>
    <div class="w-full h-0.5px bg-black-15" />
  </header>
</template>
