<template>
  <div class="prose">
    <h2>{{ currentDetail.heading }}</h2>
    <div>
      <img class="w-full" :src="currentDetail.cover_image" alt="" />
    </div>
    <div
      v-for="(block, blck_idx) in bodyBlocks"
      :key="blck_idx"
      v-html="block"
    ></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import edjsHTML from "editorjs-html";
export default {
  data() {
    return {
      bodyBlocks: [],
    };
  },
  computed: {
    ...mapState("news", ["currentDetail"]),
  },
  methods: {
    ...mapActions("news", ["getDetail"]),
    renderBody(body) {
      try {
        const edjsParser = edjsHTML();
        this.bodyBlocks = edjsParser.parse(JSON.parse(body));
      } catch (error) {
        this.bodyBlocks.push(body);
      }
    },
  },
  async mounted() {
    await this.getDetail(this.$route.params.id);
    this.renderBody(this.currentDetail.body);
  },
};
</script>

<style></style>
