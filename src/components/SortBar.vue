<script setup lang="ts">
// import { ref } from 'vue'
import type { Tag } from '~/composables/alarmModel.ts'

const emits = defineEmits<{
  (e: 'sort-set-up', by: string): void
}>()

interface Props {
  sortBy: Tag
  sortOptions: Tag[]
}
const {
  sortBy,
  sortOptions,
} = defineProps<Props>()

</script>

<template>
  <div class="flex flex-row inline-block overflow-x-scroll gap-x-0.5em">
    <div v-for="option in sortOptions" :key="option.id">
      <div v-if="option.id == sortBy.id" class="py-0.625em px-1.25em rounded-full bg-black-100 text-white" @click="emits('sort-set-up', option.id)">
        <p class="font-300">
          {{ option.label }}
        </p>
      </div>
      <div v-else class="py-0.625em px-1.25em rounded-full bg-black-5 text-black-100e" @click="emits('sort-set-up', option.id)">
        <p class="font-300">
          {{ option.label }}
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
