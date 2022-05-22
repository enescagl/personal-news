<template>
  <div class="prose">
    <h2>{{ article.heading }}</h2>
    <div>
      <img
          class="w-full"
          v-if="article.cover_image"
          :src="article.cover_image.image"
          alt=""
      />
    </div>
    <div
        id="editorJs"
        class="bg-white rounded-sm border border-gray-300"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useEditorJs, useEditorJsParser} from "@/composables/editorjs";
import {useRetrieve} from "@/composables/crud";

export default defineComponent({
  async setup() {
    const article = ref({
      body: "",
      heading: "",
      cover_image: "",
      created_at: ""
    });

    const {parse} = useEditorJsParser();
    const {retrieve: retrieveArticle} = useRetrieve({resource: "articles", itemRef: article})

    await retrieveArticle();
    const editorjsBody = parse(article.value.body, article.value.created_at);
    const {editor: readOnlyEditor} = useEditorJs({
      editorHolder: "editorJs",
      readOnly: true,
      initialData: editorjsBody
    });
    return {article, readOnlyEditor};
  }
});
</script>

<style></style>
