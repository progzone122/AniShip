<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" color="primary" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-list-item-content v-bind="attrs" v-on="on">
          <v-list-item-title class="text-h6">
            Добро пожаловать!
          </v-list-item-title>
          <v-list-item-subtitle>Войдите в аккаунт Shikimori</v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <v-card class="rounded-lg" color="primary">
        <v-card-title class="text-h6" style="color: white;">
          Авторизация с помощью Shikimori
        </v-card-title>
        <v-container>
          <v-stepper v-model="e1" elevation="0" class="transparent">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card elevation="0" class="mb-12 transparent" height="300px">
                  <v-col
                    cols="12" class="d-flex flex-column justify-center align-center"
                    style="height: 100%;" color="transparent"
                  >
                    <img src="~/assets/favicon-shikimori.png" class="shiki-img" alt="" srcset="">
                    <p class="text-center">
                      Авторизируйтесь в oAuth приложении AniShip, скопируйте
                      код авторизации и нажмите кнопку "Продолжить"
                    </p>
                    <v-btn
                      href="https://shikimori.me/oauth/authorize?client_id=2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=user_rates"
                      target="_blank"
                      elevation="0" rounded color="background" dark @click="nextStep(e1)"
                    >
                      Авторизация
                    </v-btn>
                  </v-col>
                </v-card>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card elevation="0" class="mb-12 transparent" height="50px">
                  <v-col cols="12">
                    <v-text-field v-model="code" dark label="Введите код авторизации*" required />
                  </v-col>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
            <div style="padding-left: 1.5em; padding-bottom: 1em;">
              <v-btn v-if="e1 === 1" disabled elevation="0" class="btn_step1">
                Продолжить
              </v-btn>
              <v-btn v-if="e1 === 2" elevation="0" class="btn_step1" @click="auth(code)">
                Продолжить
              </v-btn>
              <v-btn elevation="0" style="color: white;" text @click="dialog = false; e1 = 1">
                Отмена
              </v-btn>
            </div>
          </v-stepper>
        </v-container>
        <!-- <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Save
                    </v-btn>
                </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const Shikimori = require('shikimori-api-node')
const shiki = new Shikimori()

export default {
  data: () => ({
    dialog: false,
    e1: 1,
    steps: 2
  }),

  computed: {
    ...mapActions(['index/fecthProfile']),
    account () {
      return this.$store.state.account
    }
  },
  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    }
  },
  created () {

  },

  methods: {
    nextStep (n) {
      this.e1 = n + 1
    },
    auth (authcode) {
      shiki.auth.login({
        clientid: '2Ajm5Jmvf2kGKEDlilk2Pka85p2b57H4VTYS6qvWc9w',
        clientsecret: 'YDg7tpBhQBGAUFY9zZbU89sL6kF9mtJztERjTWtNi6o',
        authcode,
        useragent: 'AniShip', // only name of your app
        redirecturi: 'urn:ietf:wg:oauth:2.0:oob' // optional: 'urn:ietf:wg:oauth:2.0:oob' by default
      }).then(async res => {
        console.log(res)
        localStorage.setItem('access_token', res.accesstoken)
        localStorage.setItem('refresh_token', res.refreshtoken)
        this.dialog = false
        await this.$store.dispatch('fetchProfile', res.accesstoken)
        this.$router.go(0)
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~/assets/variables.scss";

.shiki-img {
    width: 6em;
    height: 6em;
    margin-bottom: 1em;
}
.transparent {
    background-color: transparent;
}
</style>
