<script setup>
import { RouterView, RouterLink } from "vue-router";

import "./assets/main.css";

// import { ref } from "vue";

// const counter = ref(0);
</script>

<template>
  <div class="container flex">
    <nav class="nav flex">
      <RouterLink active-class="active" to="/">Home</RouterLink>
      <RouterLink active-class="active" to="/about">About</RouterLink>
    </nav>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: "AltschoolExams",
  components: {},
  data() {
    return {
      name: "Martins",
      courses: ["Programming", "Social Science"],
      repos: [],
    };
  },
};
</script>

<style scoped>
.active {
  font-weight: 700;
  color: brown;
}

.container {
  flex-direction: column;
}
</style>
