<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/TabBar.vue'
import SortBar from '~/components/SortBar.vue'
import Alarms from '~/components/Alarms.vue'

</script>

<template>
  <Header />

  <main>
    <SortBar class="py-1em" />
    <Alarms class="py-1em" />
  </main>

  <Footer />
</template>
