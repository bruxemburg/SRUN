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

const alarms = alarmsJson
alarms.sort((a, b) => { return a.id - b.id })

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
