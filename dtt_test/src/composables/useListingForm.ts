import type { Ref } from "vue";
import type { Router } from "vue-router";
import { createHouse, uploadHouseImage } from "@/services/houseService";
import type { HouseFormData, NewHousePayload } from "@/types";

interface UseListingFormParams {
  formData: Ref<HouseFormData>;
  imagePreview: Ref<string | null>;
  isLoading: Ref<boolean>;
  validateForm: () => boolean;
  validateField: (field: keyof HouseFormData) => void;
  router: Router;
}

/**
 * @param {UseListingFormParams} params 
 * @returns 
 */
export function useListingForm({
  formData,
  imagePreview,
  isLoading,
  validateForm,
  validateField,
  router,
}: UseListingFormParams) {
  const garageOptions: Readonly<string[]> = ["Yes", "No"];

  const goBack = (): void => {
    router.back();
  };

  const handleImageUpload = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      formData.value.image = file;
      imagePreview.value = URL.createObjectURL(file);
      validateField("image");
    }
  };

  const removeImage = (): void => {
    formData.value.image = null;
    imagePreview.value = null;

    const fileInput = document.getElementById(
      "house-image"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }
    validateField("image");
  };

  const submitForm = async (): Promise<void> => {
    if (!validateForm()) {
      console.warn("Validation failed. Form submission cancelled.");
      return;
    }

    isLoading.value = true;

    try {
      const housePayload: NewHousePayload = {
        price: Number(formData.value.price),
        bedrooms: Number(formData.value.bedrooms),
        bathrooms: Number(formData.value.bathrooms),
        size: Number(formData.value.size),
        streetName: formData.value.streetName,
        houseNumber: Number(formData.value.houseNumber),
        numberAddition: formData.value.numberAddition,
        zip: formData.value.zip,
        city: formData.value.city,
        constructionYear: Number(formData.value.constructionYear),
        hasGarage: formData.value.hasGarage === "Yes",
        description: formData.value.description,
      };

      const createResponse = await createHouse(housePayload);
      const newHouseId = createResponse.data.id;

      if (newHouseId && formData.value.image) {
        await uploadHouseImage(newHouseId, formData.value.image);
      }

      setTimeout(() => {
        router.push(`/details/${newHouseId}`);
      }, 2000);
    } catch (error) {
      isLoading.value = false;
    }
  };

  return {
    garageOptions,
    goBack,
    handleImageUpload,
    removeImage,
    submitForm,
  };
}
