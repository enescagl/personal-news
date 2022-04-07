<template>
  <div class="prose">
    <h2>{{ item.heading }}</h2>
    <div>
      <img class="w-full" :src="item.cover_image.image" alt="" />
    </div>
    <div
      v-for="(block, blockId) in htmlBlocks"
      :key="blockId"
      v-html="block"
    ></div>
  </div>
</template>

<script>
import edjsHTML from "editorjs-html";
import { baseMixin, retrieveMixin } from "@/mixins";

const edjsParser = edjsHTML();

export default {
  mixins: [baseMixin, retrieveMixin],
  data() {
    return {
      bodyBlocks: [],
      resourceName: "articles",
    };
  },
  computed: {
    htmlBlocks() {
      if (typeof this.item.body === "object" || Array.isArray(this.item.body)) {
        return edjsParser.parse(this.item.body);
      }
      return [this.item.body];
    },
  },
};
</script>

<style></style>
