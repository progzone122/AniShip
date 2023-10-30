<template>
<div class="w-[100vw] ml-[-5em]">
  <div class="pl-[6em] pr-[1em] flex gap-4">
    <!-- Левый блок с постером, названием и кнопками -->
    <div class="bgColor1 p-4 w-[14em] md:w-[18em] lg:w-[24em] h-fit rounded-xl">
      <div></div>
      <div v-if="anime">
        <div class="w-[100%] h-[14em] md:h-[18em] lg:h-[24em] bg-cover animeCard cursor-pointer" :style="'background-image: url(https://shikimori.me/' + anime.image.original + ')'">
          <!-- Background Overlay -->
          <!--      <div class="w-full h-full inset-0 bg-black opacity-60 hidden bg-overlay">-->
          <!--      </div>-->
          <!--      <div class="hidden bg-overlay-content relative top-[-12em]">-->
          <!--      </div>-->
        </div>
        <div class="mt-4">
          <p class="textP2 font-bold">{{ anime.russian ?? anime.name ?? "error" }}</p>
        </div>
        <div class="divider"></div>
        <div class="w-full flex flex-col gap-2">
          <button class="btn watchButton">
            Смотреть
          </button>
        </div>
      </div>
      <div class="h-[21em] flex justify-center items-center" v-else>
        <span class="loading loading-ring loading-lg" style="width: 8em;"></span> <!-- loading -->
      </div>
    </div>

    <!-- Карусель со скриншотами из аниме -->
    <div class="w-[100%] h-[50vh] p-4 bgColor1 rounded-lg">
      <WatchAnimeScreenshotsCarousel v-if="anime" :screenshots="anime.screenshots" />
      <div class="w-full h-[100%] flex justify-center items-center" v-else>
        <span class="loading loading-ring loading-lg" style="width: 8em;"></span> <!-- loading -->
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import Wrapper from "../assets/shikimori/index.js";
const shiki = new Wrapper();
const route = useRoute()

const animeId = Number(route.query.id ?? null);
const anime = ref(null);
shiki.animes.get(animeId).then(res => {
  anime.value = res;
});
</script>