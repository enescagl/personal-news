<template>
  <div class="prose">
    <h2>{{ item.heading }}</h2>
    <div>
      <img
        class="w-full"
        v-if="item.cover_image"
        :src="item.cover_image.image"
        alt=""
      />
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
import { baseMixin, retrieveMixin } from "@/mixins/crudMixins";
import { parseBlocksMixin } from "@/mixins/editorjsMixins";

const edjsParser = edjsHTML();

export default {
  mixins: [baseMixin, retrieveMixin, parseBlocksMixin],
  data() {
    return {
      bodyBlocks: [],
      resourceNamePlural: "articles",
      resourceName: "article",
    };
  },
  computed: {
    htmlBlocks() {
      const editorjsBody = this.parse(this.item.body, this.item.created_at);

      if (typeof editorjsBody === "object" || Array.isArray(editorjsBody)) {
        return edjsParser.parse(editorjsBody);
      }
      return [editorjsBody];
    },
  },
};
</script>

<style></style>
