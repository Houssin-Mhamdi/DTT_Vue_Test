<script setup>
defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);

function updateSort(value) {
  emit("update:modelValue", value);
}
</script>
<template>
  <div class="sort-toggle">
    <button
      :class="{ active: modelValue === 'price' }"
      @click="updateSort('price')"
    >
      Price
    </button>
    <button
      :class="{ active: modelValue === 'size' }"
      @click="updateSort('size')"
    >
      Size
    </button>
  </div>
</template>

<style scoped>
.sort-toggle {
  display: flex;
  background-color: #e8e8e8;
  border-radius: 8px;
}
.sort-toggle button {
  border: none;
  padding: 10px 50px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  color: #a9a9a9;
}
.sort-toggle button.active {
  background-color:  var(--color-primary);
  color: #ffffff;
}
@media (max-width: 767px) {
  .sort-toggle {
    width: 100%;
  }

  .sort-toggle button {
    flex: 1;
    padding: 10px 0;
    font-size: 0.9rem;
  }
}
</style>
