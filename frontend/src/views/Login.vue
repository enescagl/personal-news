<template>
  <div>
    <form
      @submit.prevent="login"
      class="flex flex-col items-end w-full space-y-4"
    >
      <div class="w-full space-y-8">
        <div class="flex justify-between items-center space-x-4">
          <label for="username">Name</label>
          <input
            class="form-input rounded-sm border-gray-300"
            type="text"
            name="username"
            v-model="username"
          />
        </div>
        <div class="flex justify-between items-center space-x-4">
          <label for="password">Password</label>
          <input
            class="form-input rounded-sm border-gray-300"
            type="password"
            name="password"
            v-model="password"
          />
        </div>
      </div>
      <div
        class="
          flex
          items-center
          justify-between
          space-x-2
          px-4
          py-2
          bg-gray-200
          rounded-sm
          border border-gray-300
        "
      >
        <input type="submit" value="Login" class="bg-transparent" />
        <ArrowRightSVG class="w-5 h-5 text-gray-700" />
      </div>
    </form>
  </div>
</template>

<script>
import ArrowRightSVG from "@/assets/svgs/arrow-right.svg";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    ArrowRightSVG,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState("layout", ["isUserLoggedIn", "loggedInUser"]),
  },
  methods: {
    ...mapActions("layout", ["loginUser"]),
    async login() {
      await this.loginUser({
        username: this.username,
        password: this.password,
      });
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
