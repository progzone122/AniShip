<template>
  <div class="content">
    <header>
      <h4>Настройки</h4>
    </header>
    <div class="container">
      <!-- -->
      <p style="font-weight: 600;">Выбор серверов</p>
      <div style="display: flex; align-items: center; gap: 1em">
        <p style="height: 0.5em;">Animevost API: </p>
        <div id="animevostapi_dropdown">
          <b-dropdown id="dropdown1" :text="animevost_server" variant="dark" style="width: 30em;">
            <button type="button" class="btn btn-dark" href="#" @click="SetAnimevostApi('api.animetop.info');">api.animetop.info (рекомендуется)</button>
            <button type="button" class="btn btn-dark" href="#" @click="SetAnimevostApi('api.animevost.org');">api.animevost.org (заблокирован в некоторых странах)</button>
          </b-dropdown>
        </div>
      </div>
      <!-- -->
      <p style="font-weight: 600; margin-top: 1em;">Локальная база данных</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5em;">
        <button type="button" class="btn btn-dark" @click="clearDatabase();">Очистить базу данных</button>
        <button type="button" class="btn btn-dark" @click="importDatabase();">Импорт базы данных</button>
        <button type="button" class="btn btn-dark" @click="exportDatabase();">Экспорт базы данных</button>
        <label class="btn btn-dark">Импорт базы данных<input @change="importDatabase();" type="file" id="importDirectory1" webkitfile style="display: none;"></label>
      </div>
      <!-- -->

      <p style="font-weight: 600; margin-top: 1em;">Последнее просмотренное</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5em;">
        <button type="button" class="btn btn-dark" @click="clearRecentHistory();">Очистить историю</button>
      </div>

      <p style="font-weight: 600; margin-top: 1em;">Обновления</p>
      <button type="button" class="btn btn-dark" onclick="window.open('https://github.com/progzone122/AniShip', '_blank')">Открыть GitHub репозиторий</button>
      <!-- -->
      <!-- <p style="font-weight: 600;">API токены</p> -->
      <!-- <div class="form-group">
          <div style="display: flex; align-items: center;">
            <p style="margin-right: 0.8em; margin-top: 1.2em;">VideoCDN:</p>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Введите API токен видео-балансера VideoCDN и нажмите Enter" v-model="videocdn_token" v-on:keyup.enter="videocdn_tokenSubmit">
          </div>
          <small class="form-text text-muted">Не изменяйте токен видео-балансера без причины!<br></small>
          <small class="form-text text-muted">Получить новый токен можно на сайте: https://videocdn.tv/settings</small>
          </div> -->
      <!-- <p style="font-weight: 600;">Кастомизация</p> -->
      <p style="font-weight: 600; margin-top: 1em;">О приложении</p>
      <p>Версия приложения: {{ version }}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5em;">
        <button type="button" class="btn btn-dark" onclick="window.open('https://t.me/aniship', '_blank')">Telegram-канал приложения</button>
        <button type="button" class="btn btn-dark" onclick="window.open('https://github.com/progzone122/AniShip', '_blank')">GitHub-репозиторий приложения</button>
        <button type="button" class="btn btn-dark" onclick="window.open('https://t.me/DiabloSat', '_blank')">Telegram-канал разработчика</button>
        <button type="button" class="btn btn-dark" onclick="window.open('https://github.com/progzone122', '_blank')">Github разработчика</button>
      </div>
      <br>
      <p>В приложении используется официальные API сайтов animevost.org, anilibria.tv, shikimori.one, coub.com на некоммерческой основе!</p>
      <p style="font-weight: 600; margin-top: 1em;">Пожертвование</p>
      <button type="button" class="btn btn-dark" onclick="window.open('https://new.donatepay.ru/@programming_zone', '_blank')">DonatePay</button>
      <p style="margin-top: 1em;">Поддержите проект, только благодаря вам приложение всегда будет open source и полностью бесплатным.</p>
    </div>
  </div>
</template>
<script>
import { setEntry, getOneEntry, getAllKeys, removeEntry, clearStore } from '../../main/indexedDB.js'
import { exportDatabase, importDatabase } from '../../main/settings.js'
export default {
    name: 'Settings',
    data(){
        return {
          version: process.env.npm_package_version,
          voicer: localStorage.getItem('voicer'),
          animevost_server: localStorage.getItem('animevost_server')
        }
    },
    async mounted() {
      // this.videocdn_token = this.config.tokens.videocdn;
    },
    methods: {
      // videocdn_tokenSubmit(){
      //   this.config.tokens.videocdn = this.videocdn_token;
      //   writeConfig(this.config);
      // }
      SetAnimevostApi(url){
        localStorage.setItem('animevost_server', url);
        this.animevost_server = url;
      },
      clearDatabase(){
        clearStore("favorites", "animevost");
        clearStore("favorites", "anilibria");
        alert("База данных успешно очищена");
      },
      importDatabase(){
        alert(importDatabase(document.getElementById('importDirectory1').files[0].path, "utf8"));
      },
      async exportDatabase(){
        alert(await exportDatabase());
      },
      clearRecentHistory(){
        clearStore("recent_titles", "animevost");
        clearStore("recent_titles", "anilibria");
        alert("История последнего просмотренного успешно очищена");
      }
    }
}
</script>
<style scoped lang="scss">
@import "../assets/css/theme.scss";
h4{
  color: $h4_color;
}
p{
  color: $p_color;
}
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
.btn-dark {
  border: none;
}
a {
  text-decoration: none;
}
iframe{
    border: none;
}
.content .container {
  position: absolute;
  left: 7vw;
  padding-bottom: 10em;
}
</style>
<style lang="scss">
@import "../assets/css/theme.scss";
#animevostapi_dropdown ul{
  background-color: $liBlock_backgroundColor;
  padding: 1em;
}
</style>
