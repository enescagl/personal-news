<template>
  <div class="relative">
    <div
        class="z-10 relative flex justify-between items-center focus:outline-none select-none"
        @click="changeVisibility"
    >
      <slot name="button"></slot>
    </div>

    <!-- to close when clicked on space around it in desktop-->
    <button
        v-if="open"
        class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
        tabindex="-1"
        @click="changeVisibility(false)"
    ></button>
    <!--dropdown content: desktop-->
    <transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-750 ease-in"
        enter-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75"
    >
      <div
          v-if="open"
          class="hidden md:block absolute shadow-sm border w-36 rounded py-1 px-2 text-sm mt-4 bg-white"
          :class="placement === 'right' ? 'right-0' : 'left-0'"
          @click="changeVisibility(false)"
      >
        <slot name="content"></slot>
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-750 ease-in"
        enter-class="opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-75"
    >
      <div
          v-if="open"
          class="md:hidden fixed inset-x-0 bottom-0 bg-white w-full z-20 px-2 py-2 shadow leading-loose"
          @click="changeVisibility(false)"
      >
        <slot name="content"></slot>
      </div>
    </transition>
    <!-- to close when clicked on space around it in mobile-->
    <div
        v-if="open"
        class="md:hidden fixed w-full h-full inset-0 bg-gray-900 opacity-50 z-10"
        @click="changeVisibility(false)"
    ></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, ref} from "vue";

export default defineComponent({
  props: {
    placement: {
      type: String,
      default: "right",
      validator: (value: string) => ["right", "left"].includes(value),
    },
  },
  setup() {
    const open = ref(false);

    function onEscape(e: KeyboardEvent) {
      if (e.key === "Esc" || e.key === "Escape") {
        open.value = false;
      }
    }

    function changeVisibility(withValue?: boolean) {
      if (withValue === null || withValue === undefined) {
        open.value = !open.value;
      } else {
        open.value = withValue;
      }

    }

    onMounted(() => document.addEventListener("keydown", onEscape));
    onUnmounted(() => document.removeEventListener("keydown", onEscape));

    return {
      open,
      changeVisibility
    }
  }
});
</script>
