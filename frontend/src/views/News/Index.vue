<template>
  <div>
    <div class="flex justify-between prose">
      <h2>Latest News</h2>
      <div class="overflow-hidden">
        <router-link
          :to="{ name: 'AddNews' }"
          exact
          class="block px-2 py-2 bg-gray-200 rounded-full"
        >
          <PenSVG class="w-5 h-5 text-gray-700" />
        </router-link>
      </div>
    </div>
    <div class="flex flex-col items-center space-y-4">
      <div class="flex divide-x divide-gray-300 rounded-sm overflow-hidden">
        <div
          class="w-8 py-0.5 text-center text-lg bg-gray-100 text-gray-700"
          v-for="page in pageCount"
          :key="page"
        >
          {{ page }}
        </div>
      </div>
      <div class="flex flex-wrap">
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

import { mapState, mapActions } from "vuex";
export default {
  components: {
    ENewsCard,
    PenSVG,
  },
  data() {
    return {
      allNews: [],
      pageCount: [],
      pageNumber: 0,
    };
  },
  computed: {
    ...mapState("news", ["currentPage"]),
  },
  methods: {
    ...mapActions("news", ["getPage", "getSingle"]),
  },
  async mounted() {
    await this.getPage(1);
    this.allNews = this.currentPage.data.results;
    this.pageCount = this.currentPage.data.count / 10;
  },
};
</script>
