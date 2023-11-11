<template>
    <div class="mainLayout flex select-none">
        <div class="overflow-x-hidden">
            <slot />
        </div>
    </div>
</template>
  
<script setup>
// const scrollbarSettings = {
//   wheelSpeed: 20,
//   wheelPropagation: true,
//   minScrollbarLength: 150
// }
</script>
<style lang="scss">
// .ps {
//     height: 100vh;

//     //background: transparent;
//     .ps__rail-y {
//         background: transparent;

//         &:hover {
//             background: transparent;
//         }
//     }

//     .ps__rail-y.ps--clicking {
//         background: transparent;
//     }
// }
</style>