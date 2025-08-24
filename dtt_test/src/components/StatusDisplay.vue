<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },

  loadingText: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div v-if="isLoading" class="status-message">
    {{ loadingText }}
  </div>

  <div v-else-if="errorMessage" class="status-message error">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
.status-message {
  text-align: center;
  padding: 40px;
  font-size: 1.2em;
  color: #888;
  font-family: "Montserrat", sans-serif;
}

.status-message.error {
  color: #c0392b;
}
</style>
