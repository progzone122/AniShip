<template>
  <nuxt-link :to="{ path: 'WatchAnime', query: { id: id, voicer: voicer } }">
    <div class="main">
      <div class="preview" :style="{ 'background-image': 'url(' + preview + ')' }">
        <div class="block">
          <p class="name">{{ name }}</p>
        </div>
      </div>
    </div>        
  </nuxt-link>
</template>
<script>
export default {
    name: 'TitleBlock',
    props: ['title', 'voicer'],
    data(){
        return{
            id: this.title.id,
            name: this.title.title,
            preview: this.title.urlImagePreview
        }
    }
}
</script>
<style scoped>
a{
    text-decoration: none;
}
.main{
    height: 28vw;
    padding: 0;
    overflow: hidden;
}
.preview{
    width: 100%;
    height: 100%;
    padding: 0;
    background-size: cover;
    transform: scale(1);
}
.preview:hover{
    animation: zoom 0.5s cubic-bezier(0, 0.55, 0.45, 1);
    transform: scale(0.9);
}
.block{
    padding: 1em;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.8813900560224089) 36%,
        rgba(0, 0, 0, 0.404079131652661) 100%
    );
    word-break: break-all;
    display: flex;
    align-items: flex-end;
}
.name{
    color: white;
    font-size: medium;
}
@keyframes zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
  }
}
</style>