//
<template>
  <div v-if="repository">
    <h2>Repository Details</h2>
    <p>{{ repository.id }}</p>
  </div>

  <div v-else class="not-repo-datials"></div>
</template>

//
<script setup>
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

console.log(route.params);
</script>

<script>
export default {
  data() {
    return {
      repository: {},
      msg: "Welcome",
    };
  },
  async created() {
    const { repoName } = this.$route.params;
    const username = "gmcodes20";
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repoName}`
    );
    this.repository = response.data;
  },
};
</script>
