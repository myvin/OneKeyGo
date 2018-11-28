<template>
  <aside>
    <el-menu
      background-color='#404040'
      text-color='#fff'
      default-active="/edit"
      router
    >
      <template v-for="(item, index) in menu">
        <el-submenu :index="index+''" v-if="item.children && item.children.length">
          <template slot="title"><i :class="[item.meta.icon]"></i><span>{{ item.meta.label }}</span></template>
          <el-menu-item v-for="child in item.children" v-if="child.meta.hidden !== true" :index="child.path" :key="child.path"><i :class="[child.meta.icon]"></i><span>{{ child.meta.label }}</span></el-menu-item>
        </el-submenu>
        <el-menu-item v-if="!item.children || item.children.length === 0" :index="item.path"><i :class="[item.meta.icon]"></i><span>{{ item.meta.label }}</span></el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        menu: 'menuItems'
      })
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  aside {
    height: 100vh;
    flex: 0 0 230px;
    width: 230px;
    overflow-x: hidden;
    .el-menu {
      height: 100%;
      border-right: none;
      background: transparent;
    }
  }
</style>
