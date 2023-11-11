<template>
    <div class="context">
        <h1>Добро пожаловать в AniShip</h1>
        <div class="textP font-bold continue">
            <p>Продолжить ></p>
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
</template>
<script setup>
definePageMeta({
    layout: "welcome",
});
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