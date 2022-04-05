<script setup lang="ts">
import router from '~/router'

interface Props {
  alarm: {
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
  }
}
const {
  alarm = { id: -1 },
} = defineProps<Props>()
if (alarm.id === -1) router.push('/alarms')
</script>
<template>
  Hello from AlarmSettings {{ alarm.id }}!
</template>
