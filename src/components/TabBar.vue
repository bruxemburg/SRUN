<script setup lang="ts">
// import AlarmIcon from "~icons/srun/alarm";
// import HomeIcon from "~icons/srun/home";
// import BulbIcon from "~icons/srun/bulb";
// import SearchIcon from "~icons/srun/search";
</script>

<template>
  <footer>
    <div class="fixed bottom-0 left-0 w-full">
      <div class="container-blur" />
      <!-- black thing -->
      <!-- TODO: make this thing moving but dunno why -->
      <div
        class="absolute top-1/2 left-2.265em items-center w-4.5em h-3/5 bg-black-100 rounded-full transform -translate-y-1/2 -z-1"
      />
      <!-- actual tabbar -->
      <div class="flex flex-row items-center justify-evenly w-full py-1.5em">
        <i-srun-alarm class="text-2xl text-white" />
        <i-srun-home class="text-xl text-black-100" />
        <i-srun-bulb class="text-xl text-black-100" />
        <i-srun-search class="text-xl text-black-100" />
      </div>
    </div>
  </footer>
</template>
