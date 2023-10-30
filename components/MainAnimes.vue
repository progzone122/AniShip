<template>
  <h4 class="mb-6 textH4">{{ name }}</h4>
  <AnimesGrid :animes="main_animes" />
  {{ props.anime }}
  <div class="w-[100%] flex justify-center mt-8" v-if="main_animes.length !== 0">
    <p class="text-accent hover:text-accent/40 cursor-pointer" @click="page += 1; animeStore.fetchAnimesAdd(link, page);">{{ link_name }}</p>
  </div>
</template>
<script setup>
import { animes } from "~/store/animes.js";

const animeStore = animes();


const props = defineProps({
  name: {
    type: String,
    default: "error (name [String])"
  },
  main_animes: {
    type: Array,
    default: [],
  },
  link_name: {
    type: String,
    default: "error (link_name [String])"
  },
  link: {
    type: String,
    default: "error (link [String])"
  },
});
//
let page = 1;
</script>