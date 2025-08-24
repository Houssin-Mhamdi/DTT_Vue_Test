<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <div class="navbar-logo">
          <RouterLink to="/">
            <img
              src="../assets/img_logo_dtt@3x.png"
              alt="Dtt - Company Logo"
              class="logo-image"
            />
          </RouterLink>
        </div>
        <ul class="nav-menu">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" active-class="active"
              >Houses</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" active-class="active"
              >About</RouterLink
            >
          </li>
        </ul>
      </div>
      <div class="navbar-right"></div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--color-background-2);
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid #f3f3f3;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.navbar-container {
  display: flex;

  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo a {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 45px;
  width: auto;
}

.nav-menu {
  display: flex;
  list-style: none;
  text-align: center;
  margin: 0;
  margin-left: 30px;
  padding: 0;
}

.nav-item {
  height: 80px;
}

.nav-link {
  color: #888888;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
  height: 100%;
  cursor: pointer;
}

.nav-link.active {
  color: var(--color-primary-dark);
  font-weight: bold;
}

.nav-link:hover {
  color: var(--color-primary-dark);
  transition: all 0.2s ease-out;
}
@media (max-width: 767px) {
  .navbar {
    display: none;
  }
}
</style>
