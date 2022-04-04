<script setup lang="ts">
import { ref } from 'vue'

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

const editingMode = ref(true)

const emojiList = ['sleeping-face.png', 'relieved-face.png', 'sleepy-face.png', 'yawning-face.png']
function getRandomEmoji() {
  return `../../public/assets/emojis/${emojiList[Math.floor(Math.random() * emojiList.length)]}`
}

const colorList = ['bg-blue-25', 'bg-red-25', 'bg-green-25', 'bg-yellow-25']
function getRandomColor() {
  return colorList[Math.floor(Math.random() * colorList.length)]
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
          Edit
        </p>
        <p v-else>
          Cancel
        </p>
      </button>
    </div>
    <div>
      <div v-for="alarm in alarms" :key="alarm.time" class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div class="rounded-full-22px px-1.5625em py-1.1875em" :class="getRandomColor()">
          <img :src="getRandomEmoji()">
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            {{ alarm.title }}
          </h3>
          <small class="font-400">
            {{ alarm.transport }}  •  {{ alarm.time }}
          </small>
        </div>
        <div class="toggle flex w-2.3125em h-1.375em ml-auto bg-green-100 rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2" :checked="alarm.enabled">
          <div class="knobs" />
          <div class="layer" />
        </div>
      </div>
      <!--<div class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div class="rounded-full-22px bg-blue-25 px-1.5625em py-1.1875em">
          <img src="../../public/assets/emojis/sleeping-face.png">
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            145  |  Paldiski-Tallinn
          </h3>
          <small class="font-400">
            Bus  •  7:49 AM
          </small>
        </div>
        <div class="toggle flex w-2.3125em h-1.375em ml-auto bg-green-100 rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2" checked>
          <div class="knobs" />
          <div class="layer" />
        </div>
      </div>
      <div class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div class="rounded-full-22px bg-red-25 px-1.5625em py-1.1875em">
          <img src="../../public/assets/emojis/relieved-face.png">
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            512  |  Paldiski-Tallinn
          </h3>
          <small class="font-400">
            Morning train  •  7:49 AM
          </small>
        </div>
        <div class="toggle flex w-2.3125em h-1.375em ml-auto bg-green-100 rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2">
          <div class="knobs" />
          <div class="layer" />
        </div>
      </div>
      <div class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div class="rounded-full-22px bg-green-25 px-1.5625em py-1.1875em">
          <img src="../../public/assets/emojis/sleepy-face.png">
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            4  |  Tondi-Lennujaam
          </h3>
          <small class="font-400">
            Tram  •  7:49 AM
          </small>
        </div>
        <div class="toggle flex w-2.3125em h-1.375em ml-auto bg-green-100 rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2">
          <div class="knobs" />
          <div class="layer" />
        </div>
      </div>
      <div class="py-4 border-t border-t-black-5 flex flex-row w-full items-center">
        <div class="rounded-full-22px bg-yellow-25 px-1.5625em py-1.1875em">
          <img src="../../public/assets/emojis/yawning-face.png">
        </div>
        <div class="flex flex-col justify-center ml-4">
          <h3 class="font-500">
            Keep me awake in car
          </h3>
          <small class="font-400">
            Car  •  Every 10 min
          </small>
        </div>
        <div class="toggle flex w-2.3125em h-1.375em ml-auto rounded-full relative">
          <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2">
          <div class="knobs" />
          <div class="layer" />
        </div>
      </div>-->
    </div>
  </div>
</template>
