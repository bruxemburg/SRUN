<script setup lang="ts">

interface Props {
  newAlarm: boolean
}
const {
  newAlarm = false,
} = defineProps<Props>()

// const canc = $ref('Cancel')
let title = $ref('Edit alarm')
let save = $ref('Save')

if (newAlarm) {
  title = 'Add alarm'
  save = 'Create'
}

</script>

<template>
  <header>
    <div id="relative-header" class="relative">
      <div class="flex flex-row items-center w-full mt-3em p-0.5em justify-between">
        <div class="container-blur" />
        <button class="text-blue-100 text-sm">
          <p class="font-100">
            Cancel
          </p>
        </button>
        <h1 class="text-lg font-400">
          {{ title }}
        </h1>
        <button class=" text-blue-100 text-sm">
          <p class="font-100">
            {{ save }}
          </p>
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
      <div class="flex flex-row items-center w-full p-1em pb-0.25em gap-x-4em justify-between mt-1em">
        <div class="container-blur" />
        <button class="text-blue-100 text-sm">
          <p class="font-100">
            Cancel
          </p>
        </button>
        <h1 class="text-lg font-400">
          {{ title }}
        </h1>
        <button class="text-blue-100 text-sm">
          <p class="font-100">
            {{ save }}
          </p>
        </button>
      </div>
      <div class="w-full h-0.5px bg-black-15" />
    </div>
  </header>
</template>
