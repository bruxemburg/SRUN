<script setup lang="ts">
import { ref } from 'vue'
import type { PluginResultError } from '@capacitor/core'
import Echo from '~/composables/echo-plugin'
import Alarm from '~/composables/alarm-plugin'
import Header from '~/components/Header.vue'
import Footer from '~/components/TabBar.vue'
// import SortBar from '~/components/SortBar.vue'
// import Allarms from '~/components/Allarms.vue'

const val = ref(false)
const val2 = ref(false)

// const { value } = await Echo.echo({ value: 'Changes!' })
//   .catch((error: PluginResultError) => {
//     console.error(error.message)
//     return { value: 'err' }
//   })
// console.error(value)
// val.value = value

// just checking things out
const showToast = async(value: string) => {
  await Echo.print({ text: value })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

const ringAlarm = async() => {
  await Echo
    .ring()
    .then(() => {
      showToast('Ring!')
    })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

const notifyNotification = async(title: string, content: string) => {
  await Echo
    .notify({ title, content })
    .then((returnedValue) => {
      val2.value = returnedValue.status
    })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

const setAlarm = async() => {
  await Alarm
    .set({ date: new Date('Apr 05, 2022 17:31:00').getTime(), name: 'My alarm' })
    .then((returned) => {
      val.value = returned.status
    })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

</script>

<template>
  <Header />

  <main class="flex flex-col p-1em gap-y-1em">
    <div class="rounded-1.5em text-center bg-green-25 p-1em" @click="showToast('hello')">
      <p>Click here! </p>
    </div>

    <div class="rounded-1.5em text-center bg-blue-25 p-1em" @click="ringAlarm()">
      <p>Ring ring!</p>
    </div>

    <div class="rounded-1.5em text-center bg-yellow-25 p-1em" @click="notifyNotification('SRUN Wakeup!', 'Alarming bruh...')">
      <p>Notify!</p>
      <p>{{ val }}</p>
    </div>

    <div class="rounded-1.5em text-center bg-yellow-25 p-1em" @click="setAlarm()">
      <p>Alarm!</p>
      <p>{{ val2 }}</p>
    </div>

    <div class="w-full h-screen bg-red-25 rounded-2.265em" />
  </main>

  <Footer />
</template>
