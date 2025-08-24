  <script setup>
  import { computed } from "vue";
  const props = defineProps({
    modelValue: { type: [String, Number], default: "" },
    label: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    required: { type: Boolean, default: false },
    optional: { type: Boolean, default: false },
    error: { type: String, default: "" },
  });

  const emit = defineEmits(["update:modelValue", "blur"]);

  const value = computed({
    get() {
      return props.modelValue;
    },
    set(newValue) {
      emit("update:modelValue", newValue);
    },
  });
  

  const handleBlur = () => {
    emit("blur");
  };
  </script>

  <template>
    <div class="form-group">
      <label :for="id">
        {{ label }}
        <span v-if="optional" class="optional">(optional)</span>
      </label>
      <input
        :id="id"
        :type="type"
        v-model="value"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        :required="required"
        :class="{ 'has-error': error }"
      />
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

  .optional {
    font-weight: 400;
    color: #888;
  }

  input {
    width: 100%;
    padding: 1rem 0.2rem;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  input.has-error {
    border-color:  var(--color-primary);
  }
  .error-message {
    color:  var(--color-primary);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  input:focus {
    outline: none;
    border-color:  var(--color-primary);
  }

  @media (min-width: 1024px) {
    .form-group label {
      color: #000;
      text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
    }
  }
  </style>
