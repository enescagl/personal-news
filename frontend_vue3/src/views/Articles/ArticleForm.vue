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
      <div class="relative overflow-hidden inline-block w-full group">
        <button
            v-if="!item.cover_image"
            class="w-full border-2 border-gray-300 rounded-sm px-2 py-2"
        >
          Upload a Cover Image
        </button>
        <button
            v-else
            class="relative w-full group-hover:bg-gray-900 group-hover:opacity-75"
        >
          <div
              class="text-xl absolute h-full flex justify-center items-center inset-0 opacity-0 group-hover:opacity-100"
          >
            Change Cover Image
          </div>
          <img
              class="w-full border-2 border-gray-300 rounded-sm px-2 py-2"
              :src="item.cover_image"
          />
        </button>
        <input
            ref="coverImage"
            type="file"
            name="cover-image"
            class="text-8xl absolute inset-0 opacity-0"
            @input="pickImageFile"
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
<script lang="ts">

import {deserializeObject} from "@/utils";

import slugify from "slugify";
import {useCreate, useRetrieve, useUpdate} from "@/composables/crud";
import {defineComponent, onMounted, ref} from "vue";
import type {Ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useEditorJs, useEditorJsParser} from "@/composables/editorjs";
import type {ImageToolConfig} from "@/composables/editorjs/editorConfig";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const isEdit = ref(false);
    const coverImage: Ref<null> | Ref<HTMLInputElement> = ref(null);
    const article = ref({
      body: "",
      heading: "",
      cover_image: "",
      created_at: ""
    });

    const {create: createArticle} = useCreate("articles");
    const {create: createImageWithFile} = useCreate("images");
    const {create: createEditorImageWithFile} = useCreate("images");
    const {create: createEditorImageWithUrl} = useCreate("images/from_url");

    const {update: updateArticle} = useUpdate("articles");
    const {update: updateImage} = useUpdate("images");

    const {retrieve: retriveArticle} = useRetrieve({itemRef: article, resource: "articles"});

    const {parse} = useEditorJsParser();
    const editorConfig: [ImageToolConfig, object] = [
      {
        uploaderConfig: {
          uploadByFile: uploadImageFromFile,
          uploadByUrl: uploadImageFromUrl
        },
      },
      {}
    ];
    if (route.params.id) {
      isEdit.value = true;
      editorConfig[1] = parse(article.value.body, article.value.created_at);
    }
    const {editor} = useEditorJs({imageToolConfig: editorConfig[0] as ImageToolConfig});


    async function uploadImageFromUrl(url: string) {
      const imageResponse = (await createEditorImageWithUrl(ref({url})))
          .data;

      return {
        success: 1,
        file: {
          url: imageResponse.image,
        },
      };
    }

    async function uploadImageFromFile(file: File) {
      const form = ref(new FormData());
      const imageName = file.name;
      const slug = slugify(imageName, {lower: true});

      form.value.append("image", file);
      form.value.append("slug", slug);
      form.value.append("name", imageName);

      const imageResponse = (
          await createImageWithFile(ref(form), {
            headers: {"content-type": "multipart/form-data"},
          })
      ).data;

      return {
        success: 1,
        file: {
          url: imageResponse.image,
        },
      };
    }

    async function pickImageFile() {
      if (coverImage.value && coverImage.value.files) {
        const imageFile = coverImage.value.files[0];
        coverImage.value = {
          ...coverImage.value,
          cover_image: (await uploadImageFromFile(imageFile)).file.url,
        };
        coverImage.value.blur();
      }
    }

    onMounted(async () => {
    })

    async function save() {
      article.value = isEdit ?? ref(deserializeObject(article.value));
      article.value.body = JSON.stringify(await editor.save());
      await (isEdit ? updateArticle(article) : createArticle(article));
      await router.push({name: "Articles"});
    }

    return {
      coverImage,
      article,
      save,
      pickImageFile
    }
  }
});
</script>

<style scoped></style>
