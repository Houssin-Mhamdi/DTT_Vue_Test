import { ref, readonly } from 'vue';

const isModalVisible = ref(false);
const itemToDeleteId = ref<string | number | null>(null);


export function useModal() {
  function showModal(id: string | number) {
    itemToDeleteId.value = id;
    isModalVisible.value = true;
   
  }

  function hideModal() {
    isModalVisible.value = false;
    itemToDeleteId.value = null;
  }

  return {
    isModalVisible: readonly(isModalVisible),
    itemToDeleteId: readonly(itemToDeleteId),
    showModal,
    hideModal,
  };
}