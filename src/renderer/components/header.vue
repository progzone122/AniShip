<template>
  <div>
    <v-app-bar
      elevation="0"
      class="bar"
      dark
      fixed
    >
      <div class="left">
        <v-btn
          elevation="0"
          fab
          class="fab-button"
          @click="$router.go(-1)"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <!-- <v-btn
          elevation="0"
          fab
          class="fab-button"
          @click="$router.go(1)"
        >
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </v-btn> -->
      </div>
      <div v-if="$route.name !== 'watch'" class="search-block">
        <div style="width: 60%;">
          <SearchBlock />
          <!-- <v-text-field
              placeholder="Поиск аниме..."
              filled
              rounded
              dense
              class="search-input"
            /> -->
        </div>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss">
@import "~/assets/variables.scss";
  .bar{
    background-color: $color3 !important;
    display: flex;
    gap: 1em;
    .left{
      height: 100%;
      display: flex;
      align-items: center;
      gap: 1em;
      // background-color: red;
      .fab-button{
        background-color: $color2;
        width: 3em !important;
        height: 3em !important;
        i{
          font-size: 1.5em;
        }
      }
    }
    .search-block{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 67vw;
      height: 100%;
      // background-color: green;
      .search-input{
        height: 2.5em;
      }
    }
  }
</style>
