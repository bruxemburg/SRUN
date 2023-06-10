<script setup lang="ts">
import { ref } from "vue";

// import type { PluginResultError } from '@capacitor/core'
// import ToggleButton from "./ToggleButton.vue";
// import Alarm from '~/composables/alarm-plugin'

// import TrashIcon from "~icons/srun/trashbin";
// import CaretIcon from "~icons/srun/caret";
import type { Alarm as AlarmModel, Tag } from "~/composables/alarmModel";

export interface Props {
  sortBy: Tag;
  alarms: AlarmModel[];
}
const { sortBy, alarms } = defineProps<Props>();

// const emits = defineEmits(['interaction'])

const emits = defineEmits<{
  (event: "interaction", interactable: string, interaction: string, ...args: any[]): void;
}>();

const editingMode = ref(false);

function checkSortOption(alarm: AlarmModel, by: string): boolean {
  if (by === "all") return true;
  else if (by === "act" || by === "dis") return alarm.enabled === (by === "act");
  else for (const tag of alarm.tags) if (tag.id === by) return true;
  return false;
}

// set alarm quick solution
/* const setAlarm = async() => {
  const now = new Date()
  const date = new Date(now.setMinutes(now.getMinutes() + 2))

  await Alarm
    .set({ date: date.getTime(), name: 'My alarm' })
    .then((returned) => {
      console.log(returned.status)
    })
    .catch((error: PluginResultError) => {
      console.error(error.message)
    })
} */
</script>

<template>
  <!-- <div class="bg-yellow-25 bg-green-25 bg-red-25 bg-blue-25">don't dell it, it is made to preload custom colors</div> -->
  <div>
    <div class="flex flex-row pb-0.25em">
      <h4 class="mr-auto ml-0 text-black-60">
        {{ sortBy.label }}
      </h4>
      <button class="ml-auto mr-0" @click="editingMode = !editingMode">
        <p v-if="editingMode" class="text-blue-100 font-light">Cancel</p>
        <p v-else class="text-blue-100 font-light">Edit</p>
      </button>
    </div>
    <div>
      <div v-for="alarm in alarms" :key="alarm.id">
        <div
          v-if="checkSortOption(alarm, sortBy.id)"
          class="py-4 border-t border-t-black-5 flex flex-row w-full items-center"
        >
          <div
            v-if="!editingMode"
            class="rounded-full-22px px-1.5625em py-1.1875em"
            :class="`bg-${alarm.settings.general.image.bg.color}`"
          >
            <img
              :src="`./assets/emojis/${alarm.settings.general.image.ico.file}`"
              alt=""
            />
          </div>
          <div
            v-else
            class="rounded-full-22px px-1.25em py-0.875em bg-red-25"
            @click="emits('interaction', 'alarm', 'delete', alarm.id)"
          >
            <i-srun-trashbin class="text-red-100 w-2.625em h-2.625em" />
          </div>
          <div class="flex flex-col justify-center ml-4">
            <h3 class="font-500">
              {{ alarm.settings.general.route.label }}
            </h3>
            <small class="font-400">
              {{ alarm.settings.general.label }} •
              {{ alarm.settings.general.alarmtime }}
            </small>
          </div>
          <ToggleButton
            v-if="!editingMode"
            :checked="alarm.enabled"
            @click="emits('interaction', 'alarm', 'toggle', alarm.id)"
          />
          <!-- <div v-if="!editingMode" class="toggle flex w-2.5em h-1.625em ml-auto rounded-full relative">
            <input type="checkbox" class="checkbox opacity-0 w-full h-full absolute z-2" :checked="alarm.enabled" @click="setAlarm">
            <div class="knobs" />
            <div class="layer" />
          </div> -->
          <i-srun-caret
            v-else
            class="flex ml-auto w-1.75em h-1.75em"
            @click="emits('interaction', 'alarm', 'edit', alarm.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
