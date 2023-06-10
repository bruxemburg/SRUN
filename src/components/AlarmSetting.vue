<script setup lang="ts">
import { ref } from "vue";
import transportJson from "../transport.json";
// import SortBar from "./SortBar.vue";
// import CaretIcon from "~icons/srun/caret";
// import SearchIcon from "~icons/srun/search";
// import CheckmarkIcon from "~icons/srun/checkmark";
// import type { Settings } from '~/composables/alarmModel'
// import type { Route } from '~/composables/alarmModel'
// import { Settings, Transport } from '~/composables/alarmModel'

export interface Props {
  type: string;
  input: any;
}
const { type, input } = defineProps<Props>();

const emits = defineEmits<{
  (event: "interaction", ibl: string, ion: string, ...args: any[]): void;
}>();

const rndVar = ref(input);

// if (input.acLabel) rndVar = input.acLabel

/* let sortBy = $ref()
let routes = $ref()
let acRoute = $ref()

if (type === 'route') {
  sortBy = input.sortBy
  routes = input.routes
  acRoute = input.acRoute
} */

// const srtBy = $ref(sortBy)
// const acRoutecp = acRoute

// const localSettings = $ref(JSON.parse(JSON.stringify(settings)))
// const localAcRoute = $ref(JSON.parse(JSON.stringify(acRoute)))

const sortOptions = transportJson;
// const sortBy = $ref({ id: 'bus', label: 'Bus' })

function sortSetUp(by: string): void {
  for (let i = 0; i < sortOptions.length; i++) {
    if (sortOptions[i].id === by) {
      /* srtBy.id = by
      srtBy.label = sortOptions[i].label */
      emits("interaction", "setting", "sort", by);
      // emits('interaction', 'ts', 'change', sortBy)
      // localSettings.general.transport = new Transport(sortBy.id)
      /* console.log(localSettings.general.route)
      console.log(localSettings.general.transport.routes[0])
      console.log(localSettings.general.transport.routes[0].id === localSettings.general.route.id) */
      return;
    }
  }
  console.log(`${by} is not a valid sort option`);
}

// const rBts = $ref(localSettings.getAllRoutes(sortBy.id))
</script>

<template>
  <div v-if="type === 'route'">
    <div class="flex justify-between items-center mb-1.5em">
      <button
        class="flex justify-center items-center h-1.75em w-1.75em rounded-full bg-black-5"
        @click="emits('interaction', 'setting', 'cancel')"
      >
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
      <h3>Choose a route</h3>
      <button class="invisible">
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
    </div>
    <SortBar
      class="px-1.75em flex flex-row justify-between pb-1.5em"
      :sort-by="input.sortBy"
      :sort-options="sortOptions"
      @sort-set-up="sortSetUp"
    />
    <div class="mb-0.5em">
      <div
        class="mb-1em py-0.75em px-1.25em bg-black-5 rounded-full rounded-0.875em flex justify-between items-center"
      >
        <p class="text-black-60">Search for route...</p>
        <i-srun-search class="text-base" />
      </div>
      <div class="bg-black-5 h-11.25em rounded-1.25em overflow-scroll">
        <div
          v-for="route in input.routes"
          :key="route.id"
          :class="{ 'bg-blue-25': route.id === input.acRoute.id }"
          @click="emits('interaction', 'setting', 'change', route.id)"
        >
          <div
            v-if="route.transport.id !== 'car'"
            class="py-0.5em mx-1.25em border-b border-b-black-15 flex flex-row items-center"
          >
            <div class="w-1.625em flex items-center justify-center">
              <p class="font-medium">
                {{ route.label.split(" | ")[0] }}
              </p>
            </div>
            <div class="ml-1em">
              <p>
                {{ route.label.split(" | ")[1] }}
              </p>
            </div>
            <i-srun-checkmark
              class="ml-auto text-base"
              :class="{ invisible: route.id !== input.acRoute.id }"
            />
          </div>
          <div
            v-else
            class="py-0.5em mx-1.25em border-b border-b-black-15 flex flex-row items-center"
          >
            <p class="font-regular">
              {{ route.label }}
            </p>
            <i-srun-checkmark
              class="ml-auto text-base"
              :class="{ invisible: route.id !== input.acRoute.id }"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-blue-100 text-white rounded-1.375em py-1em"
      @click="emits('interaction', 'setting', 'save')"
    >
      <h3>Choose</h3>
    </button>
  </div>
  <div v-else-if="type === 'station'">
    <div class="flex justify-between items-center mb-1.5em">
      <button
        class="flex justify-center items-center h-1.75em w-1.75em rounded-full bg-black-5"
        @click="emits('interaction', 'setting', 'cancel')"
      >
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
      <h3>Choose a station</h3>
      <button class="invisible">
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
    </div>
    <div class="mb-0.5em">
      <div
        class="mb-1em py-0.75em px-1.25em bg-black-5 rounded-full rounded-0.875em flex justify-between items-center"
      >
        <p class="text-black-60">Search for route...</p>
        <i-srun-search class="text-base" />
      </div>
      <div class="bg-black-5 h-11.25em rounded-1.25em overflow-scroll">
        <div
          v-for="station in input.stations"
          :key="station.id"
          :class="{ 'bg-blue-25': station.id === input.acStation.id }"
          @click="emits('interaction', 'setting', 'change', station.id)"
        >
          <div
            class="py-0.5em mx-1.25em border-b border-b-black-15 flex flex-row items-center"
          >
            <div class="flex items-center justify-center">
              <p>
                {{ station.label }}
              </p>
            </div>
            <i-srun-checkmark
              class="ml-auto text-base"
              :class="{ invisible: station.id !== input.acStation.id }"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-blue-100 text-white rounded-1.375em py-1em"
      @click="emits('interaction', 'setting', 'save')"
    >
      <h3>Choose</h3>
    </button>
  </div>
  <div v-else-if="type === 'label'">
    <div class="flex justify-between items-center mb-1.5em">
      <button
        class="flex justify-center items-center h-1.75em w-1.75em rounded-full bg-black-5"
        @click="emits('interaction', 'setting', 'cancel')"
      >
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
      <h3>Change a label</h3>
      <button class="invisible">
        <i-srun-caret class="p-0.05em text-black-60 transform rotate-180" />
      </button>
    </div>
    <div
      class="mb-1em py-0.75em px-1.25em bg-black-5 rounded-full rounded-0.875em flex justify-between items-center"
    >
      <input
        v-model="rndVar.label"
        type="text"
        class="h-full w-full text-black-60"
        :placeholder="input.acLabel"
      />
    </div>
    <button
      class="bg-blue-100 text-white rounded-1.375em py-1em"
      @click="emits('interaction', 'setting', 'save', rndVar.label)"
    >
      <h3>Change</h3>
    </button>
  </div>
</template>
