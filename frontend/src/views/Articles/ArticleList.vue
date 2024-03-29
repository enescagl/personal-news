<template>
  <div>
    <div class="flex justify-between prose max-w-none">
      <h2>Latest News</h2>
      <div class="overflow-hidden">
        <router-link
          v-if="isUserLoggedIn && hasPermission(ADD)"
          :to="{ name: 'AddArticle' }"
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
            v-model="searchTerm"
          />
        </div>
        <div>
          <select
            class="form-select rounded-sm border-gray-300"
            name="page"
            id="page"
            v-model="currentPageNumber"
            @change="list({ page: currentPageNumber })"
          >
            <option v-for="page in totalPages" :value="page" :key="page">
              Page {{ page }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full divide-y border-gray-200">
        <EArticleCard
          v-for="item in items"
          :data="item"
          :key="item.id"
          @destroy="destroy(item.id)"
        ></EArticleCard>
      </div>
    </div>
  </div>
</template>
<script>
import EArticleCard from "@/components/EArticleCard.vue";
import IconPencil from "~icons/heroicons/pencil";
import IconMagnifyingGlass from "~icons/heroicons/magnifying-glass";
import {
  baseMixin,
  destroyMixin,
  filterMixin,
  listMixin,
} from "@/mixins/crudMixins";

import { userHasPermissionMixin } from "@/mixins/permissionMixins";

import { mapGetters } from "vuex";
import { ADD } from "@/permission-types";

export default {
  name: "article-list-page",
  mixins: [
    baseMixin,
    listMixin,
    filterMixin,
    destroyMixin,
    userHasPermissionMixin,
  ],
  components: {
    EArticleCard,
    SearchSVG: IconMagnifyingGlass,
    PenSVG: IconPencil,
  },
  data() {
    return {
      resourceName: "article",
      resourceNamePlural: "articles",
      currentPageNumber: 1,
      ADD,
    };
  },
  computed: {
    ...mapGetters("auth", ["isUserLoggedIn"]),
  },
  async mounted() {
    await this.list();
  },
};
</script>
