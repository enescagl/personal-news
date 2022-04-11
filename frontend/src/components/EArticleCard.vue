<template>
  <div class="py-2 flex items-center justify-between">
    <div class="flex flex-col justify-between space-y-4 w-3/4">
      <router-link
        class="no-underline space-y"
        :to="{ name: 'ArticleDetail', params: { id: data.id } }"
      >
        <span class="text-sm font-medium">{{ data.heading }}</span>
        <div class="truncate text-xs text-gray-500">
          {{ data.short_description }}
        </div>
      </router-link>
      <div>
        <div class="flex justify-between">
          <div class="text-xs font-light text-gray-400">
            {{ getHumanReadableDate(data.created_at) }}
          </div>
          <ENavDropdown v-if="isUserLoggedIn">
            <template slot="button">
              <MoreVerticalSVG class="text-gray-500 w-4 h-4" />
            </template>
            <template v-slot:content>
              <div class="border-b border-gray-500 md:hidden">
                {{ data.heading }}
              </div>
              <ul class="pt-1 md:pt-0">
                <li
                  v-if="hasPermission(CHANGE, 'article')"
                  class="px-2 py-1 -mx-2 hover:bg-gray-200 text-gray-900"
                >
                  <router-link
                    class="text-center block w-full"
                    :to="{ name: 'EditArticle', params: { id: data.id } }"
                    >Edit
                  </router-link>
                </li>
                <li
                  v-if="hasPermission(DELETE, 'article')"
                  class="px-2 py-1 -mx-2 hover:bg-gray-200 text-gray-900"
                >
                  <button class="w-full" @click="destroy">Delete</button>
                </li>
                <li
                  v-if="
                    !hasPermission(DELETE, 'article') &&
                    !hasPermission(CHANGE, 'article')
                  "
                  class="px-2 py-1 -mx-2 hover:bg-gray-200 text-gray-900"
                >
                  There's nothing to do.
                </li>
              </ul>
            </template>
          </ENavDropdown>
        </div>
      </div>
    </div>
    <router-link
      class="w-1/5"
      :to="{ name: 'ArticleDetail', params: { id: data.id } }"
    >
      <img class="w-full" :src="data.cover_image.image" alt="" />
    </router-link>
  </div>
</template>

<script>
import MoreVerticalSVG from "@/assets/svgs/more-vertical.svg";
import ENavDropdown from "@/components/ENavDropdown.vue";
import { mapGetters } from "vuex";
import { CHANGE, DELETE } from "@/permission-types";
import { userHasPermissionMixin } from "@/mixins/permissionMixins";

export default {
  mixins: [userHasPermissionMixin],
  data() {
    return {
      CHANGE,
      DELETE,
    };
  },
  components: {
    MoreVerticalSVG,
    ENavDropdown,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("auth", ["isUserLoggedIn"]),
  },
  methods: {
    async destroy() {
      this.$emit("destroy");
    },
    getHumanReadableDate(date) {
      return new Date(date).toDateString();
    },
  },
};
</script>
