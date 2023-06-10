<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import { type GTFSAvailableCountry, get_all_available_countries_and_regions, latest_mobility_data, update_latest_mobility_data } from '~/composables/routes';

const test: Ref<GTFSAvailableCountry[]|any[]> = ref(["not yet"])
watch(latest_mobility_data, (val) => {
    console.log(`new val is ${ val }`)
    test.value = get_all_available_countries_and_regions(val)
})
update_latest_mobility_data()
</script>

<template>
  {{ test.join(", ") }}
</template>
