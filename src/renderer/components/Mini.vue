<template>
  <div>{{$route.meta.label}}</div>
</template>

<script>
  export default {
    name: 'mini',
    data () {
      return {}
    },
    mounted () {
      // this.$electron.ipcRenderer.send('setTrayTitle', 'OneKeyGo')
    },
    methods: {}
  }
</script>

<style>
</style>
