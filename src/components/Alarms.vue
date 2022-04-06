<script setup lang="ts">
import { ref } from 'vue'
import type { PluginResultError } from '@capacitor/core'
import Alarm from '~/composables/alarm-plugin'

import TrashIcon from '~icons/srun/trashbin'
import CaretIcon from '~icons/srun/caret'

// const emits = defineEmits(['interaction'])

const emits = defineEmits<{
  (event: 'interaction', interactable: string, interaction: string, ...args: any[]): void
}>()

interface Props {
  sortBy: {
    id: string
    title: string
  }
  alarms: {
    id: number
    enabled: boolean
    tags: string[]
    general: {
      transport: string
      route: string
      station: string
      alarmtime: number
      label: string
      image: {
        ico: string
        bg: string
      }
    }
    options: {
      repeat: string[]
      snooze: boolean
      snooze_time: number
    }
    sound: {
      enabled: boolean
      file: string
      volume: number
    }
    expiration: number
  }[]
}
const {
  sortBy = [{ id: 'all', title: 'All' }],
  alarms = [],
} = defineProps<Props>()

const editingMode = ref(false)

const assetsPath = '../../public/assets/'

function checkSortOption(alarm: any, by: string): boolean {
  if (by === 'all') return true
  else if (by === 'act' || by === 'dis')
    return alarm.enabled === (by === 'act')
  else
    return alarm.tags.includes(by)
}

// set alarm quick solution
const setAlarm = async() => {
  const now = new Date()
  const date = new Date(now.setMinutes(now.getMinutes() + 2))

  await Alarm
    .set({ date: date.getTime(), name: 'My alarm' })
    .then((returned) => {
      console.log(returned.status)
    })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

</script>

<template>
  <div>
    <div class="flex flex-row pb-0.25em">
      <p class="mr-auto ml-0">
        {{ sortBy.title }}
      </p>
      <button class="ml-auto mr-0" @click="editingMode = !editingMode">
        <p v-if="editingMode">
          Cancel
        </p>
        <p v-else>
          Edit
        </p>
      </button>
    </div>
    <div>
      <div v-for="alarm in alarms" :key="alarm.id">
        <div v-if="checkSortOption(alarm, sortBy.id)" class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
          <div v-if="!editingMode" class="rounded-full-22px px-1.5625em py-1.1875em" :class="alarm.general.image.bg">
            <!--<img :src="assetsPath+'emojis/'+alarm.general.image.ico+'.png'">-->
            <img :src="`./assets/emojis/${alarm.general.image.ico}.png`" alt="">
          </div>
          <div v-else class="rounded-full-22px px-1.25em py-0.875em bg-red-25">
            <TrashIcon class="text-red-100 w-2.625em h-2.625em" />
          </div>
          <div class="flex flex-col justify-center ml-4">
            <h3 class="font-500">
              {{ alarm.general.route }}
            </h3>
            <small class="font-400">
              {{ alarm.general.label }}  •  {{ alarm.general.alarmtime }}
            </small>
          </div>
          <div v-if="!editingMode" class="toggle flex w-2.3125em h-1.375em ml-auto rounded-full relative">
            <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2" :checked="alarm.enabled" @click="setAlarm">
            <div class="knobs" />
            <div class="layer" />
          </div>
          <CaretIcon v-else class="flex ml-auto w-1.75em h-1.75em" @click="emits('interaction', 'settings', 'open', alarm.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .knobs{
    @apply rounded-full h-full w-1.125em relative;
  }

  .knobs::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 2px;
    background-color: white;
    z-index: 1;
    transition: 0.8s ease all, left .3s cubic-bezier(0.2, 1.35, 0.2, 1.35);
    height: calc( 100% - 2px * 2 );
    @apply rounded-full w-full;
  }

  .checkbox:active ~ .knobs::before {
    transform: scaleX(0.5);
    /*transform: scaleX(0.2);*/
  }

  .checkbox:checked ~ .knobs::before {
    /*right: 2px;*/
    left: calc(100% - 2px);
  }

  .layer{
    @apply absolute w-full h-full rounded-full;
  }

  .layer::before{
    content: '';
    position: absolute;
    z-index: 0;
    @apply absolute w-full h-full rounded-full;
    @apply bg-black-25;
    transition: all ease 0.3s;
  }

  .checkbox:checked ~ .layer::before{
    @apply bg-green-100;
  }

</style>
