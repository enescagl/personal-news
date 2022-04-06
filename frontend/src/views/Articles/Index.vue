<template>
  <div>
    <div class="flex justify-between prose max-w-none">
      <h2>Latest News</h2>
      <div class="overflow-hidden">
        <router-link
          v-if="isUserLoggedIn"
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
            <SearchSVG class="w-5 h-5 text-gray-500" />
          </label>
          <input
            class="form-input w-full pl-8 rounded-sm border-gray-300"
            type="text"
            name="search"
            id="search"
            v-model="headingSearchTerm"
          />
        </div>
        <div>
          <select
            class="form-select rounded-sm border-gray-300"
            name="page"
            id="page"
            v-model="currentPageNumber"
            @change="getPageWithFilter({ page: currentPageNumber, filter: {} })"
          >
            <option v-for="page in pageCount" :value="page" :key="page">
              Page {{ page }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full divide-y border-gray-200">
        <EArticleCard
          v-for="(item, idx) in items"
          :data="item"
          :key="idx"
          @remove="remove($event)"
        ></EArticleCard>
      </div>
    </div>
  </div>
</template>
<script>
import EArticleCard from "@/components/EArticleCard.vue";
import PenSVG from "@/assets/svgs/pen.svg";
import SearchSVG from "@/assets/svgs/search.svg";
import { debounce } from "lodash";

import { mapState } from "vuex";

export default {
  components: {
    EArticleCard,
    SearchSVG,
    PenSVG,
  },
  data() {
    return {
      items: [],
      pageCount: 0,
      totalItems: 0,
      maxPageSize: 10,
      headingSearchTerm: "",
      currentPageNumber: 1,
    };
  },
  computed: {
    ...mapState("layout", ["isUserLoggedIn"]),
    userLoggedIn() {
      return JSON.parse(localStorage.getItem("userData"));
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    searchTerm: function () {
      this.debouncedFilteredNews();
    },
  },
  methods: {
    async getPageWithFilter({ page, filters }) {
      // const filters = {
      //   heading: this.searchTerm,
      // };
      let queryString = "";
      for (const filterKey in filters) {
        if (filters[filterKey]) {
          queryString += `&${filterKey}=filter[filterKey]`;
        }
      }
      const response = (
        await this.$axios.get(`/articles/?page=${page}${queryString}`)
      ).data;
      this.items = [...response.results];
      this.maxPageSize = response.max_page_size;
      this.totalItems = response.total;
      this.totalPages = response.num_pages;
    },
    resetFilters() {
      this.headingSearchTerm = "";
    },
    async changePage(pageNumber) {
      this.currentPageNumber = pageNumber.target.value;
      await this.getPageWithFilter({
        page: this.currentPageNumber,
        filter: {},
      });
    },
    async remove(id) {
      await this.$axios.delete(`/articles/${id}/`);
    },
    async runFilter() {
      if (this.searchTerm) {
        await this.getPageWithFilter({
          page: this.currentPageNumber,
          filter: this.searchTerm,
        });
      } else {
        await this.getPageWithFilter({
          page: this.currentPageNumber,
          filter: {},
        });
      }
    },
  },
  async mounted() {
    await this.getPageWithFilter({ page: this.currentPageNumber, filter: {} });
  },
  created() {
    this.debouncedFilteredNews = debounce(async () => {
      await this.runFilter();
    }, 500);
  },
};
</script>
