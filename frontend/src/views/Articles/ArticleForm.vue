<template>
  <div>
    <h2 class="text">
      <span v-if="$route.params.id">Edit</span>
      <span v-else>Add</span>
      Article
      <span class="font-medium" v-if="$route.params.id">{{
        $route.params.id
      }}</span>
    </h2>
    <form @submit.prevent="save" class="flex flex-col items-center space-y-4">
      <div class="relative overflow-hidden inline-block w-full">
        <button class="w-full border-2 border-gray-300 rounded-sm px-2 py-2">
          Upload a Cover Image
        </button>
        <input
          ref="cover-image"
          type="file"
          name="cover-image"
          class="text-8xl absolute inset-0 opacity-0"
        />
      </div>
      <div class="flex flex-col w-full">
        <label class="w-1/3" for="heading">Heading</label>
        <input
          class="form-input rounded-sm border-gray-300"
          type="text"
          name="heading"
          id="heading"
          v-model="item.heading"
        />
      </div>
      <div class="w-full">
        <label for="short-description">Short Description</label>
        <textarea
          class="form-textarea w-full rounded-sm border-gray-300"
          name="short-description"
          id="short-description"
          cols="30"
          rows="3"
          v-model="item.short_description"
        ></textarea>
      </div>
      <div class="w-full">
        <span>Body</span>
        <div
          class="bg-white rounded-sm border border-gray-300"
          id="editorjs"
        ></div>
      </div>
      <button>Save</button>
    </form>
  </div>
</template>
<script>
import {
  baseMixin,
  createMixin,
  retrieveMixin,
  updateMixin,
} from "@/mixins/crudMixins";
import { URLify } from "@/utils";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";

export default {
  mixins: [baseMixin, retrieveMixin, createMixin, updateMixin],
  data() {
    return {
      resourceName: "article",
      resourceNamePlural: "articles",
      editor: null,
      isEdit: false,
    };
  },
  methods: {
    async uploadImage() {
      const form = new FormData();
      const imageName = this.$refs["cover-image"].value;
      const slug = URLify(imageName, imageName.length, false);

      form.append("image", this.$refs["cover-image"].files[0]);
      form.append("slug", slug);
      form.append("name", imageName);

      return await this.create(form, "/images/", {
        header: { "content-type": "multipart/form-data" },
      });
    },
    parseItem(body, time) {
      let bodyAsJson;
      try {
        bodyAsJson = JSON.parse(body);
      } catch (e) {
        bodyAsJson = body;
      }
      return {
        time: Date.parse(time),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: bodyAsJson,
            },
          },
        ],
      };
    },
    async save() {
      this.item.body = await this.editor.save();
      await (this.isEdit ? this.create() : this.update());
      await this.$router.push({ name: "Articles" });
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.isEdit = true;
      await this.retrieve();
      this.editor = new EditorJS({
        data: this.parseItem(this.item.body, this.item.created_at),
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
          },
          quote: {
            class: Quote,
            config: {
              quotePlaceholder: "Enter a quote",
            },
          },
        },
      });
    }
  },
};
</script>

<style scoped></style>
