<script setup lang="ts">
import { RouterView } from "vue-router";
import Nav from "./commen/Nav.vue";
import MobileNavBar from "./commen/MobileNavBar.vue";
</script>

<template>
  <div>
    <Nav />
    <main class="main-content">
      <RouterView />
    </main>

    <MobileNavBar />
  </div>
</template>

<style scoped>
.main-content {
  padding-top: 50px;
}
@media (max-width: 767px) {
  .main-content {
    padding-bottom: 65px;
    padding-top: 0px;
  }
}
</style>
