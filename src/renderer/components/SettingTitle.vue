<template>
  <div class='formtitle'>{{$route.meta.label}}{{plain ? '' :  '平台设置'}}<span v-if='!plain' class='subtitle'>{{$route.meta.label}}官网 <i @click='open($route.meta.webUrl)' class='el-icon-share'></i></span></div>
</template>

<script>
  export default {
    props: {
      plain: Boolean
    },
    methods: {
      open (link) {
        this.$electron.remote.shell.openExternal(link)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .formtitle {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    .subtitle {
      font-size: 12px;
      color: #909399;
      padding-left: 1em;
      i {
        cursor: pointer;
      }
    }
  }
</style>