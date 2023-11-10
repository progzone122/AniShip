<template>
    <div class="w-[100vw] ml-[1em]">
        <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
            <button class="btn bgColor1" :class="{ 'bgColor2': activePlayer[0] }" @click="toggleActivePlayer(0)">
                Kodik
            </button>
            <button class="btn bgColor1" :class="{ 'bgColor2': activePlayer[1] }"
                @click="toggleActivePlayer(1)">WebTorrent</button>
            <!-- <button class="btn bgColor1" :class="{ 'bgColor2': activePlayer[2] }"
                @click="toggleActivePlayer(2)">Button</button> -->
        </div>
    </div>
</template>
<script setup>
const route = useRoute()

const shikiId = Number(route.query.shikiId ?? null);

const activePlayer = ref([true, false, false]); // Переменнная для того, чтобы узнать какой плеер выбран

// Функция для выбора плеера
const toggleActivePlayer = (index) => {
    activePlayer.value[0] = false;
    activePlayer.value[1] = false;
    // activePlayer.value[2] = false;

    activePlayer.value[index] = true;
}
</script>
<style></style>