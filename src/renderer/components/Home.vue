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
    methods: {}
  }
</script>

<style lang="scss" scoped>
  #home {
    display: flex;
  }
</style>
