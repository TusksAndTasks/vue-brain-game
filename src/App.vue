<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";

import model from "@/model";

onBeforeMount(() => {
  model.commit("retrieveLocalState", "statistics");
  model.commit("retrieveLocalState", "settings");
});
onMounted(() =>
  model.subscribe((mutation, state) => {
    localStorage.setItem("statistics", JSON.stringify(state.statistics));
    localStorage.setItem("settings", JSON.stringify(state.settings));
  })
);
</script>
