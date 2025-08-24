<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, required: true },
  id: { type: String, required: true },
  options: { type: Array, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select" },
  error: { type: String, default: "" },
});

defineEmits(["update:modelValue", "blur"]);
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :required="required"
      :class="{ 'has-error': error }"
    >
      <option disabled value="">{{ placeholder }}</option>

      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>

    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-secondary);
  font-size: 0.875rem;
}

select {
  width: 100%;
  padding: 1rem 0.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1em;
}

select:focus {
  outline: none;
  border-color:  var(--color-primary);
}
select.has-error {
  border-color:  var(--color-primary);
}
.error-message {
  color:  var(--color-primary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

@media (min-width: 1024px) {
  .form-group label {
    color: #000;
    text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
  }
}
</style>
