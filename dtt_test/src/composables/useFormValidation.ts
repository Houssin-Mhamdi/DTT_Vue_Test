import { ref, computed } from "vue";
import { validate } from "../utils/validationRules.js";

export function useFormValidation(initialFormState: Record<string, string>) {
  const formData = ref({ ...initialFormState });

  // Create an initial errors object with empty strings for each field
  const initialErrors = Object.keys(initialFormState).reduce(
    (acc: { [key: string]: string }, key) => {
      acc[key] = "";
      return acc;
    },
    {}
  );
  const errors = ref(initialErrors);

  // Validates a single field and updates the reactive 'errors' object.
  const validateField = (field: string) => {
    const value = formData.value[field];
    errors.value[field] = validate(field, value);
  };

  const validateForm = () => {
    Object.keys(formData.value).forEach(validateField);
    // Returns true if there are no error messages, false otherwise.
    return isFormValid.value;
  };

  const isFormValid = computed(() => {
    return Object.values(errors.value).every((error) => !error);
  });

  return {
    formData,
    errors,
    validateField,
    validateForm,
    isFormValid,
  };
}
