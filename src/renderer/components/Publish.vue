<template>
  <div id='publish'>
    <div class='formtitle'>{{$route.meta.label}}</div>
    <ul v-for="(item, index) in menu" :key='index' v-if='item.name === "Platforms"'>
      <li v-for="(child, i) in item.children" :key='i'>
        <span style='width: 6em;display: inline-block;'>{{child.meta.label}}</span>
        <el-switch
          v-model="form[child.name.toLowerCase()]">
        </el-switch>
        <el-alert style='margin-top: 20px;'
          title="未发布"
          :closable="false"
          type="info"
          show-icon>
        </el-alert>
      </li>
    </ul>
    <el-row style='margin-top: 20px;'>
      <el-button type='primary'>一键发布</el-button>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapGetters({
        menu: 'menuItems'
      })
    },
    methods: {
      test () {
        console.log(this.form)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #publish {
    padding: 30px;
    box-sizing: border-box;
    li {
      margin-bottom: 10px;
    }
  }
</style>