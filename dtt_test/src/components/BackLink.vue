<script setup>
import { useRouter } from "vue-router";
import backArrowIcon from "@/assets/ic_back_grey@3x.png";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="header-container">
    <div class="back-link" @click="goBack" role="button" tabindex="0">
      <img :src="backArrowIcon" alt="Back" class="back-icon" />
      <span>Back to overview</span>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  max-width: 1200px;
  margin: 30px auto 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
}

.back-icon {
  width: 20px;
  height: 20px;
}
</style>
