<script setup lang="ts">
import { ref } from 'vue'

import alarmsJson from '../alarms.json'
import Header from '~/components/Header.vue'
import Footer from '~/components/TabBar.vue'
import SortBar from '~/components/SortBar.vue'
import Alarms from '~/components/Alarms.vue'
import router from '~/router'

// import AlarmSettings from '~/components/AlarmSettings.vue'

const settingsView = ref(false)
const interactableAlarm = ref(-1)

const sortBy = ref({ id: 'rec', title: 'Recent' })
const sortOptions = [
  {
    id: 'rec',
    title: 'Recent',
  },
  {
    id: 'freq',
    title: 'Frequent',
  },
  {
    id: 'act',
    title: 'Active',
  },
  {
    id: 'dis',
    title: 'Disabled',
  },
  {
    id: 'all',
    title: 'All',
  },
]

/* const alarms = [
  {
    id: 0,
    body: {
      title: '145  |  Paldiski-Tallinn',
      transport: 'Bus',
      time: '7:49 AM',
    },
    enabled: true,
    tags: ['freq'],
  },
  {
    id: 1,
    body: {
      title: '512  |  Paldiski-Tallinn',
      transport: 'Morning train',
      time: '7:49 AM',
    },
    enabled: false,
    tags: ['freq'],
  },
  {
    id: 2,
    body: {
      title: '4  |  Tondi-Lennujaam',
      transport: 'Tram',
      time: '7:49 AM',
    },
    enabled: false,
    tags: ['rec'],
  },
  {
    id: 3,
    body: {
      title: 'Keep me awake in car',
      transport: 'Car',
      time: 'Every 10 min',
    },
    enabled: false,
    tags: ['freq', 'rec'],
  },
] */
const alarms = alarmsJson
alarms.sort((a, b) => { return a.id - b.id })
/* const alarms = Object.keys(alarmsJson).sort().reduce(
  (obj, key) => {
    obj[key] = alarms[key]
    return obj
  },
  {},
) */

function sortSetUp(by: string): void {
  for (let i = 0; i < sortOptions.length; i++) {
    if (sortOptions[i].id === by) {
      sortBy.value.id = by
      sortBy.value.title = sortOptions[i].title
      return
    }
  }
  console.log(`${by} is not a valid sort option`)
}

function interactions(interactable: string, interaction: string, ...args: any[]): void {
  if (interactable === 'settings') {
    if (interaction === 'open') {
      const alarmId = args[0]
      if (typeof alarmId !== 'number') return console.log('alarmId is not a number')
      if (!alarms.map(alarm => alarm.id).includes(alarmId)) return console.log('alarmId is not a valid alarm id')
      router.push(`/alarm/${alarmId}`)
      interactableAlarm.value = alarmId
      settingsView.value = true
    }
    else { settingsView.value = false }
  }
}

</script>

<template>
  <Header />

  <main>
    <SortBar class="py-1em" :sort-by="sortBy" :sort-options="sortOptions" @sort-set-up="sortSetUp" />
    <Alarms class="py-1em" :sort-by="sortBy" :alarms="alarms" @interaction="interactions" />
  </main>

  <Footer />
</template>
