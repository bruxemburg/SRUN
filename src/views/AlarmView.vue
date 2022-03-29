<script setup lang="ts">
// import { ref } from 'vue'
import type { PluginResultError } from '@capacitor/core'
import Echo from '~/composables/echo-plugin'
import Header from '~/components/Header.vue'
import Footer from '~/components/TabBar.vue'
// import SortBar from '~/components/SortBar.vue'
// import Allarms from '~/components/Allarms.vue'

// const val = ref('not changes')

// const { value } = await Echo.echo({ value: 'Changes!' })
//   .catch((error: PluginResultError) => {
//     console.error(error.message)
//     return { value: 'err' }
//   })
// console.error(value)
// val.value = value

const showToast = async(value: string) => {
  await Echo.print({ text: value })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
}

</script>

<template>
  <Header />

  <main>
    <h1 @click="showToast('hello')">
      Click here!
    </h1>
    <div class="w-full h-screen bg-red-100" />
  </main>

  <Footer />
</template>
