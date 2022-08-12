<template>
  <div class="block">
    <iframe :src="url" allowfullscreen frameborder="0" />
    <h4>{{ coub.title }}</h4>
    <div class="tags">
      <button v-for="i in coub.tags" type="button" class="btn btn-dark">{{ i.title }}</button>
    </div>
  </div>
</template>
<script>
export default {
    name: 'CoubBlockComponent',
    props: ['coub'],
    data() {
        return {
            url: "https://coub.com/embed/" + this.coub.permalink + "?muted=false&autostart=false&originalSize=true&startWithHD=false"
        }
    },
    methods: {
        // hide(){
        //     var iframe = document.getElementsByTagName('iframe')[0];
        //     var iframeDoc = iframe.contentWindow.document;
        //     iframeDoc.getElementsByClassName('viewer__suggests')[0].style.display = 'none';
        // }
    }
}
</script>
<style scoped lang="scss">
    @import "../assets/css/theme.scss";
    .block{
        height: 60%;
        width: 80%;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        margin-bottom: 3em;
        iframe{
            height: 50vh;
            margin-top: 0;
        }
    }
    .tags{
        padding: 0;
        width: 100%;
        max-height: 6em;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        button {
            border-radius: 1em;
            height: 2.3em;
        }
    }
    h4{
        color: $h4_color;
    }
</style>