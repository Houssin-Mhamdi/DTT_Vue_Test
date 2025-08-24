<script setup>
import { ref, watch } from "vue";
import uploadIcon from "@/assets/ic_upload@3x.png";

const props = defineProps({
  modelValue: {
    type: [File, String, null],
    default: null,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const imagePreview = ref(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === "string") {
      imagePreview.value = newValue; // For existing image URLs
    } else if (newValue instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => (imagePreview.value = e.target.result);
      reader.readAsDataURL(newValue);
    } else {
      imagePreview.value = null;
    }
  },
  { immediate: true }
);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    emit("update:modelValue", file);
  }
};

const removeImage = () => {
  emit("update:modelValue", null);
};
</script>

<template>
  <div class="form-group span-2">
    <label>Upload picture (PNG or JPG)*</label>
    <div v-if="!imagePreview" class="image-upload-box">
      <label for="house-image" class="upload-label">
        <img :src="uploadIcon" alt="Upload icon" class="upload-icon" />
      </label>
      <input
        id="house-image"
        type="file"
        @change="handleImageUpload"
        accept="image/png, image/jpeg"
        class="file-input"
      />
    </div>
    <div v-else class="image-preview">
      <img :src="imagePreview" alt="House preview" />
      <button @click="removeImage" type="button" class="remove-image-btn">
        &times;
      </button>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
/* Copy all image-related styles here */
.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-secondary);
  font-size: 0.875rem;
  display: block;
}
.image-upload-box {
  border: 2px dashed #c3c3c3;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 120px;
  cursor: pointer;
}
.file-input {
  display: none;
}
.upload-label {
  cursor: pointer;
}
.upload-icon {
  width: 32px;
  height: 32px;
}
.image-preview {
  position: relative;
  width: 90px;
  height: 90px;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.remove-image-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message {
  color: var(--color-primary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}
.span-2 {
  grid-column: 1 / -1;
}
</style>
