<template>
  <div id="draft">
    <div class='formtitle'>{{$route.meta.label}}</div>
    <el-card class="article" v-if='article.title || article.content'>
      <div slot="header">
        <span>{{article.title ? article.title : '无标题'}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click='$router.push({path: "edit"})'>编辑</el-button>
      </div>
      <div>{{getAbstract()}}</div>
    </el-card>
    <el-alert v-if='!article.title && !article.content.html'
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
          content: {
            md: '',
            html: ''
          }
        }
      }
    },
    mounted () {
      this.article = Object.assign({}, this.$db.get('article').value())
    },
    methods: {
      getAbstract () {
        let abstract = this.article.content.html.replace(/<br\/>/g, '').replace(/<[^>]+>/g, '').replace(/&#34;/g, '"')
        return abstract.length >= 80 ? abstract.substr(0, 80) + '...' : (!abstract.length ? '无内容' : abstract)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #draft {
    padding: 30px;
    box-sizing: border-box;
  }
</style>