<template>
  <v-card
    class="mr-6 my-2 card rounded-lg" :width="width2" :height="height2"
    :style="{ 'background-image': 'url(' + image + ')', 'backgroundSize': 'cover !important' }" color="transparent"
  >
    <div class="pa-4 shadow">
      <div class="top">
        <v-chip color="background" class="align-center">
          <v-icon small class="mr-1">
            mdi-star
          </v-icon>
          <p style="margin-top: 1.3em;">{{ params.score }}</p>
        </v-chip>
        <v-chip v-if="!watch_button2 && params.next_episode_at" color="background" class="align-center">
          <v-icon small class="mr-1">
            mdi-timer
          </v-icon>
          <p style="margin-top: 1.3em;">{{ next_episode_at() }}</p>
        </v-chip>
      </div>
      <div class="bottom">
        <h4 class="clip mb-2">{{ title }}</h4>
        <v-btn depressed color="primary" width="auto" disabled>
          <p style="margin-top: 0.9em;">{{ params.episodes_aired }} / {{ params.episodes }}</p>
        </v-btn>
      </div>
    </div>
    <div v-if="watch_button2">
      <div class="watch_block rounded-lg">
        <v-btn tile depressed color="success" width="100%" class="watch_button">Смотреть</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
import { format } from 'date-fns'

export default {
  name: 'CardAnimeBlock',
  props: ['params', 'watch_button', 'width', 'height'],
  data () {
    return {
      image: 'https://shikimori.me' + this.params.image.original,
      watch_button2: this.watch_button ?? true,
      width2: this.width ?? 220,
      height2: this.height ?? 330
    }
  },
  computed: {
    computed_image () {
      return this.params.image.original
    },
    computed_title () {
      return this.params.name
    }
  },
  watch: {
    computed_image () {
      console.log(this.params.image.original);
      this.image = 'https://shikimori.me' + this.params.image.original
    },
    computed_title () {
      if (this.params.russian !== null && this.params.russian !== undefined) {
        this.title = this.params.russian
      } else {
        this.title = this.params.name
      }
    }
  },
  created () {
    if (this.params.russian !== null && this.params.russian !== undefined) {
      this.title = this.params.russian
    } else {
      this.title = this.params.name
    }
  },
  methods: {
    next_episode_at () {
      const date = format(new Date(this.params.next_episode_at), 'dd.MM.yyyy')
      console.log(date)
      return date
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

@keyframes slideTop {
  from {
    height: 0;
  }

  to {
    height: 2em;
  }
}

.card {
  background-color: transparent !important;
  padding-bottom: 1em;
  box-shadow: none !important;

  &:hover {
    // background-color: $color3 !important;
    cursor: pointer;

    .watch_block {
      display: flex;
    }

    .watch_button {
      animation: slideTop 0.2s;
    }
  }

  .watch_block {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;

    i {
      font-size: 3em !important;
    }
  }
}

.clip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

h4 {
  color: white;
}

.top {
  height: 38%;
}

.bottom {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.shadow {
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, rgba(0, 0, 0, 0.814145726650035) 97%);
  position: absolute;
}
</style>
