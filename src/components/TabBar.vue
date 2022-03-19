<script setup lang="ts">
import AlarmIcon from '~icons/srun/alarm'
</script>

<template>
  <footer>
    <div
      class="flex flex-row items-center w-full pt-0.5em pb-1em gap-1em
      backdrop-filter bg-white dark:bg-black-100 px-2.625em
      bg-opacity-90  backdrop-blur-30 backdrop-brightness-130"
    >
      <div class="bg-black-100 py-0.5em px-0.75em rounded-full">
        <!--<AlarmIcon class="w-3.5em h-3.5em fill-white dark:fill-black-100" />-->
        <div class="w-2.625em h-2.625em grid place-items-center">
          <div class="bg-white rounded-full w-2.265em h-2.265em" />
        </div>
      </div>

      <div class="bg-transparent py-0.5em px-0.75em rounded-full">
        <div class="bg-black-5 rounded-full w-1.75em h-1.75em" />
      </div>

      <div class="bg-transparent py-0.5em px-0.75em rounded-full">
        <div class="bg-black-5 rounded-full w-1.75em h-1.75em" />
      </div>

      <div class="bg-transparent py-0.5em px-0.75em rounded-full">
        <div class="bg-black-5 rounded-full w-1.75em h-1.75em" />
      </div>
    </div>
  </footer>
</template>
