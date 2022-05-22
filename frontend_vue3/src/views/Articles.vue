<template>
  <Suspense>
    <RouterView v-bind="$attrs"></RouterView>
    <template v-slot:fallback v-bind="$attrs">
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import {RouterView} from "vue-router";
</script>
