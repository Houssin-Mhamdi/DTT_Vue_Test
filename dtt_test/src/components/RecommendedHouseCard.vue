<script setup>
import { RouterLink } from "vue-router";
import bedIcon from "@/assets/ic_bed@3x.png";
import bathIcon from "@/assets/ic_bath@3x.png";
import sizeIcon from "@/assets/ic_size@3x.png";

defineProps({
  house: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="`/details/${house.id}`" class="recommended-card">
    <img :src="house.image" alt="Recommended house" class="recommended-image" />
    <div class="recommended-details">
      <h3 class="address">{{ house.address }}</h3>
      <p class="price">€ {{ house.price.toLocaleString("nl-NL") }}</p>
      <p class="location">{{ house.location }}</p>
      <div class="features">
        <span class="feature">
          <img :src="bedIcon" alt="Bedrooms" class="feature-icon" />
          {{ house.bedrooms }}
        </span>
        <span class="feature">
          <img :src="bathIcon" alt="Bathrooms" class="feature-icon" />
          {{ house.bathrooms }}
        </span>
        <span class="feature">
          <img :src="sizeIcon" alt="Size" class="feature-icon" />
          {{ house.size }} m²
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.recommended-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out;
}

.recommended-card:hover {
  transform: translateY(-2px);
}

.recommended-image {
  width: 90px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.recommended-details {
  display: flex;
  flex-direction: column;
}

.address {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.price,
.location {
  font-size: 0.8rem;
  color: #888;
  margin: 0 0 8px 0;
}

.features {
  display: flex;
  gap: 16px;
  margin-top: auto;
  font-size: 0.8rem;
  color: #555;
}

.feature {
  display: flex;
  align-items: center;
  gap: 6px;
}

.feature-icon {
  width: 14px;
  height: 14px;
}
</style>