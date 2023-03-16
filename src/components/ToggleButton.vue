<script setup lang="ts">
export interface Props {
  checked: boolean;
}
const { checked = false } = defineProps<Props>();
</script>

<template>
  <div class="toggle flex w-2.5em h-1.625em ml-auto rounded-full relative">
    <input
      type="checkbox"
      class="checkbox opacity-0 w-full h-full absolute z-2"
      :checked="checked"
    />
    <div class="knobs" />
    <div class="layer" />
  </div>
</template>
