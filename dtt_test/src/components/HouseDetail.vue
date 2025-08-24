<script setup>
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import RecommendedHouseCard from "@/components/RecommendedHouseCard.vue";

import locationIcon from "@/assets/ic_location@3x.png";
import priceIcon from "@/assets/ic_price@3x.png";
import sizeIcon from "@/assets/ic_size@3x.png";
import constructionIcon from "@/assets/ic_construction_date@3x.png";
import bedIcon from "@/assets/ic_bed@3x.png";
import bathIcon from "@/assets/ic_bath@3x.png";
import garageIcon from "@/assets/ic_garage@3x.png";
import editIcon from "@/assets/ic_edit_white@3x.png";
import deleteIcon from "@/assets/ic_delete_white@3x.png";
import backArrowIcon from "@/assets/ic_back_white@3x.png";

const props = defineProps({
  currentHouse: {
    type: Object,
    required: true,
  },
  recommendedHouses: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

function handleEditClick() {
  emit("edit", props.currentHouse.id);
}

function handleDeleteClick() {
  emit("delete", props.currentHouse.id);
}
</script>

<template>
  <div class="detail-layout">
    <!-- Main content area -->
    <div class="main-content">
      <div class="header-image-container">
        <img :src="currentHouse.image" alt="House" class="main-image" />

        <!-- These actions are ONLY for the mobile overlay -->
        <div class="header-actions">
          <RouterLink to="/"
            ><img :src="backArrowIcon" alt="Back" class="back-arrow-icon"
          /></RouterLink>
          <div class="actions" v-if="currentHouse.madeByMe">
            <img
              :src="editIcon"
              alt="Edit"
              class="action-icon"
              @click="handleEditClick"
            />
            <img
              :src="deleteIcon"
              alt="Delete"
              class="action-icon"
              @click="handleDeleteClick"
            />
          </div>
        </div>
      </div>

      <div class="details-card">
        <div class="title-bar">
          <h1 class="address-title">{{ currentHouse.address }}</h1>

          <!-- Add actions for desktop view -->
          <div class="actions" v-if="currentHouse.madeByMe">
            <img
              :src="editIcon"
              alt="Edit"
              class="action-icon"
              @click="handleEditClick"
            />
            <img
              :src="deleteIcon"
              alt="Delete"
              class="action-icon"
              @click="handleDeleteClick"
            />
          </div>
          <!-- END OF CHANGE -->
        </div>

        <div class="info-grid">
          <span class="info-item">
            <img :src="locationIcon" alt="Location" />{{
              currentHouse.location
            }}
          </span>
          <span class="info-item">
            <img :src="priceIcon" alt="Price" />€
            {{ currentHouse.price.toLocaleString("nl-NL") }}
          </span>
          <span class="info-item">
            <img :src="sizeIcon" alt="Size" />{{ currentHouse.size }} m²
          </span>
          <span class="info-item">
            <img :src="constructionIcon" alt="Built in" />Built in
            {{ currentHouse.constructionYear }}
          </span>
          <span class="info-item">
            <img :src="bedIcon" alt="Bedrooms" />{{ currentHouse.bedrooms }}
          </span>
          <span class="info-item">
            <img :src="bathIcon" alt="Bathrooms" />{{ currentHouse.bathrooms }}
          </span>
          <span class="info-item">
            <img :src="garageIcon" alt="Garage" />{{
              currentHouse.hasGarage ? "Yes" : "No"
            }}
          </span>
        </div>

        <p class="description">{{ currentHouse.description }}</p>
      </div>
    </div>

    <!-- Sidebar for recommended houses -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Recommended for you</h2>
      <div class="recommendations-list">
        <RecommendedHouseCard
          v-for="house in recommendedHouses"
          :key="house.id"
          :house="house"
        />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.detail-layout {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  flex: 2;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
}

.header-image-container {
  position: relative;
}

.header-actions {
  display: none; /* Hidden on desktop */
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.address-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.actions {
  display: flex;
  gap: 20px;
}

.action-icon {
  width: 25px;
  height: 20px;
  cursor: pointer;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  color: #555;
  font-size: 0.9rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-item img {
  width: 18px;
  height: 18px;
}

.description {
  line-height: 1.6;
  color: #333;
  max-width: 600px;
}

.sidebar {
  flex: 1;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* --- RESPONSIVE STYLES --- */
@media (max-width: 992px) {
  .detail-layout {
    flex-direction: column;
    gap: 0;
  }

  /* HIDE the desktop actions inside the title bar on mobile */
  .title-bar .actions {
    display: none;
  }

  .main-content {
    padding: 0;
    border-radius: 0;
    background: transparent;
  }

  .main-image {
    border-radius: 0;
    margin-bottom: 0;
    max-height: 300px;
  }

  /* SHOW the header actions (overlay) on mobile */
  .header-actions {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  .header-actions .action-icon,
  .header-actions .back-arrow-icon {
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 8px;
  }

  .details-card {
    background: #fff;
    padding: 24px;
    border-radius: 24px 24px 0 0;
    margin-top: -24px;
    position: relative;
    z-index: 1;
  }

  .sidebar {
    background: #fff;
    padding: 0 24px 24px;
  }

  .address-title {
    font-size: 1.2rem;
  }
}
</style>
