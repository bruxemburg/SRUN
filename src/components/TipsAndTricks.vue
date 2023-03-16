<!-- <script setup lang="ts">
import AlarmIcon from '~icons/srun/alarm'
</script> -->

<template>
  <div>
    <div class="flex flex-row pb-0.25em justify-between">
      <h4 class="text-black-60">Tips & Tricks</h4>
      <p class="font-light text-blue-100">See more</p>
    </div>
    <div
      class="flex flex-row inline-block overflow-x-scroll py-4 border-t border-t-black-5 gap-1em"
    >
      <div>
        <div
          class="stcim1 stcim h-13.875em w-16.875em bg-black-5 flex justify-center items-center rounded-1.375em overflow-hidden bg-center"
        >
          <!-- <AlarmIcon class="text-2xl text-white" /> -->
          <!-- <img src="/assets/stockImages/grl.png" class="pr"> -->
        </div>
        <div class="pt-0.5em">
          <h4>Improve your sleeping habits in these three steps</h4>
        </div>
        <div class="pt-0.5em">
          <small> Posted 3 days ago • 5 minute read </small>
        </div>
      </div>
      <div>
        <div
          class="stcim2 stcim h-13.875em w-16.875em bg-black-5 flex justify-center items-center rounded-1.375em overflow-hidden bg-center"
        >
          <!-- <AlarmIcon class="text-2xl text-white" /> -->
          <!-- <img src="/assets/stockImages/grl.png" class="pr"> -->
        </div>
        <div class="pt-0.5em">
          <h4>How SRUN developers keep awake during long daily rides?</h4>
        </div>
        <div class="pt-0.5em">
          <small> Posted month ago • 10 minute read </small>
        </div>
      </div>
      <div>
        <div
          class="stcim3 stcim h-13.875em w-16.875em bg-black-5 flex justify-center items-center rounded-1.375em overflow-hidden bg-center"
        >
          <!-- <AlarmIcon class="text-2xl text-white" /> -->
          <!-- <img src="/assets/stockImages/grl.png" class="pr"> -->
        </div>
        <div class="pt-0.5em">
          <h4>Why your cat is always sleeping?</h4>
        </div>
        <div class="pt-0.5em">
          <small> Posted 2 months ago • 7 minute read </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.stcim {
  background-size: auto 100%;
}
.stcim1 {
  background-image: url("/assets/stockImages/grl.png");
}
.stcim2 {
  background-image: url("/assets/stockImages/guy.png");
}
.stcim3 {
  background-image: url("/assets/stockImages/cat.png");
}
</style>
