<template>
  <div class="flex flex-col min-h-screen w-full bg-gray-100" id="app">
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
    <main class="flex-1 py-8">
      <router-view
        class="flex-1 mx-auto sm:max-w-screen-sm md:max-w-screen-md"
      />
    </main>
    <footer class="max-w-xs mx-auto sm:max-w-screen-sm md:max-w-screen-md">
      This app is made by
      <a href="mailto:enes.cagliyan@gmail.com">Enes Çağlıyan.</a>
    </footer>
  </div>
</template>
<script>
import ENavDropdown from "@/components/common/ENavDropdown.vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {
    ENavDropdown,
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
    ...mapGetters("auth", ["isUserLoggedIn"]),
    homeRouteAliases() {
      const homeRoutes = ["Home"];
      let loopedRoute = this.$router.options.routes.find((route) =>
        homeRoutes.includes(route.name)
      );

      while (loopedRoute?.redirect) {
        homeRoutes.push(loopedRoute.redirect.name);
        loopedRoute = this.$router.options.routes.find((route) => {
          return route.name === loopedRoute?.redirect?.name;
        });
      }
      return homeRoutes;
    },
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    logout() {
      this.logoutUser();
      if (!this.homeRouteAliases.includes(this.$route.name)) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
