<template>
  <header class="border-b border-gray-200">
    <nav
      class="flex flex-col items-center justify-between py-2 space-y-8 sm:flex-row sm:max-w-screen-sm sm:mx-auto md:max-w-screen-md"
    >
      <div class="font-bold text-4xl">
        <router-link :to="{ name: 'Articles' }">Logo</router-link>
      </div>
      <ul class="flex justify-end space-x-4">
        <li>
          <router-link :to="{ name: 'Articles' }">News</router-link>
        </li>
        <li v-if="isUserLoggedIn">
          <ENavDropdown>
            <template slot="button">Profile</template>
            <template slot="content">
              <ul>
                <li class="px-2 py-1 -mx-2 hover:bg-gray-200 text-gray-900">
                  <button class="w-full" @click="logout">Logout</button>
                </li>
              </ul>
            </template>
          </ENavDropdown>
        </li>
        <li v-else>
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ENavDropdown from "@/components/ENavDropdown.vue";
import { mapState } from "vuex";

export default {
  components: {
    ENavDropdown,
  },
  computed: {
    ...mapState("layout", ["isUserLoggedIn", "loggedInUser"]),
    // isUserInEditorGroup() {
    //   return (
    //     this.loggedInUser.groups.filter((g) => g.name === "Admin").length > 0
    //   );
    // },
    // currentUser() {
    //   return JSON.parse(localStorage.getItem("userData"));
    // },
  },
  methods: {
    logout() {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$forceUpdate();
    });
  },
};
</script>
