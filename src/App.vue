<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import store from "@/store";

onBeforeMount(() => {
  store.commit("retrieveLocalState", "statistics");
  store.commit("retrieveLocalState", "settings");
});
onMounted(() =>
  store.subscribe((mutation, state) => {
    localStorage.setItem("statistics", JSON.stringify(state.statistics));
    localStorage.setItem("settings", JSON.stringify(state.settings));
  })
);
</script>
