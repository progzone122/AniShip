<template>
  <ModalsSearchAnimes />
  <!-- -->
<!--  <perfect-scrollbar :settings="scrollbarSettings">-->
    <div class="mainLayout flex select-none">
      <div class="fixed left-0 top-0 w-[5em] h-[100%] p-2 z-50">
        <LeftMenu />
      </div>
      <div class="pl-[5em] p-6 overflow-x-hidden">
        <slot />
      </div>
    </div>
<!--  </perfect-scrollbar>-->
</template>

<script setup>
// const scrollbarSettings = {
//   wheelSpeed: 20,
//   wheelPropagation: true,
//   minScrollbarLength: 150
// }
</script>
<style lang="scss">
  .ps {
    height: 100vh;
    //background: transparent;
    .ps__rail-y {
      background: transparent;
      &:hover {
        background: transparent;
      }
    }
    .ps__rail-y.ps--clicking {
      background: transparent;
    }
  }
</style>