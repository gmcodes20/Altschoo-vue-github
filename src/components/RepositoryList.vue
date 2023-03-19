<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div class="repositories">
    <h3 style="margin-bottom: 1rem; color: brown; font-size: 2rem">
      {{ `${username}'s Repository` }}
    </h3>

    <div v-if="loading">
      <LoadingPage :isLoading="loading" />
    </div>

    <div v-else>
      <div class="cards grid">
        <div
          @click="router.push(`./RepoDetails/${repo.name}`)"
          class="card repo-list-card"
          v-for="repo in paginatedRepos"
          :key="repo.id"
        >
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
                <p v-if="repo.description">
                  {{ repo.description }}
                </p>
                <p v-else>No description</p>
              </div>
              <div v-if="repo.language" class="card-details-text-flex flex">
                <i class="fa-solid fa-laptop-code"></i>
                <p>{{ repo.language }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-btns flex">
        <button class="btn pagination-btn" @click="updatePage" :id="1">
          First
        </button>
        <!-- <button
          :disabled="currentPage < 2"
          class="btn pagination-btn"
          :id="currentPage"
          @click="prev"
        >
          Prev
        </button> -->

        <button
          class="btn pagination-btn"
          @click="updatePage"
          v-for="(item, index) in numbersOfButtons"
          :key="index"
          :id="item"
          :class="{ active: activeIndex === index }"
        >
          {{ item }}
        </button>
        <!-- <button
          class="btn pagination-btn"
          @click="next"
          :id="currentPage"
          :disabled="currentPage == anotherTotalPage"
        >
          Next
        </button> -->
        <!-- <button
          :id="currentPage"
          @click="updatePage"
          class="btn pagination-btn"
          :disabled="currentPage == anotherTotalPage"
        >
          Last
        </button> -->
      </div>
    </div>

    <!-- <p>{{ repos }}</p> -->
    <p class="request-error" v-if="repoErro">{{ repoErro }}</p>
  </div>
</template>

<script>
// import RepoPagination from "./RepoPagination.vue";
import LoadingPage from "./LoadingPage.vue";
import axios from "axios";

export default {
  name: "RepositoryList",

  data() {
    return {
      repos: [],
      repoErro: "",
      loading: false,
      username: "gmcodes20",
      currentPage: 1, //The page the user is currently viewing
      pageSize: 9, //Number of repos in a page
      // btnId: totalPageCount,
      activeIndex: 0,
      anotherTotalPage: "",
      // lastBtn: totalPageCount.length
    };
  },
  methods: {
    updatePage(event) {
      this.currentPage = Number(event.target.id);
      this.activeIndex = this.currentPage - 1;
      console.log(this.activeIndex);
      //
    },

    prev() {
      this.currentPage > 1 ? this.currentPage-- : this.currentPage;
      this.anotherTotalPage = this.totalPageCount;
    },
    next(e) {
      console.log(e.target);
      //   this.currentPage > this.repos.length
      //     ? this.currentPage++
      //     : this.currentPage;
      this.currentPage + 1;
    },
  },

  computed: {
    numbersOfButtons() {
      let buttons = [];

      for (let index = 1; index <= this.totalPageCount; index++) {
        buttons.push(index);
      }

      return buttons;
    },
    paginatedRepos() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.repos?.slice(startIndex, startIndex + this.pageSize);
    },

    totalPageCount() {
      const totalRepos = this?.repos.length; // Total Numbers of repositories

      return Math.ceil(totalRepos / this.pageSize);
    },
  },
  async mounted() {
    const username = this.username;
    let githubClientId;
    let githubClientSecret;
    // let githubPersonalAccessToken;
    if (process.env.NODE_ENV !== "development") {
      // console.log(process.env.NODE_ENV);
      githubClientId = process.env.GITHUB_CLIENT_ID;
      githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
      // githubPersonalAccessToken =        process.env.VUE_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
    } else {
      githubClientId = process.env.VUE_APP_GITHUB_CLIENT_ID;
      githubClientSecret = process.env.VUE_APP_GITHUB_CLIENT_SECRET;
      // githubPersonalAccessToken = process.env.VUE_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
    }
    this.loading = true;
    try {
      await axios
        .get(
          ` https://api.github.com/users/${username}/repos?per_page=100&client_id=${githubClientId}&secret=${githubClientSecret}`
        )
        .then((response) => {
          this.repos = response.data;
        });
      console.log(this.repos);
    } catch (error) {
      this.repoErro = error;
      // console.log(error);
    }
    //
    // .then((res) => res.data)
    // .then((data) => (this.repos = data));
    this.loading = false;
  },
  components: { LoadingPage },
};
</script>

<style scoped>
.repo-title {
  overflow: hidden;
  font-family: var(--ff-heading);
  font-weight: 700;
  font-style: italic;
  font-size: 1.1rem;
  text-overflow: ellipsis;
}

.repo-list-card {
  cursor: pointer;
}
.card-details {
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
}

.card-details-text-flex {
  --flex-gap: 0.7rem;
  align-items: flex-start;
  /* justify-content: space-between; */
}

.card-details-icon i {
  font-size: 5rem;
}
.card-details-text > * {
  padding-bottom: 0.8em;
}

.pagination-btns {
  --flex-gap: 0.4em;
  margin: 2rem;
  align-items: center;
  justify-content: center;
}
.pagination-btn {
  border-radius: 50%;
  padding: 1em;
  transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.pagination-btn:hover {
  background-color: brown;
  color: #fff;
}

.active {
  color: whitesmoke;
  background-color: rgb(134, 24, 24);
}

btn:disabled:hover {
  background-color: unset;
}
</style>
