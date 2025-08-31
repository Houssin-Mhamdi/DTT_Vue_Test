<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFormValidation } from "@/composables/useFormValidation";

// Component Imports
import FormInput from "@/commen/FormInput.vue";
import FormSelect from "@/commen/FormSelect.vue";
import FormHeader from "@/components/FormHeader.vue";
import ImageUploader from "@/components/ImageUploader.vue";

import backIcon from "@/assets/ic_back_grey@3x.png";
import uploadIcon from "@/assets/ic_upload@3x.png";

// Service Imports
import {
  createHouse,
  uploadHouseImage,
  getHouseById,
  updateHouse,
} from "@/services/houseService";

// Utility Imports
import { initialFormState } from "@/utils/formConstants.ts";

// --- Component State ---
const router = useRouter();
const route = useRoute();
const imagePreview = ref(null);
const isLoading = ref(false);
const isEditing = ref(false);
const houseId = ref(null);

const formState = reactive({ ...initialFormState });

// --- Lifecycle Hooks ---
onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    houseId.value = route.params.id;
    isLoading.value = true;

    try {
      const response = await getHouseById(houseId.value);
      const houseData = response.data[0];

      // Populate the form with fetched data
      formState.streetName = houseData.location.street;
      formState.houseNumber = houseData.location.houseNumber;
      formState.addition = houseData.location.houseNumberAddition;
      formState.zip = houseData.location.zip;
      formState.city = houseData.location.city;
      formState.price = houseData.price;
      formState.size = houseData.size;
      formState.hasGarage = houseData.hasGarage ? "Yes" : "No";
      formState.bedrooms = houseData.rooms.bedrooms;
      formState.bathrooms = houseData.rooms.bathrooms;
      formState.constructionYear = houseData.constructionYear;
      formState.description = houseData.description;

      if (houseData.image) {
        imagePreview.value = houseData.image;
        formState.image = houseData.image; // Pre-populate for validation (as a string URL)
      }
    } catch (error) {
      console.error("Failed to fetch house details:", error);
    } finally {
      isLoading.value = false;
    }
  }
});

// --- Methods ---
const goBack = () => {
  router.go(-1);
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => (imagePreview.value = e.target.result);
    reader.readAsDataURL(file);
    formState.image = file;
    if (errors.image) delete errors.image;
  }
};

const removeImage = () => {
  imagePreview.value = null;
  formState.image = null;
  validateField("image");
};

const errors = reactive({});

const validateForm = () => {
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  let isValid = true;

  if (!formState.price || isNaN(Number(formState.price))) {
    errors.price = "Price is required and must be a number";
    isValid = false;
  }

  if (!formState.bedrooms || isNaN(Number(formState.bedrooms))) {
    errors.bedrooms = "Bedrooms is required and must be a number";
    isValid = false;
  }

  if (!formState.bathrooms || isNaN(Number(formState.bathrooms))) {
    errors.bathrooms = "Bathrooms is required and must be a number";
    isValid = false;
  }

  if (!formState.size || isNaN(Number(formState.size))) {
    errors.size = "Size is required and must be a number";
    isValid = false;
  }

  if (!formState.streetName) {
    errors.streetName = "Street name is required";
    isValid = false;
  }

  if (!formState.houseNumber || isNaN(Number(formState.houseNumber))) {
    errors.houseNumber = "House number is required and must be a number";
    isValid = false;
  }

  if (!formState.zip) {
    errors.zip = "ZIP code is required";
    isValid = false;
  }

  if (!formState.city) {
    errors.city = "City is required";
    isValid = false;
  }

  if (
    !formState.constructionYear ||
    isNaN(Number(formState.constructionYear))
  ) {
    errors.constructionYear =
      "Construction year is required and must be a number";
    isValid = false;
  }

  if (!formState.hasGarage) {
    errors.hasGarage = "Please select if there is a garage";
    isValid = false;
  }

  if (!formState.description) {
    errors.description = "Description is required";
    isValid = false;
  }

  if (!formState.image) {
    errors.image = "Image is required";
    isValid = false;
  }

  return isValid;
};

const validateField = (field) => {
  validateForm();
  return !errors[field];
};
const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    // This payload is the same for both create and update
    const payload = {
      price: Number(formState.price),
      bedrooms: Number(formState.bedrooms),
      bathrooms: Number(formState.bathrooms),
      size: Number(formState.size),
      streetName: formState.streetName,
      houseNumber: Number(formState.houseNumber),
      numberAddition: formState.addition,
      zip: formState.zip,
      city: formState.city,
      constructionYear: Number(formState.constructionYear),
      hasGarage: formState.hasGarage === "Yes",
      description: formState.description,
    };

    if (isEditing.value) {
      const updatePromises = [];
      updatePromises.push(updateHouse(houseId.value, payload));
      if (formState.image instanceof File) {
        const formData = new FormData();
        formData.append("image", formState.image);

        updatePromises.push(uploadHouseImage(houseId.value, formState.image));
      }
      await Promise.all(updatePromises);

      router.push(`/`);
    } else {
    }
  } catch (error) {
    console.error("Failed to submit the form:", error);
  } finally {
    isLoading.value = false;
  }
};

const garageOptions = ["Yes", "No"];
</script>

<template>
  <div class="create-listing-page">
    <main class="content-wrapper">
      <FormHeader
        :title="isEditing ? 'Edit listing' : 'Create new listing'"
        @back="goBack"
      />

      <form @submit.prevent="submitForm" class="listing-form">
        <FormInput
          class="span-2"
          id="street-name"
          label="Street name*"
          placeholder="Enter the street name"
          v-model="formState.streetName"
          :error="errors.streetName"
          @blur="validateField('streetName')"
        />
        <FormInput
          id="house-number"
          label="House number*"
          type="number"
          placeholder="Enter house number"
          v-model="formState.houseNumber"
          :error="errors.houseNumber"
          @blur="validateField('houseNumber')"
        />
        <FormInput
          id="addition"
          label="Addition"
          placeholder="e.g. A"
          v-model="formState.addition"
        />
        <FormInput
          id="postal-code"
          label="Postal code*"
          placeholder="e.g. 1000 AA"
          v-model="formState.zip"
          :error="errors.zip"
          @blur="validateField('zip')"
        />
        <FormInput
          id="city"
          label="City*"
          placeholder="e.g. Utrecht"
          v-model="formState.city"
          :error="errors.city"
          @blur="validateField('city')"
        />

        <ImageUploader
          v-model="formState.image"
          :error="errors.image"
          @blur="validateField('image')"
        />

        <FormInput
          class="span-2"
          id="price"
          label="Price*"
          type="number"
          placeholder="e.g. €150.000"
          v-model="formState.price"
          :error="errors.price"
          @blur="validateField('price')"
        />
        <FormInput
          id="size"
          label="Size*"
          type="number"
          placeholder="e.g. 60m2"
          v-model="formState.size"
          :error="errors.size"
          @blur="validateField('size')"
        />

        <FormSelect
          id="garage"
          label="Garage*"
          :options="garageOptions"
          v-model="formState.hasGarage"
          :error="errors.hasGarage"
          @blur="validateField('hasGarage')"
        />

        <FormInput
          id="bedrooms"
          label="Bedrooms*"
          type="number"
          placeholder="Enter amount"
          v-model="formState.bedrooms"
          :error="errors.bedrooms"
          @blur="validateField('bedrooms')"
        />
        <FormInput
          id="bathrooms"
          label="Bathrooms*"
          type="number"
          placeholder="Enter amount"
          v-model="formState.bathrooms"
          :error="errors.bathrooms"
          @blur="validateField('bathrooms')"
        />
        <FormInput
          class="span-2"
          id="construction-date"
          label="Construction date*"
          type="number"
          placeholder="e.g. 1990"
          v-model="formState.constructionYear"
          :error="errors.constructionYear"
          @blur="validateField('constructionYear')"
        />

        <div class="form-group span-2">
          <label for="description">Description*</label>
          <textarea
            id="description"
            placeholder="Enter description"
            rows="5"
            v-model="formState.description"
            @blur="validateField('description')"
            :class="{ 'has-error': errors.description }"
          ></textarea>
          <span v-if="errors.description" class="error-message">{{
            errors.description
          }}</span>
        </div>

        <div class="form-actions span-2">
          <button type="submit" class="post-btn" :disabled="isLoading">
            {{
              isLoading
                ? isEditing
                  ? "UPDATING..."
                  : "POSTING..."
                : isEditing
                ? "UPDATE"
                : "POST"
            }}
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* --- General Page Styling --- */

.create-listing-page {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 20%
    ),
    url("../assets/img_background@3x.png");
  background-size: 100% 30%; 
  background-position: bottom center;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 0 1rem;
}
.content-wrapper {
  max-width: 400px;
  margin: 0 auto;
}

textarea.has-error,
.has-error {
  border-color: var(--color-primary) !important;
}
.error-message {
  color: var(--color-primary);
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
  border-color: var(--color-primary);
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
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 3rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  margin-bottom: 2rem;
}
.post-btn:hover {
  background-color: #d34835;
}

.post-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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
    padding: 2rem 11.5rem;
    margin-top: 2rem;
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
    margin-bottom: 0;
  }
}
</style>
