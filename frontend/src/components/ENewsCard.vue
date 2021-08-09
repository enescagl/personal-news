<template>
  <div class="relative rounded flex flex-col mx-auto my-4 shadow">
    <div>
      <img class="w-full h-full" :src="data.cover_image" alt="" />
    </div>
    <div class="absolute">{{ data.heading }}</div>
    <div class="bg-gray-100 truncate">{{ data.short_description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
