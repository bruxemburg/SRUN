<script setup lang="ts">
import { RouterView } from "vue-router";

// import SampleView from './views/SampleView.vue'
// import { toggleDark } from '~/composables/'
import { Capacitor } from "@capacitor/core";
import { ref } from "vue";

// import AlarmView from './views/AlarmView.vue'
import { Directory, Filesystem } from "@capacitor/filesystem";
import HintComponent from "~/components/Hint.vue";
import { update_latest_mobility_data_on_network } from "~/composables/routes";

// Create directories to store the GTFS data in
Filesystem.mkdir({ // for GTFSs (users will be able to add their own GTFSs here)
  path: 'routes',
  directory: Directory.Data,
  recursive: false
});
Filesystem.mkdir({ // for non-user data (e.g. latest_gtfs_sources.txt)
  path: 'data',
  directory: Directory.Library,
  recursive: false
});

// Gather latest GTFS source links on startup
update_latest_mobility_data_on_network().then(result => {
  if (result !== null) console.log(`Added/updated file at ${ result.uri }`)
}).catch(err => {
  console.error(err)
});

// Hint component logic
const triggered = ref(Capacitor.getPlatform() !== "web");
const body = document.querySelector<HTMLBodyElement>("body")!;

if (triggered.value) body.classList.replace("overflow-hidden", "overflow-auto");

function overflow () {
  triggered.value = true;

  if (body.classList.contains("overflow-hidden") && triggered.value)
    body.classList.replace("overflow-hidden", "overflow-auto");
}
</script>

<template>
  <RouterView />
  <HintComponent
    v-if="triggered === false"
    :class="Capacitor.getPlatform() === 'web' ? 'block' : 'hidden'"
    class="z-99"
    @click="overflow"
  />
</template>
