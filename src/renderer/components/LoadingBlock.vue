<template>
  <div class="b">
    <b-icon icon="hourglass-split" animation="spin" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
    name: 'LoadingBlock',
    props: ['message']
}
</script>
<style scoped>
    .b{
        width: 20em;
        background-color: rgb(39, 39, 39);
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 1em;
        padding-left: 2em;
        padding-right: 2em;
        padding-top: 1em;
        padding-bottom: 1em;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
    }
    .b svg{
        color: white;
        margin-right: 1em;
        width: 1em;
        height: 1em;
    }
    .b p{
        color: white;
        height: -1em;
        margin: 0;
    }
</style>