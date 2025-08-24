
<script setup lang="ts">

defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h2 v-if="message" class="results-indicator">
    {{ message }}
  </h2>
</template>

<style scoped>

.results-indicator {
  font-size: 1.125rem; 
  font-weight: 700; 
  margin-bottom: 25px;
  color: #000;
  font-family: "Montserrat", sans-serif;
}
</style>