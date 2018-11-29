<template>
  <section>
    <transition mode='out-in' name='el-zoom-in-top'>
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  export default {}
</script>

<style lang='scss' scoped>
  section {
    flex: 1;
    overflow: scroll;
  }
</style>