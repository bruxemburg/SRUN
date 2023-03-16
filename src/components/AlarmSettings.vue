<script setup lang="ts">
// import ToggleButton from "./ToggleButton.vue";
// import router from '~/router'
// import CaretIcon from "~icons/srun/caret";
import type { Settings } from "~/composables/alarmModel";

export interface Props {
  settings: Settings;
  newAlarm: boolean;
}
const { settings, newAlarm } = defineProps<Props>();

const emits = defineEmits<{
  (event: "interaction", ibl: string, ion: string, ...args: any[]): void;
}>();

// id: -1
// if (alarm.id === -1) router.push('/alarms')
</script>

<template>
  <div class="items-center w-full py-1em">
    <div class="mt-2em">
      <h1 class="ml-auto mr-auto text-base text-black-60 font-100">General</h1>
      <div class="mb-1em mt-0.25em w-full h-0.5px bg-black-15" />
      <div
        class="option"
        @click="emits('interaction', 'setting', 'open', 'route')"
      >
        <p class="mr-auto ml-0 text-base font-medium">Route</p>
        <div class="ml-auto mr-0 text-black-60 flex items-center">
          <p v-if="settings.general.route.id !== -1" class="font-100 text-sm">
            {{ settings.general.route.label }}
          </p>
          <p v-else class="font-100 text-sm">Choose a route</p>
          <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
        </div>
      </div>
      <div
        v-if="settings.general.route.id !== -1"
        class="option"
        @click="emits('interaction', 'setting', 'open', 'station')"
      >
        <p class="mr-auto ml-0 text-base font-medium">Stop</p>
        <div class="ml-auto mr-0 text-black-60 flex items-center">
          <p v-if="settings.general.station.id !== -1" class="font-100 text-sm">
            {{ settings.general.station.label }}
          </p>
          <p v-else class="font-100 text-sm">Choose a station/stop</p>
          <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
        </div>
      </div>
      <div class="option">
        <p class="mr-auto ml-0 text-base font-medium">Wake up before</p>
        <div class="ml-auto mr-0 text-black-60 flex items-center">
          <p class="font-100 text-sm">
            {{ `${Math.abs(settings.general.alarmtime)} minutes` }}
          </p>
          <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
        </div>
      </div>
      <div
        class="option"
        @click="emits('interaction', 'setting', 'open', 'label')"
      >
        <p class="mr-auto ml-0 text-base font-medium">Label</p>
        <div class="ml-auto mr-0 text-black-60 flex items-center">
          <p class="font-100 text-sm">
            {{ settings.general.label }}
          </p>
          <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
        </div>
      </div>
    </div>
    <div class="mt-2em">
      <h1 class="ml-auto mr-auto text-base text-black-60 font-100">Options</h1>
      <div class="mb-1em mt-0.25em w-full h-0.5px bg-black-15" />
      <div />
      <div class="option">
        <p class="mr-auto ml-0 text-base font-medium">Repeat</p>
        <button class="ml-auto mr-0 text-black-60 flex items-center">
          <p class="font-100 text-sm">
            <!-- TODO: make a function that will translate it into Peoplish -->
            {{ settings.options.repeat.length === 0 ? "Once" : settings.options.repeat.join(", ") }}
          </p>
          <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
        </button>
      </div>
      <div class="option">
        <p class="mr-auto ml-0 text-base font-medium">Snooze</p>
        <ToggleButton
          :checked="settings.options.snooze"
          @click="emits('interaction', 'snooze', 'toggle')"
        />
      </div>
      <div v-if="settings.options.snooze">
        <div class="option">
          <p class="mr-auto ml-0 text-base font-medium">Snooze time</p>
          <button class="ml-auto mr-0 text-black-60 flex items-center">
            <p class="font-100 text-sm">
              <!-- TODO: make a function that will translate it into Peoplish -->
              {{ `${settings.options.snooze_time} minutes` }}
            </p>
            <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-2em">
      <h1 class="ml-auto mr-auto text-base text-black-60 font-100">Sound</h1>
      <div class="mb-1em mt-0.25em w-full h-0.5px bg-black-15" />
      <div class="option">
        <p class="mr-auto ml-0 text-base font-medium">Play sound</p>
        <ToggleButton
          :checked="settings.sound.enabled"
          @click="emits('interaction', 'sound', 'toggle')"
        />
      </div>
      <div v-if="settings.sound.enabled">
        <div class="option">
          <p class="mr-auto ml-0 text-base font-medium">Sound</p>
          <button class="ml-auto mr-0 text-black-60 flex items-center">
            <p class="font-100 text-sm">
              {{ settings.sound.file.split("/").slice(-1)[0].split(".")[0] }}
            </p>
            <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
          </button>
        </div>
        <div class="option">
          <p class="mr-auto ml-0 text-base font-medium">Volume</p>
          <button class="ml-auto mr-0 text-black-60 flex items-center">
            <p class="font-100 text-sm">
              {{ settings.sound.volume }}
            </p>
            <i-srun-caret
              class="flex ml-0.5em w-1.25em h-1.25em text-black-60"
            />
          </button>
        </div>
      </div>
    </div>
    <!-- TODO: motion section -->
    <div class="mt-2em">
      <h1 class="ml-auto mr-auto text-base text-black-60 font-100">Motion</h1>
      <div class="mb-1em mt-0.25em w-full h-0.5px bg-black-15" />
      <div class="option">
        <p class="mr-auto ml-0 text-base font-medium">Use vibration</p>
        <ToggleButton
          :checked="settings.motion.enabled"
          @click="emits('interaction', 'motion', 'toggle')"
        />
      </div>
      <div v-if="settings.motion.enabled">
        <div class="option">
          <p class="mr-auto ml-0 text-base font-medium">Vibration pattern</p>
          <button class="ml-auto mr-0 text-black-60 flex items-center">
            <p class="font-100 text-sm">
              {{ settings.motion.pattern.label }}
            </p>
            <i-srun-caret class="flex w-1.5em h-1.5em text-black-60" />
          </button>
        </div>
        <div class="option">
          <p class="mr-auto ml-0 text-base font-medium">Intensity</p>
          <button class="ml-auto mr-0 text-black-60 flex items-center">
            <p class="font-100 text-sm">
              {{ settings.motion.intensity }}
            </p>
            <i-srun-caret
              class="flex ml-0.5em w-1.25em h-1.25em text-black-60"
            />
          </button>
        </div>
      </div>
    </div>
    <div v-if="!newAlarm" class="mt-2em">
      <h1 class="ml-auto mr-auto text-base text-black-60 font-100">
        Danger zone
      </h1>
      <div class="mb-1em mt-0.25em w-full h-0.5px bg-black-15" />
      <div
        class="option bg-red-25 flex justify-center items-center"
        @click="emits('interaction', 'alarm', 'delete')"
      >
        <p class="text-red-100 my-0.625em">Delete this alarm</p>
      </div>
    </div>
  </div>
</template>

<style>
.option {
  @apply h-2.875em rounded-large bg-black-5 mt-0.5em w-full flex items-center px-1.25em flex justify-between;
}
</style>
