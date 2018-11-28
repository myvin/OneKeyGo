<template>
  <div id='home'>
    <onekey-sider></onekey-sider>
    <app-container></app-container>
  </div>
</template>

<script>
  import Sider from './Sider'
  import Container from './ContentContainer'
  export default {
    name: 'home',
    components: {
      onekeySider: Sider,
      appContainer: Container
    },
    data () {
      return {}
    },
    mounted () {},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      notify () {
        let notification = new Notification('title', {
          body: 'content',
          icon: '/static/weather.png'
        })
        notification.onclick = () => {
          console.log('通知被点击')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home {
    display: flex;
  }
</style>
