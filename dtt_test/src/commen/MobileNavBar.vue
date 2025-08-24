<script setup>
import homeIconInactive from "@/assets/ic_mobile_navigarion_home@3x.png";
import homeIconActive from "@/assets/ic_mobile_navigarion_home_active@3x.png";
import aboutIconInactive from "@/assets/ic_mobile_navigarion_info@3x.png";
import aboutIconActive from "@/assets/ic_mobile_navigarion_info_active@3x.png";
</script>

<template>
  <nav class="mobile-navbar">
    <div class="mobile-nav-container">
      <!-- Home Link -->
      <RouterLink to="/" class="nav-link">
        <template v-slot="{ isActive }">
         
          <img
            :src="isActive ? homeIconActive : homeIconInactive"
            alt="Home"
            class="nav-image"
          />
        </template>
      </RouterLink>

      <!-- About Link -->
      <RouterLink to="/about" class="nav-link">
        <template v-slot="{ isActive }">
          <img
            :src="isActive ? aboutIconActive : aboutIconInactive"
            alt="About"
            class="nav-image"
          />
        </template>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.mobile-navbar {
  display: none;
}

/* --- Mobile Styles --- */
@media (max-width: 767px) {
  .mobile-navbar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background-color: var(--color-background-2);
    border-top: 1px solid #f0f0f0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
    z-index: 1000;
  }

  .mobile-nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-image {
    width: 28px;
    height: 28px;
    transition: transform 0.2s ease;
  }

  .router-link-exact-active .nav-image {
    transform: scale(1.1);
  }
}
</style>
