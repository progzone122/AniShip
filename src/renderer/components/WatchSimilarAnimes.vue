<template>
    <div class="main rounded-lg" v-if="animes">
        <div v-for="anime in animes" :key="anime" @click="$router.push({ name: 'watch', query: { id: anime.id } })">
            <CardAnimeBlock :params="anime" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'WatchSimilarAnimes',
    props: ['id'],
    data() {
        return {
            animes: null
        }
    },
    async fetch() {
        this.$axios.get(`https://shikimori.one/api/animes/${this.id}/similar`).then(res => {
            this.animes = res.data;
        })
    },
    created() {

    },
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.main {
    width: 80vw;
    display: flex;
    background-color: $color2;
    overflow-x: auto;
    margin-top: 3em;
}
</style>
