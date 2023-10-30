<template>
	<div class="w-[100vw] h-[80vh] ml-[-5em] mt-[-2em]">
    <BigBanner :anime="bigBannerStore.animes[0]" />
  </div>
  <div class="ml-[-5em] w-[100vw] pl-[6em] pr-[2em] mt-12 mb-16">
    <MainAnimes name="Онгоинги" :main_animes="animeStore.ongoings" link_name="Загрузить больше онгоингов" link="ongoings" />
    <MainAnimes name="Лучшие релизы" :main_animes="animeStore.ranked_released" link_name="Загрузить больше лучших релизов" link="rank_released" />
  </div>
  <div class="w-[100vw] h-[80vh] ml-[-5em] mt-[-2em]">
    <BigBanner :anime="bigBannerStore.animes[1]" />
  </div>
  <div class="ml-[-5em] w-[100vw] pl-[6em] pr-[2em] mt-12 mb-16">
    <MainAnimes name="Релизы" :main_animes="animeStore.released" link_name="Загрузить больше релизов" link="released" />
    <MainAnimes name="Анонсы" :main_animes="animeStore.anons" link_name="Загрузить больше анонсов" link="anons" />
  </div>
</template>
<script setup>
import { account } from "~/store/account.js";
import { bigBanner } from "../store/bigBanner.js";
import { animes } from "~/store/animes.js";

// const accountStore = account();
const bigBannerStore = bigBanner();
const animeStore = animes();

if(bigBannerStore.animes.length === 0){
  console.log(bigBannerStore.animes);
  bigBannerStore.fetchAnimes();
}
console.log(animeStore.ongoings)
setTimeout(() => {
  animeStore.fetchAnimesOngoings();
  animeStore.fetchAnimesRanked_released();
  setTimeout(() => {
    animeStore.fetchAnimesReleased();
    animeStore.fetchAnimesAnons();
  }, 2000)
}, 2000)
// await accountStore.fetchShikimoriAuth("dp0LTbgZPVBzTWe4NbSTXBpp9VxIbNMfLW8K0Dx0zp8");
// await accountStore.fetchRefreshAuth();
</script>