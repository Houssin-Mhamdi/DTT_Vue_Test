import { useRouter } from "vue-router";
import { useModal } from "./useModal";
import { deleteHouse } from "@/services/houseService";
import { ref } from "vue";
import { useHouses } from "./useHouses";
export function useHouseActions() {
  const router = useRouter();
  const { showModal, hideModal, itemToDeleteId } = useModal();
  const { fetchHouses } = useHouses();
  const isDeleting = ref(false);

  /**
   * @param houseId
   */
  function editHouse(houseId: number | string) {
    router.push({ name: "edit-listing", params: { id: houseId } });
  }

  /**
   * @param houseId
   */
  function requestDelete(houseId: number | string) {
    showModal(houseId);
  }

  const confirmDelete = async () => {
    if (!itemToDeleteId.value) {
      hideModal();
      return;
    }
    isDeleting.value = true;

    try {
      await deleteHouse(itemToDeleteId.value as number);
      await fetchHouses();
      router.push({ name: "Houses" });
    } catch (error) {
      console.error("Failed to delete the listing:", error);
    } finally {
      isDeleting.value = false;
      hideModal();
      router.push({ name: "Houses" });
    }
  };

  return {
    isDeleting,
    editHouse,
    requestDelete, // This is called by the delete icon
    confirmDelete, // This is called by the modal's "confirm" event
  };
}
