<script setup lang="ts">
import Header from '~/components/Header.vue'
import Footer from '~/components/TabBar.vue'
import SortBar from '~/components/SortBar.vue'
import Allarms from '~/components/Allarms.vue'

</script>

<template>
  <Header />

  <main>
    <SortBar class="py-1em" />
    <Allarms class="py-1em" />
  </main>

  <Footer />
</template>
