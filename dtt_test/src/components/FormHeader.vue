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
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;

  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
  flex-grow: 1;
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
  position: absolute;
  left: 1rem; 
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
    justify-content: flex-start;
    width: auto;
  }

  h1,
  .back-link {
    color: #000;
    text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
  }

  h1 {
    text-align: left;
    flex-grow: 0;
  }

  .back-link {
    margin-bottom: 2rem;
 
    position: static;
    left: auto;
  }

  .desktop-only-text {
    display: inline;
  }
}
</style>
