<script setup lang="ts">
import { useRoute } from 'vue-router'
import alarmsJson from '../alarms.json'
import Header2 from '../components/Header2.vue'
import AlarmSettings from '~/components/AlarmSettings.vue'
import AlarmSetting from '~/components/AlarmSetting.vue'
import router from '~/router'
import TabBar from '~/components/TabBar.vue'
import type { Settings } from '~/composables/alarmModel.ts'
import { Alarm } from '~/composables/alarmModel.ts'

/* const emits = defineEmits<{
  (event: 'getData', obj: string, ...args: any[]): void
}>() */
let alarm = $ref(new Alarm())
// const alarm = $ref<InstanceType<typeof Alarm> | null>(null)

let newAlarm = false

const $route = useRoute()
const alarmId = parseInt($route.params.id.toString())
const idIsNotANumber = isNaN(alarmId)
if (idIsNotANumber) { router.push('/alarms') }
else {
  if (alarmId === -1) newAlarm = true
  // console.log(alarm.value)
  alarm = new Alarm(alarmId)
  // console.log(alarm.settings as Settings)
  /* if (alarmId !== -1) { alarm.value = alarmsJson.filter((obj) => { return obj.id === alarmId })[0] }
  else {
    newAlarm = true
    let i = 0
    while (alarmsJson.map(alarm => alarm.value.id).includes(i)) i++
    alarm.value.id = i
  } */
  // console.log(alarm.value.enabled)
}

let showSetting = $ref(false)

function changeSettings(ibl: string, ion: string, ...args: any[]) {
  if (ibl === 'setting') {
    if (ion === 'cancel') showSetting = false
  }
  else if (ibl === 'snooze') {
    if (ion === 'toggle') alarm.settings.options.snooze = !alarm.settings.options.snooze
  }
  else if (ibl === 'sound') {
    if (ion === 'toggle') alarm.settings.sound.enabled = !alarm.settings.sound.enabled
  }
  else if (ibl === 'motion') {
    if (ion === 'toggle') alarm.settings.motion.enabled = !alarm.settings.motion.enabled
  }
  else if (ibl === 'route') {
    showSetting = true
  }
}

</script>

<template>
  <Header2 :new-alarm="newAlarm" />
  <main>
    <AlarmSettings v-if="!idIsNotANumber" class="py-0.5em mb-10em" :settings="(alarm.settings as Settings)" @interaction="changeSettings" />
  </main>
  <TabBar />
  <div v-if="showSetting" class="fixed z-99 top-0 left-0 w-full h-full">
    <div class="absolute z-1 w-full h-full bg-black-100 backdrop-filter backdrop-blur-4 bg-opacity-25" @click="showSetting=false" />
    <AlarmSetting class="absolute z-2 bottom-0 left-0 w-full px-1em pb-1.75em pt-1.5em bg-white rounded-t-2em flex flex-col" @interaction="changeSettings" />
  </div>
</template>
