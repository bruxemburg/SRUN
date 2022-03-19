<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SampleView from './views/SampleView.vue'
import AlarmView from './views/AlarmView.vue'
import HelloWorld from '~/components/HelloWorld.vue'
import { toggleDark } from '~/composables/'

</script>

<template>
  <!--<SampleView />-->

  <AlarmView />

  <!--<header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
      </nav>
    </div>

    <div @click="toggleDark()">
      toggle
    </div>
  </header>

  <RouterView />-->
</template>
