<script setup>
import dttLogo from "@/assets/img_logo_dtt@3x.png";
</script>
<template>
  <div class="page-container">
    <div class="content-wrapper">
      <h1 class="mobile-header">About</h1>

      <!-- Main content sections -->
      <section class="content-section">
        <h2>About DTT Real Estate</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      <section class="content-section">
        <h2>Design and Development</h2>
        <div class="developer-info">
          <img :src="dttLogo" alt="DTT Logo" class="developer-logo" />
          <div class="developer-text">
            <p class="by-line">By DTT</p>
            <a
              href="https://www.d-tt.nl"
              target="_blank"
              rel="noopener noreferrer"
              class="website-link"
              >www.d-tt.nl</a
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: var(--color-background-1); 
  min-height: 100vh;
  padding: 60px 20px; 
  font-family: "Montserrat", sans-serif;
  color: #333;
}

.content-wrapper {
  max-width: 900px; 
  width: 100%;
  margin: 0 auto; 
}

.mobile-header {
  display: none;
}

.content-section {
  margin-bottom: 40px;
}
.content-section:last-of-type {
  margin-bottom: 0;
}

h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  line-height: 1.7;
  color: #555; 
  margin-bottom: 1.5em;
}

.developer-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.developer-logo {
  width: 180px; 
  height: auto;
}

.developer-text .by-line {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.developer-text .website-link {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.developer-text .website-link:hover {
  text-decoration: underline;
}

/* --- RESPONSIVE STYLES for mobile --- */
@media (max-width: 767px) {
  .page-container {
    padding: 25px 15px; 
  }

  /* Show the mobile header */
  .mobile-header {
    display: block;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.1rem;
  }

  p {
    font-size: 0.95rem;
  }

  .developer-logo {
    width: 120px; 
  }
}
</style>
