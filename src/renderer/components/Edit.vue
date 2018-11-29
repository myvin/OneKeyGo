<template>
  <div id="publish">
    <header>
      <input class='title' type="text" placeholder="请输入标题" v-model='article.title'>
      <div class='actions'>
        <el-button type="text" size='mini' @click='saveDraft'>保存草稿</el-button>
      </div>
    </header>
    <mavon-editor class='editor' v-model="article.content"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: {}
      }
    },
    mounted () {
      this.article = this.$db.get('article').value()
    },
    methods: {
      saveDraft () {
        const article = {
          title: this.article.title,
          content: this.article.content
        }
        this.$db.set('article', article).write()
        let notification = new this.$electron.remote.Notification({
          title: '提示',
          body: '草稿保存成功！'
        })
        notification.show()
        notification.onclick = () => {
          notification.close()
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #publish {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      .title {
        flex: 1;
        border: none;
        height: 60px;
        line-height: 60px;
        outline: 0;
        padding: 0 25px;
        box-sizing: border-box;
      }
      .actions {
        padding: 0 20px;
      }
    }
    .editor {
      flex: 1;
    }
  }
</style>