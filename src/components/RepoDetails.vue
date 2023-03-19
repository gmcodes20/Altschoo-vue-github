//
<template>
  <div class="repository-details" v-if="repository">
    <h2>Repository Details</h2>

    <div v-if="loading">
      <LoadingPage :isLoading="loading" />
    </div>

    <div v-else class="repo card">
      <div class="details flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7zm-6-2v-2h6v2h6v-3H6.5a1.5 1.5 0 0 0 0 3H7zM7 5v2h2V5H7zm0 3v2h2V8H7zm0 3v2h2v-2H7z"
          />
        </svg>
        <p>{{ repository.name }}</p>
      </div>

      <div
        style="text-align: center; color: brown"
        v-if="repository.description"
        class="description"
      >
        {{ repository.description }}
      </div>

      <div class="other-details">
        <div class="visibility">Visibility: {{ repository.visibility }}</div>

        <div v-if="repository.license" class="license">
          License: {{ repository.license.name }}
        </div>

        <div v-if="repository.language" class="language">
          Language: {{ repository.language }}
        </div>

        <p>{{ repository.id }}</p>
      </div>
    </div>
  </div>

  <div v-if="errorMessage" class="request-error">
    <p>{{ errorMessage.name }}:</p>
    <p>{{ errorMessage.message }}</p>
  </div>
</template>

//
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import LoadingPage from "./LoadingPage.vue";
const route = useRoute();

console.log(route.params);
</script>

<script>
export default {
  components: { LoadingPage },
  data() {
    return {
      repository: {},
      loading: false,
      errorMessage: "",
    };
  },
  async created() {
    const { repoName } = this.$route.params;
    const username = "gmcodes20";

    try {
      this.loading = true;
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}`
      );
      this.repository = response.data;

      this.loading = false;
      console.log(this.repository);
    } catch (error) {
      this.errorMessage = error;
    }
  },
};
</script>

<style scoped>
.repository-details {
  max-width: 80%;
  margin-inline: auto;
}
.details {
  --flex-gap: 0.8rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}
.details p {
  font-size: 1.2rem;
  font-weight: 700;
}

.details svg {
  fill: blue;
}
</style>
