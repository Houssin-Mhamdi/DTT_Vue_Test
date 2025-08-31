<script setup>
import { defineProps, defineEmits } from "vue";
import editIcon from "@/assets/ic_edit@3x.png";
import heart from "@/assets/heart.png";
import deleteIcon from "@/assets/ic_delete@3x.png";
import bedIcon from "@/assets/ic_bed@3x.png";
import bathIcon from "@/assets/ic_bath@3x.png";
import sizeIcon from "@/assets/ic_size@3x.png";
import { RouterLink } from "vue-router";
import { useModal } from "@/composables/useModal";
import { useHouseActions } from "@/composables/useHouseActions";
import ConfirmationModal from "./ConfirmationModal.vue";

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["delete"]);

const emitDelete = () => {
  console.log("Deleting house with ID:", props.house.id);
  emit("delete", props.house.id);
};
</script>

<template>
  <div class="house-card">
    <!-- Overlay RouterLink -->
    <RouterLink
      :to="`/details/${house.id}`"
      class="card-overlay-link"
    ></RouterLink>

    <!-- House Image -->
    <img :src="house.image" alt="House image" class="house-image" />

    <!-- House Details -->
    <div class="house-details">
      <h2 class="address">{{ house.address }}</h2>
      <p class="price">€ {{ house.price.toLocaleString("nl-NL") }}</p>
      <p class="location">{{ house.location }}</p>
      <div class="features">
        <span class="feature">
          <!-- Bed Icon Image -->
          <img :src="bedIcon" alt="Bedrooms" class="feature-icon" />
          {{ house.bedrooms }}
        </span>
        <span class="feature">
          <!-- Bath Icon Image -->
          <img :src="bathIcon" alt="Bathrooms" class="feature-icon" />
          {{ house.bathrooms }}
        </span>
        <span class="feature">
          <!-- Size Icon Image -->
          <img :src="sizeIcon" alt="Size" class="feature-icon" />
          {{ house.size }} m2
        </span>
      </div>
    </div>

    <!-- Action Icons -->
    <div class="house-actions">
      <RouterLink :to="`/edit/${house.id}`">
        <button class="action-btn">
          <img v-if="house.madeByMe" :src="editIcon" alt="Edit" />
        </button>
      </RouterLink>
      <button class="action-btn">
        <img
          v-if="house.madeByMe"
          @click="emitDelete"
          :src="deleteIcon"
          alt="Delete"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.house-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  background-color: var(--color-background-2);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  position: relative;
}
.card-overlay-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Make sure it's above the card content but below actions */
}

.card-link {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  flex-grow: 1;
}

.house-image {
  width: 130px;
  height: 130px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.house-details {
  flex-grow: 1;
}

.address {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.price {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.location {
  font-size: 0.9rem;
  color: #a9a9a9;
  margin: 0 0 16px 0;
}

.features {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #a9a9a9;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.feature-icon {
  width: 20px;
  height: 20px;
}

.house-actions {
  display: flex;
  gap: 15px;
  position: relative; /* Essential to make action buttons clickable on top of the overlay */
  z-index: 2; /* Make sure actions are above the overlay */
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 3;
}
.action-btn img {
  width: 18px;
  height: 18px;
}
/* --- RESPONSIVE STYLES for mobile --- */
@media (max-width: 767px) {
  .house-card {
    gap: 12px;
    padding: 9px;
  }

  .house-image {
    width: 100px;
    height: 100px;
  }

  .address {
    font-size: 1rem;
  }

  .price {
    font-size: 0.9rem;
  }

  .location {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }

  .features {
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .feature {
    font-size: 0.8rem;
    gap: 6px;
  }

  .house-actions {
    gap: 10px;
  }

  .action-btn img {
    width: 16px;
    height: 16px;
  }
}
</style>
