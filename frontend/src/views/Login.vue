<template>
  <div>
    <div class="flex justify-end px-8">
      <form
        @submit.prevent="login"
        class="flex flex-col items-end space-y-4 sm:w-2/3 sm:px-4 sm:py-16 sm:-ml-4 sm:border-2 md:w-1/2 sm:mt-24 md:mt-36"
      >
        <div class="w-full space-y-8">
          <div class="flex justify-between items-center">
            <label for="username">Email</label>
            <input
              class="form-input rounded-sm border-gray-300 w-2/3"
              type="text"
              name="username"
              id="username"
              v-model="email"
            />
          </div>
          <div class="flex justify-between items-center">
            <label for="password">Password</label>
            <input
              class="form-input rounded-sm border-gray-300 w-2/3"
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
          </div>
        </div>
        <div
          class="flex items-center justify-between space-x-2 px-4 py-2 bg-gray-200 rounded-sm border border-gray-300"
        >
          <input type="submit" value="Login" class="bg-transparent" />
          <ArrowRightSVG class="w-5 h-5 text-gray-700" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ArrowRightSVG from "~icons/heroicons/arrow-right";
import { mapActions } from "vuex";

export default {
  name: "login-page",
  components: {
    ArrowRightSVG,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    async login() {
      await this.loginUser({
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
