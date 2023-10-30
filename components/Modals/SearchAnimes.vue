<template>
  <dialog id="searchAnimesModal"
          class="modal modal-top flex justify-center fixed">
    <div class="fixed mt-5">
      <form method="dialog">
        <button class="btn btn-circle text-white">
          <Icon class="cursor-pointer" name="material-symbols:expand-circle-down-outline" color="white" size="24px" />
        </button>
      </form>
    </div>
    <div class="modal-box w-11/12 max-w-5xl searchAnimes bgColor1">
      <input autofocus type="text" placeholder="Введите название аниме" class="input input-bordered input-accent w-full" v-model="nameModel" />
      <div class="w-full h-[20em] mt-4 mb-0 pb-0 overflow-y-scroll" v-if="nameModel.length > 2">
        <div class="w-full h-[100%] flex flex-col gap-2" v-if="result">
          <div v-for="anime in result">
            <div class="w-full flex items-center gap-4 hover:bg-black rounded-lg p-3 cursor-pointer" @click="watchAnime(anime)">
              <div class="w-[5em] h-[7em] bg-cover animeCard cursor-pointer" :style="'background-image: url(https://shikimori.me/' + anime.image.original + ')'">
              </div>
              <h4 class="textH4">{{ anime.russian ?? anime.name ?? "error" }}</h4>
            </div>
          </div>
        </div>
        <div class="w-full h-[100%] flex justify-center items-center" v-else>
          <span class="loading loading-ring loading-lg" style="width: 8em;"></span> <!-- loading -->
        </div>
      </div>
      </div>
  </dialog>
</template>
<script setup>
import Wrapper from "assets/shikimori/index.js";

const shiki = new Wrapper();

const nameModel = ref("");
const result = ref(null);
const delayTimer = ref(null);
//
watch(nameModel, (oldValue, newValue) => {
  search();
  console.log(newValue);
});
const search = () => {
  result.value = null;
  if (delayTimer.value !== null) {
    clearTimeout(delayTimer.value)
  }
  delayTimer.value = setTimeout(() => {
    shiki.animes.list({
      search: nameModel.value,
      limit: 15
    }).then(res => {
      result.value = res
      console.log(result.value);
    })
  }, 1000)
};
const watchAnime = async (anime) => {
  document.querySelector('#searchAnimesModal').close();
  await navigateTo({ path: '/', query: { id: anime.id } });
  await navigateTo({ path: '/watch', query: { id: anime.id } });
}
</script>