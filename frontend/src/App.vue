<template>
  <div class="flex flex-col min-h-screen w-full bg-gray-100" id="app">
    <ENavHeader></ENavHeader>
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
import ENavHeader from "@/components/ENavHeader.vue";

export default {
  components: {
    ENavHeader,
  },
};
</script>
