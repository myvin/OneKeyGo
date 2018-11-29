<template>
  <div id='about'>
    <div class="intro">
      <img class='logo' src="/static/assets/logo.png" alt="logo">
      <div>
        <div class="name">OneKeyGo</div>
        <ul class="infos">
          <li>Copyright: 2018-present, myvin</li>
          <li>Author: {{pkg.author}}</li>
          <li>Github: https://github.com/myvin</li>
          <li>Version: {{pkg.version}}</li>
        </ul>
      </div>
    </div>
    <div class="actions">
      <div class="btn support" @click='open("https://github.com/myvin/OneKeyGo#%E8%AF%B7%E5%96%9D%E5%92%96%E5%95%A1")'>支持该项目</div>
      <div class="btn visit" @click='open("https://github.com/myvin/OneKeyGo")'>查看源码</div>
    </div>
  </div>
</template>

<script>
  import pkg from '../../../package.json'
  export default {
    name: 'about',
    data () {
      return {
        pkg: pkg
      }
    },
    mounted () {},
    methods: {
      open (link) {
        this.$electron.remote.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  #about {
    padding: 20px 20px 30px;
  }
  .logo {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  .intro {
    display: flex;
    font-size: 12px;
    line-height: 1.6em;
  }
  .intro .name {
    font-size: 40px;
    line-height: 0.8em;
    color: #b1b1b1;
  }
  .intro .infos {
    margin-top: 10px;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 13px;
  }
  .actions .btn {
    background: #fff;
    width: 9em;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
  }
</style>
