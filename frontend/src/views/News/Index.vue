<template>
  <div>
    <div class="flex justify-between prose max-w-none">
      <h2>Latest News</h2>
      <div class="overflow-hidden">
        <router-link
          v-if="userLoggedIn"
          :to="{ name: 'AddNews' }"
          class="block px-2 py-2 bg-gray-200 rounded-full"
        >
          <PenSVG class="w-5 h-5 text-gray-700" />
        </router-link>
      </div>
    </div>
    <div class="flex flex-col items-center space-y-4">
      <div class="flex justify-between space-x-4 w-full">
        <div class="relative w-1/2 flex-1">
          <label class="flex items-center absolute ml-2 inset-y-0" for="search">
            <SearchSVG class="w-5 h-5 text-gray-500"
          /></label>
          <input
            class="form-input w-full pl-8 rounded-sm border-gray-300"
            type="text"
            name="search"
            id="search"
            v-model="searchTerm"
          />
        </div>
        <div>
          <select
            class="form-select rounded-sm border-gray-300"
            name="page"
            id="page"
            @change="changePage"
          >
            <option v-for="page in pageCount" :value="page" :key="page">
              Page {{ page }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full divide-y border-gray-200">
        <ENewsCard
          :data="news"
          v-for="(news, idx) in allNews"
          :key="idx"
        ></ENewsCard>
      </div>
    </div>
  </div>
</template>
<script>
import ENewsCard from "@/components/ENewsCard.vue";
import PenSVG from "@/assets/svgs/pen.svg";
import SearchSVG from "@/assets/svgs/search.svg";
import debounce from "lodash.debounce";

import { mapState, mapActions } from "vuex";
export default {
  components: {
    ENewsCard,
    SearchSVG,
    PenSVG,
  },
  data() {
    return {
      allNews: [],
      pageCount: 0,
      currentPageNumber: 1,
      searchTerm: "",
    };
  },
  computed: {
    ...mapState("news", ["currentPage"]),
    userLoggedIn() {
      return JSON.parse(localStorage.getItem("userData"));
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    searchTerm: function (_newTerm, _oldTerm) {
      this.debouncedFilteredNews();
    },
  },
  methods: {
    ...mapActions("news", ["getPage", "getPageWithFilter"]),
    async changePage(pageNumber) {
      this.currentPageNumber = pageNumber.target.value;
      await this.getPage(this.currentPageNumber);
      console.log(this.allNews);
    },
    async runFilter() {
      await this.getPageWithFilter({
        page: this.currentPageNumber,
        filter: this.searchTerm,
      });
    },
  },

  async mounted() {
    await this.getPage(this.currentPageNumber);
    this.allNews = this.currentPage.results;
    this.pageCount = this.currentPage.total_page;
  },
  created() {
    this.debouncedFilteredNews = debounce(this.runFilter, 500);
  },
};
</script>
