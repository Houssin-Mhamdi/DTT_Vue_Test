<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";

import FormInput from "@/commen/FormInput.vue";
import FormSelect from "@/commen/FormSelect.vue";
import FormHeader from "@/components/FormHeader.vue";

import backIcon from "@/assets/ic_back_grey@3x.png";
import uploadIcon from "@/assets/ic_upload@3x.png";
import { createHouse, uploadHouseImage } from "@/services/houseService";
import { initialFormState } from "@/utils/formConstants.ts";
import { useListingForm } from "@/composables/useListingForm";

const router = useRouter();
const imagePreview = ref(null);
const isLoading = ref(false);

const { formData, errors, validateField, validateForm } = useFormValidation({
  ...initialFormState,
});
const { garageOptions, goBack, handleImageUpload, removeImage, submitForm } =
  useListingForm({
    formData,
    imagePreview,
    isLoading,
    validateForm,
    validateField,
    router,
  });
</script>

<template>
  <div class="create-listing-page">
    <main class="content-wrapper">
      <FormHeader title="Create new listing" @back="goBack" />

      <form @submit.prevent="submitForm" class="listing-form">
        <FormInput
          class="span-2"
          id="street-name"
          label="Street name*"
          v-model="formData.streetName"
          :error="errors.streetName"
          @blur="validateField('streetName')"
          placeholder="Enter the street name"
        />
        <FormInput
          id="house-number"
          label="House number*"
          type="number"
          v-model="formData.houseNumber"
          :error="errors.houseNumber"
          placeholder="Enter house number"
          @blur="validateField('houseNumber')"
        />
        <FormInput
          id="addition"
          label="Addition"
          v-model="formData.numberAddition"
          placeholder="e.g. A"
          :required
        />
        <FormInput
          id="postal-code"
          label="Postal code*"
          v-model="formData.zip"
          :error="errors.zip"
          placeholder="e.g. 1000 AA"
          @blur="validateField('zip')"
        />
        <FormInput
          id="city"
          label="City*"
          v-model="formData.city"
          :error="errors.city"
          @blur="validateField('city')"
          placeholder="e.g. Utrecht"
        />

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

          <span v-if="errors.image" class="error-message">{{
            errors.image
          }}</span>
        </div>

        <FormInput
          class="span-2"
          id="price"
          label="Price*"
          type="number"
          placeholder="e.g. €150.000"
          v-model="formData.price"
          :error="errors.price"
          @blur="validateField('price')"
        />
        <FormInput
          id="size"
          label="Size*"
          type="number"
          placeholder="e.g. 60m2"
          v-model="formData.size"
          :error="errors.size"
          @blur="validateField('size')"
        />

        <FormSelect
          id="garage"
          label="Garage*"
          v-model="formData.hasGarage"
          :options="garageOptions"
          :error="errors.hasGarage"
          @blur="validateField('hasGarage')"
        />

        <FormInput
          id="bedrooms"
          label="Bedrooms*"
          type="number"
          placeholder="Enter amount"
          v-model="formData.bedrooms"
          :error="errors.bedrooms"
          @blur="validateField('bedrooms')"
        />
        <FormInput
          id="bathrooms"
          label="Bathrooms*"
          type="number"
          placeholder="Enter amount"
          v-model="formData.bathrooms"
          :error="errors.bathrooms"
          @blur="validateField('bathrooms')"
        />
        <FormInput
          class="span-2"
          id="construction-date"
          label="Construction date*"
          type="number"
          placeholder="e.g. 1990"
          v-model="formData.constructionYear"
          :error="errors.constructionYear"
          @blur="validateField('constructionYear')"
        />

        <div class="form-group span-2">
          <label for="description">Description*</label>
          <textarea
            id="description"
            placeholder="Enter description"
            v-model="formData.description"
            @blur="validateField('description')"
            :class="{ 'has-error': errors.description }"
            rows="5"
          ></textarea>
          <span v-if="errors.description" class="error-message">{{
            errors.description
          }}</span>
        </div>

        <div class="form-actions span-2">
          <button type="submit" class="post-btn" :disabled="isLoading">
            {{ isLoading ? "POSTING..." : "POST" }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* --- General Page Styling --- */
.create-listing-page {
  background-color: #f7f7f8;
  min-height: 100vh;
  padding: 1rem;
}
.content-wrapper {
  max-width: 400px;
  margin: 0 auto;
}

textarea.has-error {
  border-color:  var(--color-primary);
}
.error-message {
  color:  var(--color-primary);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}
/* --- Header --- */
.form-header {
  margin-bottom: 2rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  text-align: left;
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
  margin-bottom: 1rem;
}
.back-icon {
  width: 24px;
  height: 24px;
}

/* --- Form Layout --- */
.listing-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-secondary);
  font-size: 0.875rem;
  display: block;
}
select,
textarea {
  width: 100%;
  padding: 1rem 0.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 1rem;
}
select:focus,
textarea:focus {
  outline: none;
  border-color:  var(--color-primary);
}

/* --- Image Upload --- */
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

/* --- Actions --- */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
.post-btn {
  background-color:  var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 3rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
}
.post-btn:hover {
  background-color: #d34835;
}

/* --- Desktop Styles --- */
@media (min-width: 1024px) {
  .create-listing-page {
    background-image: url("../assets/img_background@3x.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 3rem 4rem;
  }
  .content-wrapper {
    background: none;
    width: 50%;
    max-width: 450px;
    margin: 0;
    padding: 0;
  }
  h1,
  .form-group label,
  .back-link {
    color: #000;
    text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
  }
  .back-link {
    margin-bottom: 2rem;
  }
  .listing-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.2rem;
    column-gap: 1.5rem;
  }
  .span-2 {
    grid-column: 1 / -1;
  }
  .post-btn {
    width: auto;
  }
}
</style>
