<template>
  <div class="flex flex-col min-h-screen w-full" id="app">
    <ENavHeader></ENavHeader>
    <main class="flex-1 px-4 py-8">
      <router-view />
    </main>
    <footer class="px-4">
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
