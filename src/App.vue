<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/game">About</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import store from "@/store";

onBeforeMount(() => store.commit("retrieveSettings"));
onMounted(() =>
  store.subscribe((mutation, state) => {
    localStorage.setItem("settings", JSON.stringify(state.settings));
  })
);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
