<template>
  <div id="draft">
    <div class='formtitle'>{{$route.meta.label}}</div>
    <el-card class="article" v-if='article.title || article.content'>
      <div slot="header">
        <span>{{article.title ? article.title : '无标题'}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click='$router.push({path: "edit"})'>编辑</el-button>
      </div>
      <div>{{article.content.length >= 80 ? article.content.substr(0, 80) + '...' : (!article.content.length ? '无内容' : article.content)}}</div>
    </el-card>
    <el-alert v-if='!article.title && !article.content'
      title="草稿箱空空如也"
      type="info"
      center
      :closable='false'
      show-icon>
    </el-alert>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: {
          title: '',
          content: ''
        }
      }
    },
    mounted () {
      this.article = this.$db.get('article').value()
    }
  }
</script>

<style lang='scss' scoped>
  #draft {
    padding: 30px;
    box-sizing: border-box;
  }
</style>