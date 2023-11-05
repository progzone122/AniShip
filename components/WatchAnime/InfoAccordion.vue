<template>
  <div class="flex flex-col gap-2">
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div class="collapse-title text-xl font-medium">
        Описание
      </div>
      <div class="collapse-content">
        <p v-if="stripHtmlTags(description) !== ''">{{ stripHtmlTags(description) ?? "Описание отсутствует" }}</p>
        <p v-else>Описание отсутствует</p>
      </div>
    </div>
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">
        Жанры
      </div>
      <div class="collapse-content">
        <div class="watchAnimeInfoAccordionGenresItem">

        </div>
      </div>
    </div>
    <!-- <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" />
      <div class="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div class="collapse-content">
        <p>hello</p>
      </div>
    </div> -->
  </div>
</template>
<script setup>
const props = defineProps({
  description: {
    type: String,
    default: "Описание отсутствует",
  },
  genres: {
    type: Array,
    default: null,
  }
});
const stripHtmlTags = (str) => {
  // Регулярное выражение для удаления всех HTML-тегов из строки
  return str.replace(/<[^>]+>/g, '');
}
console.log(stripHtmlTags("<div class=\"b-text_with_paragraphs\"></div>"))
</script>