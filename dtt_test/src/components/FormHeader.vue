<script setup>
import backIcon from "@/assets/ic_back_grey@3x.png";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

defineEmits(["back"]);
</script>

<template>
  <header class="form-header">
    <button @click="$emit('back')" class="back-link">
      <img :src="backIcon" alt="Back" class="back-icon" />
      <span @click="$emit('back')" class="desktop-only-text"
        >Back to overview</span
      >
    </button>
    <h1 @click="$emit('back')">{{ title }}</h1>
  </header>
</template>

<style scoped>
/* --- Mobile Styles (Default) --- */
.form-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-align: left;
  margin-bottom: 0;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-secondary);
  padding: 0;
  margin-bottom: -20px;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.desktop-only-text {
  display: none;
}

/* --- Desktop Styles for the header --- */
@media (min-width: 1024px) {
  .form-header {
    display: block;
  }

  h1,
  .back-link {
    color: #000;
    text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
  }

  .back-link {
    margin-bottom: 2rem;
  }

  .desktop-only-text {
    display: inline;
  }
}
</style>
