<template>
    <div class="main">
        <div style="height: 100%; display: flex; justify-content: center;">
            <div class="rounded-lg block-info">
                <a href="https://progzone122.github.io/anderia-minigame/" target="_blank"><img src="~/assets/logo.svg" alt="" srcset="" class="aniship-icon"></a>
                <div>
                    <h1>AniShip</h1>
                    <p style="opacity: 0.9;">Версия: 0.1-night</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "settings",
    layout: 'default',
}
</script>
<style lang="scss">

</style>
<style scss lang="scss">
@import "~/assets/variables.scss";

.main {
    margin-top: 6em;
    .block-info {
        background-color: $color3;
        padding: 2em;
        width: 30em;
        display: flex;
        align-items: center;
        gap: 2em;
        .aniship-icon {
            width: 12em;
            height: 12em;
            background-size: cover;
        }
    }
}
</style>