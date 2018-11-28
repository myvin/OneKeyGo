<template>
  <div id="publish">
    <mavon-editor style='height: 100%;' v-model="article"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: ''
      }
    }
  }
</script>

<style lang='scss' scoped>
  #publish {
    height: 100vh;
    overflow: scroll;
  }
</style>