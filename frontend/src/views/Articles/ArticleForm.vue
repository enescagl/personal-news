<template>
  <div>
    <h2 class="text">
      <span v-if="$route.params.id">Edit</span>
      <span v-else>Add</span>
      Article
      <span class="font-medium" v-if="$route.params.id">
        {{ $route.params.id }}
      </span>
    </h2>
    <form @submit.prevent="save" class="flex flex-col items-center space-y-4">
      <div class="relative overflow-hidden inline-block w-full">
        <button class="w-full border-2 border-gray-300 rounded-sm px-2 py-2">
          Upload a Cover Image
        </button>
        <input
          ref="coverImage"
          type="file"
          name="cover-image"
          class="text-8xl absolute inset-0 opacity-0"
          @change="fileInputChange"
        />
      </div>
      <img :src="coverPreviewUrl" />
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
import { deserializeObject } from "@/utils";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";

import { parseBlocksMixin } from "@/mixins/editorjsMixins";
import slugify from "slugify";

export default {
  mixins: [
    baseMixin,
    retrieveMixin,
    createMixin,
    updateMixin,
    parseBlocksMixin,
  ],
  data() {
    return {
      resourceName: "article",
      resourceNamePlural: "articles",
      editor: null,
      isEdit: false,
      coverPreviewUrl: null,
      editorTools: {
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
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: this.uploadImageFromFile,
              uploadByUrl: this.uploadImageFromUrl,
            },
          },
        },
      },
    };
  },
  methods: {
    async fileInputChange() {
      const {
        file: { id, url },
      } = await this.uploadImageFromFile(this.$refs.coverImage.files[0]);
      this.item.cover_image = id;
      this.coverPreviewUrl = url;
    },
    async uploadImageFromFile(file) {
      const form = new FormData();
      const imageName = file.name;
      const slug = slugify(imageName, { lower: true });

      form.append("image", file);
      form.append("slug", slug);
      form.append("name", imageName);

      const { data: imageResponse } = await this.create(form, "images", {
        header: { "content-type": "multipart/form-data" },
      });
      return {
        success: 1,
        file: {
          url: imageResponse.image,
          id: imageResponse.id,
        },
      };
    },
    async uploadImageFromUrl(url) {
      const { data: imageResponse } = await this.create(
        { url },
        "images/from_url"
      );

      return {
        success: 1,
        file: {
          url: imageResponse.image,
        },
      };
    },
    async save() {
      this.item.body = JSON.stringify(await this.editor.save());
      this.item = deserializeObject(this.item);
      await (this.isEdit ? this.update() : this.create());
      await this.$router.push({ name: "Articles" });
    },
  },
  async mounted() {
    const editorConfig = {
      holder: "editorjs",
      tools: this.editorTools,
    };
    if (this.$route.params.id) {
      this.isEdit = true;
      await this.retrieve();
      editorConfig.data = this.parse(this.item.body, this.item.created_at);
    }
    this.editor = new EditorJS(editorConfig);
  },
};
</script>

<style scoped></style>
