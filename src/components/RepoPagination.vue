<template>
  <div>
    <div class="cards grid">
      <div class="card" v-for="repo in paginatedRepos" :key="repo.id">
        <div class="card-details flex">
          <div class="card-details-icon">
            <i class="fa-solid fa-database"></i>
          </div>

          <div class="card-details-text">
            <div class="card-details-text-flex flex">
              <h2 class="repo-title">{{ repo.name }}</h2>
            </div>

            <div class="card-details-text-flex flex">
              <i class="fa-solid fa-circle-info"></i>
              <p v-if="repo.description">{{ repo.description }}</p>
              <p v-else>No description</p>
            </div>
            <div v-if="repo.language" class="card-details-text-flex flex">
              <i class="fa-solid fa-laptop-code"></i>
              <p>{{ repo.language }}</p>
            </div>

            <button class="btn btn-primary" :id="repo.id" @click="repoDetails">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="paginationBtns">
      <button
        @click="updatePage"
        v-for="item in numbersOfButtons"
        :key="item.index"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepoPagination",
  props: { repos: Array, loading: Boolean },
  data() {
    return {
      // item: 123,
      currentPage: 1, //The page the user is currently viewing
      pageSize: 10, //Number of repos in a page
      totalRepos: this.repos?.length,
    };
  },

  computed: {
    numbersOfButtons() {
      let button = [];
      for (let index = 1; index <= this.totalPageCount; index++) {
        button.push(index);
      }
      return button;
    },
    paginatedRepos() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.repos?.slice(startIndex, startIndex + this.pageSize);
    },

    totalPageCount() {
      return Math.ceil(this.totalRepos / this.pageSize);
    },
  },
};
</script>
