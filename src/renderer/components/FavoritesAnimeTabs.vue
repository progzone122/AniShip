<template>
    <div class="mr-2 mt-2 mb-4">
        <v-tabs v-model="tab" dark class="rounded-lg" hide-slider
            @change="$store.commit('animes/changeFavoritesTab', tab);" background-color="primary">
            <v-tabs-slider class="list-status_slider" />

            <v-tab v-for="item in items" :key="item">
                {{ item }}
            </v-tab>
        </v-tabs>
    </div>
</template>
<script>
export default {
    name: 'FavoritesAnimeTabs',
    data() {
        return {
            tab: 0,
            items: [
                'Смотрю', 'Запланировано', 'Пересматриваю', 'Просмотрено', 'Отложено', 'Брошено'
            ],
            page: 1
        }
    },
    created() {
        this.tab = this.$store.state.animes.favoritesTab_active;
    }
}
</script>
