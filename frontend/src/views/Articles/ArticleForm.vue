<template>
  <div>
    <h2 class="text">Add News</h2>
    <h2>Edit News {{ $route.params.id }}</h2>
    <form
      @submit.prevent="createNews"
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
export default {
  name: "NewsForm",
  methods: {
    async uploadImage() {},
    async save() {
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
};
</script>

<style scoped></style>