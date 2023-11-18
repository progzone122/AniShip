<template>
    <div id="section1">
      <div class="context">
        <h1 class="mt-12">Добро пожаловать в AniShip</h1>
        <div class="textP font-bold continue">
          <p @click="toSection('section2')">Продолжить ></p>
        </div>
        <div class="mockup-code bg-[#1d1b1b] mt-12">
          <pre data-prefix="$"><code>git clone https://github.com/progzone122/AniShip</code></pre> 
          <pre data-prefix=">" class="text-warning"><code>installing...</code></pre> 
          <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
        </div>
      </div>
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
    </div>
    <div>
      <div class="context" id="section2">
        <Icon name="material-symbols:admin-panel-settings-rounded" size="70px" color="white" class="mb-[-8px]" />
        <h1>AniShip Connect</h1>

        <div class="textP font-bold continue">
          <p @click="toSection('section1')">Отмена</p>
        </div>
      </div>
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
    </div>
</template>
<script setup>
const { $gsap, $ScrollTo } = useNuxtApp()

definePageMeta({
    layout: "welcome"
});

//
const toSection = (section) => {
  $gsap.to(window, {
    duration: 0.4,
    scrollTo: {
      y:`#${section}`,
      offsetY: 0
    }
  });
}
</script>
<style lang="scss">
.continue {
    &:hover {
        p {
            border-bottom: 1px solid white;
        }
    }

}
</style>