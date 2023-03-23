<template>
  <div class="container">
    <div class="error-image">
      <img src="#" alt="404 Page Not Found" />
    </div>
    <h1>Oops! Page not found.</h1>
    <p>We couldn't find the page you were looking for.</p>
    <router-link to="/">Return to Home</router-link>
  </div>
</template>

<script>
// console.log(import.meta.env.BASE_URL);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.error-image {
  margin-bottom: 30px;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  margin-bottom: 30px;
}

router-link {
  text-decoration: none;
  font-size: 18px;
  color: #fff;
  background-color: #3f51b5;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.2s ease;
}

router-link:hover {
  background-color: #1a237e;
}
</style>
