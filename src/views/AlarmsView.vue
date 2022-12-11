<script setup lang="ts">
// import { Storage } from '@capacitor/storage'
// import alarmsJson from '../alarms.json'
import type { PluginResultError } from "@capacitor/core";
import tagsJson from "../tags.json";
import Header from "~/components/Header.vue";
import Footer from "~/components/TabBar.vue";
import SortBar from "~/components/SortBar.vue";
import Alarms from "~/components/Alarms.vue";
import router from "~/router";
import { Alarm } from "~/composables/alarmModel";
import TipsAndTricks from "~/components/TipsAndTricks.vue";
import { Alarm as AlarmPlugin } from "~/composables/alarm-plugin";

// import AlarmSettings from '~/components/AlarmSettings.vue'

// let settingsView = $ref(false)
// let interactableAlarm = $ref(-1)

const sortOptions = tagsJson;
// const firstEl = sortOptions[1]
// const sortBy = $ref(sortOptions[1]) // this shit does magic
// console.log(sortOptions[1])
const sortBy = $ref(JSON.parse(JSON.stringify(tagsJson[0])));
/* const sortOptions = [
  {
    id: 'rec',
    title: 'Recent',
  },
  {
    id: 'freq',
    title: 'Frequent',
  },
  {
    id: 'act',
    title: 'Active',
  },
  {
    id: 'dis',
    title: 'Disabled',
  },
  {
    id: 'all',
    title: 'All',
  },
] */
const alarmC = new Alarm();
let alarms: any[] = $ref([]);
// Storage.remove({ key: 'alarms' }).then(val => alarmC.getAllAlarms().then((val) => { alarms = JSON.parse(JSON.stringify(val)); console.log(alarms) }))
// [JSON.parse(JSON.stringify(alarmC))]
// alarms = await alarms[0].getAllAlarms()
// alarmC.getAllAlarms().then((val) => { alarms = JSON.parse(JSON.stringify(val)) })
function getAllAlarms(): void {
  alarmC.getAllAlarms().then((val) => {
    alarms = JSON.parse(JSON.stringify(val));
  });
}
getAllAlarms();

let alarmToggled = $ref(false);

// console.log(alarms)
// alarms = $ref(await alarmsJson.map(async(val, key) => await alarms.getAlarm(key)))

/* const alarms = alarmsJson.map((val, key) => new Alarm(key))
alarms.sort((a, b) => { return a.id - b.id }) */

function sortSetUp(by: string): void {
  for (let i = 0; i < sortOptions.length; i++) {
    if (sortOptions[i].id === by) {
      sortBy.id = by;
      sortBy.label = sortOptions[i].label;
      // made to show enabled/disabled alarms after changing sort option
      if (alarmToggled) getAllAlarms();
      alarmToggled = false;
      return;
    }
  }
  console.log(`${by} is not a valid sort option`);
}

function interactions(interactable: string, interaction: string, ...args: any[]): void {
  if (interactable === "alarm") {
    if (interaction === "edit") {
      const alarmId = args[0];
      if (typeof alarmId !== "number") return console.log("alarmId is not a number");
      if (!alarms.map((alarm) => alarm.id).includes(alarmId)) return console.log("alarmId is not a valid alarm id");
      router.push(`/alarm/${alarmId}`);
      // interactableAlarm = alarmId
      // settingsView = true
    } else if (interaction === "new") {
      router.push("/alarm/-1");
    } else if (interaction === "delete") {
      alarmC.deleteAlarm(args[0]).then(() => getAllAlarms());
    } else if (interaction === "toggle") {
      alarmC.toggleAlarm(args[0]);
      alarmToggled = true;

      // temp
      const now = new Date();
      const date = new Date(now.setMinutes(now.getMinutes() + 0.5));

      AlarmPlugin.set({ date: date.getTime(), name: "My alarm" })
        .then((returned) => {
          console.log(returned.status);
        })
        .catch((error: PluginResultError) => {
          console.error(error.message);
        });

      /* const alrm = alarms.find(alrm => alrm.id === args[0])
      if (alrm) alrm.enabled = !alrm.enabled */
    }
    // else { settingsView = false }
  }
}
</script>

<template>
  <Header @interaction="interactions" />

  <main>
    <SortBar class="py-1em" :sort-by="sortBy" :sort-options="sortOptions" @sort-set-up="sortSetUp" />
    <Alarms class="py-1em" :sort-by="sortBy" :alarms="alarms" @interaction="interactions" />
    <TipsAndTricks class="mb-6em" />
  </main>

  <Footer />
</template>
