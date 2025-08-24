<script setup>
import { ref, watch, computed, onMounted } from "vue";
import HouseCard from "@/components/HouseCard.vue";
import houseImg from "@/assets/img_placeholder_house@3x.png";
import SortToggle from "@/components/SortToggle.vue";
import SearchToggle from "@/assets/ic_search@3x.png";
import SearchBar from "@/components/SearchBar.vue";
import HousesHeader from "@/components/HousesHeader.vue";
import ResultsIndicator from "@/components/ResultsIndicator.vue";
import { useRouter } from "vue-router";
import { debounce } from "@/utils/debounce.ts";
import { useHouses } from "@/composables/useHouses";
import { useSearchResults } from "@/composables/useSearchResults";
import NoResults from "@/components/NoResults.vue";
import StatusDisplay from "@/components/StatusDisplay.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { useHouseActions } from "@/composables/useHouseActions";
import { useModal } from "@/composables/useModal";

const router = useRouter();
const sortBy = ref("price");
const searchQuery = ref("");
const rawSearchQuery = ref("");
const debouncedSearchQuery = ref("");
const houseIdToDelete = ref(null);
// --- NEW STATE ---
const showOnlyMadeByMe = ref(false); // State for the new filter

const { isDeleting, editHouse, requestDelete, confirmDelete } =
  useHouseActions();
const { isModalVisible, hideModal } = useModal();
const { houses, isLoading, errorMessage } = useHouses();
const handleCreate = () => {
  router.push("/create");
};

watch(
  rawSearchQuery,
  debounce((newValue) => {
    debouncedSearchQuery.value = newValue;
  }, 300)
);

// --- UPDATED COMPUTED PROPERTY ---
const filteredHouses = computed(() => {
  let housesToFilter = houses.value;

  // 1. Apply the 'madeByMe' filter first if it's active
  if (showOnlyMadeByMe.value) {
    housesToFilter = housesToFilter.filter((house) => house.madeByMe === true);
  }

  // 2. Then, apply the search query filter on the result
  if (!debouncedSearchQuery.value) {
    return housesToFilter;
  }

  const query = debouncedSearchQuery.value.toLowerCase();
  return housesToFilter.filter(
    (house) =>
      house.address.toLowerCase().includes(query) ||
      house.location.toLowerCase().includes(query) ||
      house.price.toString().includes(query) ||
      house.size.toString().includes(query)
  );
});

const filteredAndSortedHouses = computed(() => {
  // It's a copy to avoid mutating the result.
  const housesToSort = [...filteredHouses.value];

  if (sortBy.value === "price") {
    return housesToSort.sort((a, b) => a.price - b.price || a.size - b.size);
  }

  if (sortBy.value === "size") {
    return housesToSort.sort((a, b) => a.size - b.size || a.price - b.price);
  }

  return housesToSort;
});

const showNoResults = computed(() => {
  return !isLoading.value && filteredAndSortedHouses.value.length === 0;
});

const { resultsCountMessage } = useSearchResults(
  debouncedSearchQuery,
  filteredHouses
);
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper">
      <HousesHeader @create="handleCreate" />
      <div class="controls-container">
        <SearchBar :icon="SearchToggle" v-model="rawSearchQuery" />
        <div class="filter-sort-group">
          <!-- NEW: Button to toggle the madeByMe filter -->
          <button
            @click="showOnlyMadeByMe = !showOnlyMadeByMe"
            :class="{ active: showOnlyMadeByMe }"
            class="made-by-me-btn"
          >
            Made by me
          </button>
          <SortToggle v-model="sortBy" />
        </div>
      </div>

      <ResultsIndicator :message="resultsCountMessage" />

      <StatusDisplay
        :is-loading="isLoading"
        :error-message="errorMessage"
        loading-text="Loading listings..."
      />

      <main class="house-list" v-if="!isLoading && !errorMessage">
        <HouseCard
          v-for="house in filteredAndSortedHouses"
          :key="house.id"
          :house="house"
          @delete="requestDelete"
        />
        <ConfirmationModal
          :show="isModalVisible"
          @confirm="confirmDelete"
          @cancel="hideModal"
        />
        <NoResults v-if="showNoResults && debouncedSearchQuery" />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* --- EXISTING STYLES --- */
.page-container {
  background-color: var(--color-background-1);
  min-height: 100vh;
  padding: 40px 20px;
  font-family: "Montserrat", sans-serif;
}
.no-results {
  text-align: center;
  padding: 40px;
  color: #888;
}
.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.controls-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
}

/* --- NEW STYLES --- */
.filter-sort-group {
  display: flex;
  align-items: center;
  gap: 1rem; /* Adjust gap as needed */
}

.made-by-me-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background-color: #e8e8e8; /* Default color */
  color: #333;
  transition: background-color 0.2s, color 0.2s;
}

.made-by-me-btn.active {
  background-color: var(--color-primary); /* Active color */
  color: #fff;
}
/* --- RESPONSIVE STYLES for mobile --- */
@media (max-width: 767px) {
  .page-container {
    padding: 16px 12px;
  }
  .controls-container {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .house-list {
    display: grid;
    grid-template-columns: 1fr;
  }
  .filter-sort-group {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
