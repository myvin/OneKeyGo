<template>
  <div id="publish">
    <input class='title' type="text" placeholder="请输入标题" v-model='title'>
    <mavon-editor class='editor' v-model="article"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        article: ''
      }
    }
  }
</script>

<style lang='scss' scoped>
  #publish {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
    .title {
      border: none;
      height: 60px;
      line-height: 60px;
      outline: 0;
      padding: 0 25px;
      box-sizing: border-box;
    }
    .editor {
      flex: 1;
    }
  }
</style>