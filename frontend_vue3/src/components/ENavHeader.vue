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
            <template v-slot:button>Profile</template>
            <template v-slot:content>
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
import {mapActions, mapState} from "pinia/dist/pinia";
import {useAuthStore} from "@/stores/auth";

export default {
  components: {
    ENavDropdown,
  },
  computed: {
    ...mapState(useAuthStore, ["currentUser"]),
    ...mapState(useAuthStore, ["isUserLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push({name: "Home"});
    },
  },
};
</script>
