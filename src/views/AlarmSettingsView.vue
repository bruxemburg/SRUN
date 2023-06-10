<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

// import alarmsJson from '../alarms.json'
// import Header2 from "../components/Header2.vue";
// import AlarmSettings from "~/components/AlarmSettings.vue";
// import AlarmSetting from "~/components/AlarmSetting.vue";
import router from "~/router";

// import TabBar from "~/components/TabBar.vue";
// import type { Settings } from '~/composables/alarmModel.ts'
// import { Settings, Transport } from '~/composables/alarmModel'
import { Alarm, Route, Station, Transport } from "~/composables/alarmModel";

/* const emits = defineEmits<{
  (event: 'getData', obj: string, ...args: any[]): void
}>() */
const alarmC = new Alarm();
const alarm = ref(JSON.parse(JSON.stringify(alarmC)));
// const alarm = $ref<InstanceType<typeof Alarm> | null>(null)

let newAlarm = false;

const $route = useRoute();
const alarmId = parseInt($route.params.id.toString());
const idIsNotANumber = isNaN(alarmId);
if (idIsNotANumber) {
  router.push("/alarms");
} else {
  // console.log(alarm.value)
  // alarm = await alarm.getAlarm(alarmId)
  alarmC.getAlarm(alarmId).then((val) => {
    alarm.value = val;
  });
  if (alarmId === -1) newAlarm = true;
  // alarmC.getNewAlarmId().then((val) => { alarm.id = val })

  // console.log(alarm)
  // console.log(alarm.settings as Settings)
  /* if (alarmId !== -1) { alarm.value = alarmsJson.filter((obj) => { return obj.id === alarmId })[0] }
  else {
    newAlarm = true
    let i = 0
    while (alarmsJson.map(alarm => alarm.value.id).includes(i)) i++
    alarm.value.id = i
  } */
  // console.log(alarm.value.enabled)
}

const settingType = ref("");
const showSetting = ref(false);
const settingInput = ref({} as any);

function changeSettings(ibl: string, ion: string, ...args: any[]) {
  if (ibl === "setting") {
    if (ion === "cancel") {
      showSetting.value = false;
    } else if (ion === "open") {
      settingType.value = args[0];
      if (settingType.value === "route") {
        settingInput.value.sortBy = new Transport(alarm.value.settings.general.route.transport.id);
        settingInput.value.acRoute = JSON.parse(JSON.stringify(alarm.value.settings.general.route));
        settingInput.value.routes = alarmC.settings.getAllRoutes(settingInput.value.sortBy.id);
      } else if (settingType.value === "station") {
        settingInput.value.acStation = JSON.parse(JSON.stringify(alarm.value.settings.general.station));
        settingInput.value.stations = alarmC.settings.getAllStations(alarm.value.settings.general.route.id);
      } else if (settingType.value === "label") {
        settingInput.value.acLabel = alarm.value.settings.general.label;
      }
      showSetting.value = true;
    } else if (ion === "save") {
      if (settingType.value === "route") {
        if (alarm.value.settings.general.route.id !== settingInput.value.acRoute.id) {
          alarm.value.settings.general.route = settingInput.value.acRoute;
          alarm.value.settings.general.station = new Station();
        }
      } else if (settingType.value === "station") {
        if (alarm.value.settings.general.station.id !== settingInput.value.acStation.id)
          alarm.value.settings.general.station = settingInput.value.acStation;
      } else if (settingType.value === "label") {
        if (alarm.value.settings.general.label !== args[0] && args[0] !== "")
          alarm.value.settings.general.label = args[0];
      }
      settingType.value = "";
      showSetting.value = false;
    } else if (ion === "sort") {
      if (settingType.value === "route") {
        settingInput.value.sortBy = new Transport(args[0]);
        settingInput.value.routes = alarmC.settings.getAllRoutes(settingInput.value.sortBy.id);
      }
    } else if (ion === "change") {
      if (settingType.value === "route") settingInput.value.acRoute = new Route(args[0]);
      else if (settingType.value === "station") settingInput.value.acStation = new Station(args[0]);
      else if (settingType.value === "label") settingInput.value.acLabel = args[0];
    }
  } else if (ibl === "alarm") {
    if (ion === "cancel") {
      router.push("/alarms");
    } else if (ion === "save") {
      // console.log(alarm)
      /* if(newAlarm) alarmC.saveAlarm(alarm)
      else */
      alarmC.saveAlarm(alarm.value);
      router.push("/alarms");
    } else if (ion === "delete") {
      alarmC.deleteAlarm(alarm.value.id);
      router.push("/alarms");
    }
  } else if (ibl === "snooze") {
    if (ion === "toggle") alarm.value.settings.options.snooze = !alarm.value.settings.options.snooze;
  } else if (ibl === "sound") {
    if (ion === "toggle") alarm.value.settings.sound.enabled = !alarm.value.settings.sound.enabled;
  } else if (ibl === "motion") {
    if (ion === "toggle") alarm.value.settings.motion.enabled = !alarm.value.settings.motion.enabled;
  }
  /* else if (ibl === 'transport') {
    if (ion === 'change') {
      const transport: Transport = args[0]
      alarm.settings.transport = transport
    }
  } */
}
// console.log(allRoutes)

/* const sortBy = $ref(new Transport('bus'))
const acRouteCopy = $ref(JSON.parse(JSON.stringify(alarm.settings.general.route)))
const allRoutes = $ref(new Settings().getAllRoutes(sortBy.id)) */
</script>

<template :class="{ 'overflow-hidden': showSetting }">
  <Header2 :new-alarm="newAlarm" @interaction="changeSettings" />
  <main>
    <AlarmSettings
      v-if="!idIsNotANumber"
      class="py-0.5em mb-10em"
      :settings="alarm.settings"
      :new-alarm="newAlarm"
      @interaction="changeSettings"
    />
  </main>
  <TabBar />
  <div v-if="showSetting" class="fixed z-99 top-0 left-0 w-full h-full">
    <div
      class="absolute z-1 w-full h-full bg-black-100 backdrop-filter backdrop-blur-4 bg-opacity-25"
      @click="showSetting = false"
    />
    <AlarmSetting
      class="absolute z-2 bottom-0 left-0 w-full px-1em pb-1.75em pt-1.5em bg-white rounded-t-2em flex flex-col"
      :type="settingType"
      :input="settingInput"
      @interaction="changeSettings"
    />
    <!-- <div class="absolute z-2 bottom-0 left-0 w-full px-1em pb-1.75em pt-1.5em bg-white rounded-t-2em flex flex-col">
      <AlarmSettingHeader :type="settingType" />
      <AlarmSettingCRoute v-if="settingType === 'route'" :sort-by="settingInput.sortBy" :ac-route="settingInput.acRoute" :routes="settingInput.routes" @interaction="changeSettings" />
      <AlarmSettingCStation v-else-if="settingType === 'station'" :ac-station="settingInput.acStation" :stations="settingInput.stations" @interaction="changeSettings" />
    </div> -->
    <!-- <AlarmSettingRoute v-if="type==='route'" class="absolute z-2 bottom-0 left-0 w-full px-1em pb-1.75em pt-1.5em bg-white rounded-t-2em flex flex-col" :input="settingInput" @interaction="changeSettings" /> -->
  </div>
</template>

<!-- <style>

</style> -->
