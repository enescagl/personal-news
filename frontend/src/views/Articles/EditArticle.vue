<template>
  <div>
    <h2>Edit News {{ $route.params.id }}</h2>
    <form
      @submit.prevent="saveNews"
      class="flex flex-col items-center space-y-4"
    >
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
          v-model="heading"
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
          v-model="shortDescription"
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
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      id: "",
      heading: "",
      shortDescription: "",
      coverImage: "",
      coverImageChanged: false,
      body: "",
      editor: null,
    };
  },
  computed: {
    ...mapState("news", ["currentDetail"]),
  },
  methods: {
    ...mapActions("news", ["change", "getDetail"]),
    async saveNews() {
      const form = new FormData();
      const editorCleanData = await this.editor.save();

      form.append("heading", this.heading);
      form.append("short_description", this.shortDescription.slice(0, 250));
      if (this.coverImageChanged) {
        form.append("cover_image", this.$refs["cover-image"].files[0]);
      }
      form.append("body", JSON.stringify(editorCleanData));

      this.change({ id: this.id, obj: form });

      this.$router.push({ name: "NewsIndex" });
    },
  },
  async mounted() {
    await this.getDetail(this.$route.params.id);
    this.heading = this.currentDetail.heading;
    this.id = this.currentDetail.id;
    if (typeof this.currentDetail.body === "string") {
      this.body = {
        time: new Date(this.currentDetail.created_at).getTime() / 1000,
        blocks: [
          {
            type: "paragraph",
            data: { text: this.currentDetail.body },
          },
        ],
      };
    } else {
      this.body = JSON.parse(this.currentDetail.body);
    }
    this.shortDescription = this.currentDetail["short_description"];
    // eslint-disable-next-line no-unused-vars
    this.editor = new EditorJS({
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
      data: this.body,
    });
  },
};
</script>
