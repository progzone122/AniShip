<template>
  <div
    v-infinite-scroll="loadMore"
    class="content"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <!-- <header style="display: none">
      <b-dropdown text="Горячое за день" variant="dark" id="dropdown1">
        <button type="button" @click="menu('hot')" :class="'btn btn-dark ' + newButton">
          День
        </button>
        <button type="button" @click="menu('hot')" :class="'btn btn-dark ' + newButton">
          Неделя
        </button>
        <button type="button" @click="menu('hot')" :class="'btn btn-dark ' + newButton">
          Месяц
        </button>
      </b-dropdown>
      <button
        type="button"
        @click="menu('ongoings')"
        :class="'btn btn-dark ' + ongoingsButton"
      >
        В тренде
      </button>
      <button type="button" @click="menu('anons')" :class="'btn btn-dark ' + anonsButton">
        Новое
      </button>
    </header> -->
    <!-- -->
    <div class="container">
      <CoubBlockComponent v-for="i in coubs" :key="i" :coub="i" />
      <b-icon icon="arrow-clockwise" animation="spin-pulse" style="color: white; margin-bottom: 1em;" font-scale="4" />
    </div>
  </div>
</template>
<script>
import { hotCoubs } from "../../main/api/coub.js";
import CoubBlockComponent from "../components/CoubBlock.vue";
export default {
  name: "Coubs",
  components: {
    CoubBlockComponent,
  },
  data() {
    return {
      coubs: null,
      page: 1
    };
  },
  async created() {
    this.coubs = await hotCoubs("weekly", this.page);
    this.coubs = this.coubs.coubs;
  },
  methods: {
    loadMore () {
      this.busy = true;
      setTimeout( async () => {
        this.page = this.page + 1;
        let coubs2 = await hotCoubs("weekly", this.page);
        coubs2 = coubs2.coubs;
        for (const i in coubs2) {
          this.coubs.push(coubs2[i]);
        }
      }, 100);
      this.busy = false;
    }
  },
};
</script>
<style scoped>
.content {
  width: 100vw;
  padding-left: 2vw;
}
header {
  width: 100%;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2em;
}
header .btn-dark {
  margin-right: 1em;
  border: none;
}
.content .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 3vw;
  width: 90%;
  /* background-color: aqua; */
}
.content {
  overflow-y: scroll;
  height: 100vh;
}
body{
  overflow-y: hidden;
}
</style>

<style>
#dropdown1 {
  margin-right: 1em;
  height: 2.2em;
}
#dropdown1 ul {
  background-color: #212529;
  padding: 1em;
}
#dropdown1 ul button {
  width: 100%;
  text-align: start;
}
</style>
