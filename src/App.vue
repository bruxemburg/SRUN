<script setup lang="ts">
import { RouterView } from 'vue-router'
// import SampleView from './views/SampleView.vue'
// import HelloWorld from '~/components/HelloWorld.vue'
// import { toggleDark } from '~/composables/'
import { Capacitor } from '@capacitor/core'
import { ref } from 'vue'

// import AlarmView from './views/AlarmView.vue'
import HintComponent from './components/Hint.vue'

// Hint component logic
const triggered = ref(Capacitor.getPlatform() !== 'web')
const body = document.querySelector<HTMLBodyElement>('body')!

if (triggered.value)
  body.classList.replace('overflow-hidden', 'overflow-auto')

const overflow = () => {
  triggered.value = true

  if (body.classList.contains('overflow-hidden') && triggered.value)
    body.classList.replace('overflow-hidden', 'overflow-auto')
}

</script>

<template>
  <!--<SampleView />-->

  <RouterView/>

  <HintComponent
    v-if="triggered === false"
    :class="Capacitor.getPlatform() === 'web' ? 'block' : 'hidden'"
    @click="overflow"
    class="z-99"
  />

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
