<template>
  <header class="border-b border-gray-200">
    <nav
      class="
        flex flex-col
        items-center
        justify-between
        py-2
        space-y-8
        sm:flex-row sm:max-w-screen-sm sm:mx-auto
        md:max-w-screen-md
      "
    >
      <div class="font-bold text-4xl">
        <router-link :to="{ name: 'Home' }">Logo</router-link>
      </div>
      <ul class="flex justify-end space-x-4">
        <li>
          <router-link :to="{ name: 'News' }">News</router-link>
        </li>
        <li
          v-if="
            currentUser &&
            currentUser.groups.filter((g) => g.name === 'Admin').length > 0
          "
        >
          <router-link :to="{ name: 'Users' }">Users</router-link>
        </li>
        <li v-if="currentUser">
          <ENavDropdown>
            <template slot="button">Profile</template>
            <template slot="content">
              <ul>
                <li>
                  <button @click="logout">Logout</button>
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
export default {
  components: {
    ENavDropdown,
  },
  computed: {
    currentUser() {
      return JSON.parse(localStorage.getItem("userData"));
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("userData");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
