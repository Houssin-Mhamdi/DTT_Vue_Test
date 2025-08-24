<script setup>
import { defineProps, defineEmits } from "vue";
import ClearIcon from "@/assets/ic_clear@3x.png";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Search..." },
  icon: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

function clearInput() {
  emit("update:modelValue", "");
}
</script>

<template>
  <div class="search-bar">
    <span class="search-icon">
      <img :src="icon" alt="Search Icon" />
    </span>

    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
    <span v-if="modelValue" class="clear-icon" @click="clearInput">
      <img :src="ClearIcon" alt="Clear search" />
    </span>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  flex-grow: 1;
  max-width: 300px;
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 100%;
  padding: 12px 40px;
  border: none;
  border-radius: 8px;
  background-color: #e8e8e8;
  color: #333;
  font-size: 14px;
}

.search-bar input::placeholder {
  color: #a9a9a9;
}

.search-icon,
.clear-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
}

.search-icon {
  left: 15px;
}

.clear-icon {
  right: 15px;
  cursor: pointer;
}

.search-icon img,
.clear-icon img {
  width: 100%;
  height: 100%;
}

/* --- Responsive styles --- */
@media (max-width: 767px) {
  .search-bar {
    max-width: 100%;
  }

  .search-bar input {
    font-size: 0.9rem;
    padding: 10px 38px;
  }

  .search-icon {
    left: 12px;
  }
  .clear-icon {
    right: 12px;
  }
}
</style>
