<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHouses } from "@/composables/useHouses";
import HouseDetail from "@/components/HouseDetail.vue";
import StatusDisplay from "@/components/StatusDisplay.vue";
import BackLink from "@/components/BackLink.vue";
import { useHouseDetails } from "@/composables/useHouseDetails";
import { useHouseActions } from "@/composables/useHouseActions";
import { useModal } from "@/composables/useModal";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

const route = useRoute();
const router = useRouter();
const { houses, isLoading, errorMessage } = useHouses();
const houseId = computed(() => route.params.id);
const { currentHouse, recommendedHouses } = useHouseDetails(houses, houseId);
const { isDeleting, editHouse, requestDelete, confirmDelete } =
  useHouseActions();
const { isModalVisible, hideModal } = useModal();
const item = ref(null);

onMounted(() => {
  const houseId = route.params.id;
  item.value = houses.value.find((house) => house.id == houseId);
  if (!item.value) {
    router.replace({ name: "NotFound", params: { catchAll: "*" } });
  }
});
</script>

<template>
  <div class="page-container">
    <div class="desktop-back-link">
      <BackLink />
    </div>
    <StatusDisplay :is-loading="isLoading" :error-message="errorMessage" />
    <HouseDetail
      v-if="!isLoading && currentHouse"
      :current-house="currentHouse"
      :recommended-houses="recommendedHouses"
      @edit="editHouse"
      @delete="requestDelete"
    />
  </div>
  <ConfirmationModal
    :show="isModalVisible"
    @confirm="confirmDelete"
    @cancel="hideModal"
  />
</template>

<style scoped>
.page-container {
  padding: 40px;
  background-color: var(--color-background-1);
  font-family: "Montserrat", sans-serif;
}

/* --- RESPONSIVE STYLES --- */
@media (max-width: 992px) {
  .page-container {
    padding: 0;
  }

  .desktop-back-link {
    display: none;
  }
}
</style>
