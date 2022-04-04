<script setup lang="ts">
import { ref } from 'vue'

import TrashIcon from '~icons/srun/trashbin'
import CaretIcon from '~icons/srun/caret'

const alarms = ref([
  {
    title: '145  |  Paldiski-Tallinn',
    transport: 'Bus',
    time: '7:49 AM',
    enabled: true,
  },
  {
    title: '512  |  Paldiski-Tallinn',
    transport: 'Morning train',
    time: '7:49 AM',
    enabled: false,
  },
  {
    title: '4  |  Tondi-Lennujaam',
    transport: 'Tram',
    time: '7:49 AM',
    enabled: false,
  },
  {
    title: 'Keep me awake in car',
    transport: 'Car',
    time: 'Every 10 min',
    enabled: false,
  },
])

const editingMode = ref(false)

const assetsPath = '../../public/assets/'

const emojiList = ['sleeping-face.png', 'relieved-face.png', 'sleepy-face.png', 'yawning-face.png']
function getRandomEmoji() {
  return `${assetsPath}emojis/${emojiList[Math.floor(Math.random() * emojiList.length)]}`
}

const colorList = ['bg-blue-25', 'bg-red-25', 'bg-green-25', 'bg-yellow-25']
function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)]
}

alarms.value.forEach((element) => {
  element.cartBg = getRandomColor()
  element.cartIco = getRandomEmoji()
})

function openSettings() {
  console.log('openSettings')
  // router.push('/settings')
}

</script>

<template>
  <div>
    <div class="flex flex-row pb-0.25em">
      <p class="mr-auto ml-0">
        Recent
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
      <div v-for="alarm in alarms" :key="alarm.time" class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div v-if="!editingMode" class="rounded-full-22px px-1.5625em py-1.1875em" :class="alarm.cartBg">
          <img :src="alarm.cartIco">
        </div>
        <div v-else class="rounded-full-22px px-1.25em py-0.875em bg-red-25">
          <TrashIcon class="text-red-100 w-2.625em h-2.625em" />
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            {{ alarm.title }}
          </h3>
          <small class="font-400">
            {{ alarm.transport }}  •  {{ alarm.time }}
          </small>
        </div>
        <div v-if="!editingMode" class="toggle flex w-2.3125em h-1.375em ml-auto rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2" :checked="alarm.enabled">
          <div class="knobs" />
          <div class="layer" />
        </div>
        <CaretIcon v-else class="flex ml-auto w-1.75em h-1.75em" @click="openSettings()" />
      </div>
    </div>
  </div>
</template>

<style>
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
