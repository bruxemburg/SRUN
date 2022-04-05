<script setup lang="ts">
import { useRoute } from 'vue-router'
import alarmsJson from '../alarms.json'
import AlarmSettings from '~/components/AlarmSettings.vue'
import router from '~/router'

/* const emits = defineEmits<{
  (event: 'getData', obj: string, ...args: any[]): void
}>() */

let alarm = {
  id: -1,
  enabled: true,
  tags: [''],
  general: {
    transport: '',
    route: 'Choose a route',
    station: 'Choose a station/stop',
    alarmtime: -5,
    label: 'Alarm',
    image: {
      ico: '',
      bg: '',
    },
  },
  options: {
    repeat: [''],
    snooze: true,
    snooze_time: 9,
  },
  sound: {
    enabled: true,
    file: 'sounds/Radar.wav',
    volume: 100,
  },
  expiration: 0,
}

const $route = useRoute()
const alarmId = parseInt($route.params.id.toString())
const idIsNotANumber = isNaN(alarmId)
if (idIsNotANumber) { router.push('/alarms') }
else {
  if (alarmId !== -1) { alarm = alarmsJson.filter((obj) => { return obj.id === alarmId })[0] }
  else {
    let i = 0
    while (alarmsJson.map(alarm => alarm.id).includes(i)) i++
    alarm.id = i
  }
}

</script>

<template>
  <AlarmSettings v-if="!idIsNotANumber" :alarm="alarm" />
</template>
