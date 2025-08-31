<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Oops! It looks like the page you're looking for doesn't exist. Don't
        worry, you can always go back to the homepage.
      </p>
      <router-link to="/" class="home-link">Go to Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
  padding: 20px;
  box-sizing: border-box; 
}

.not-found-content {
  max-width: 600px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 8em;
  margin-bottom: 0.1em;
  color: #e74c3c; 
  font-weight: bold;
}

h2 {
  font-size: 2em;
  margin-top: 0;
  color: #555;
}

p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
}

.home-link {
  display: inline-block;
  padding: 12px 25px;
  background-color: #3498db; 
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #2980b9;
}

/* --- Responsive Styles --- */

/* For screens smaller than 768px */
@media (max-width: 768px) {
  h1 {
    font-size: 6em;
  }

  h2 {
    font-size: 1.8em;
  }

  p {
    font-size: 1em;
  }

  .not-found-content {
    padding: 30px;
  }
}

/* For screens smaller than 480px */
@media (max-width: 480px) {
  h1 {
    font-size: 4em;
  }

  h2 {
    font-size: 1.5em;
  }

  p {
    font-size: 0.9em;
  }

  .not-found-content {
    padding: 20px;
  }

  .home-link {
    padding: 10px 20px;
    font-size: 0.9em;
  }
}
</style>
