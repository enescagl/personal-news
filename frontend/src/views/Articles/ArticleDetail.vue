<template>
  <div class="prose">
    <h2>{{ currentArticle.heading }}</h2>
    <div>
      <img class="w-full" :src="currentArticle.cover_image" alt="" />
    </div>
    <div
      v-for="(block, blockId) in bodyBlocks"
      :key="blockId"
      v-html="block"
    ></div>
  </div>
</template>

<script>
import edjsHTML from "editorjs-html";

export default {
  data() {
    return {
      bodyBlocks: [],
      currentArticle: {},
    };
  },
  methods: {
    async getDetail(id) {
      this.currentArticle = await this.$axios.get(`/articles/${id}/`);
    },
    renderBody(body) {
      const edjsParser = edjsHTML();
      try {
        this.bodyBlocks = edjsParser.parse(JSON.parse(body));
      } catch (e) {
        console.log(e);
        if (this.bodyBlocks.includes(undefined)) {
          this.bodyBlocks.push(body);
        }
      }
    },
  },
  async mounted() {
    await this.getDetail(this.$route.params.id);
    this.renderBody(this.currentArticle.body);
  },
};
</script>

<style></style>
