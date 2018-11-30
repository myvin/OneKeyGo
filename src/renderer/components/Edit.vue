<template>
  <div id="publish">
    <header>
      <input class='title' type="text" placeholder="请输入标题" v-model='article.title'>
      <div class='actions'>
        <el-button type="text" size='mini' @click='saveDraft' :disabled='!article.title && !article.content'>保存草稿</el-button>
        <el-button type="primary" plain size='mini' @click='$router.push({path: "publish"})' :disabled='!article.title && !article.content'>去发布</el-button>
      </div>
    </header>
    <mavon-editor ref='editor' @change='inputChange' :toolbarsFlag='false' class='editor' v-model="article.content.md"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        article: {
          content: {}
        }
      }
    },
    mounted () {
      this.article = Object.assign({}, this.$db.get('article').value())
    },
    beforeRouteLeave (to, from, next) {
      this.$electron.remote.dialog.showMessageBox({
        type: 'question',
        buttons: ['离开', '取消'],
        title: '确定离开？',
        message: '确定离开？',
        detail: '还未保存，离开该页面后修改的内容将丢失'
      }, (res) => {
        if (res === 0) {
          next()
        } else {
          next(false)
        }
      })
    },
    methods: {
      inputChange (md, html) {
        this.article.content = {
          md,
          html
        }
      },
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