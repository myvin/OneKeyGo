<template>
  <div id="publish">
    <header>
      <input class='title' type="text" placeholder="请输入标题" v-model='article.title'>
      <div class='actions'>
        <span style='font-size: 12px;color: #777;padding-right: 10px;'>{{saveTip}}</span>
        <el-button type="primary" plain size='mini' @click='saveDraft' :disabled='!article.title && !article.content.md'>保存草稿</el-button>
        <el-button type="primary" size='mini' @click='$router.push({path: "publish"})' :disabled='!article.title && !article.content'>去发布</el-button>
      </div>
    </header>
    <mavon-editor ref='editor' @change='inputChange' :toolbarsFlag='false' class='editor' v-model="article.content.md"/>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  export default {
    data () {
      return {
        saveTip: '',
        article: {
          content: {}
        }
      }
    },
    mounted () {
      this.article = Object.assign({}, this.$db.get('article').value())
    },
    beforeRouteLeave (to, from, next) {
      if (_.isEqual(this.article, this.$db.get('article').value())) {
        next()
      } else {
        this.$electron.remote.dialog.showMessageBox({
          type: 'question',
          buttons: ['保存', '不保存'],
          title: '是否保存？',
          message: '是否保存？',
          detail: '文章内容已修改，离开前是否保存？'
        }, (res) => {
          if (res === 0) {
            this.saveDraft()
            next()
          } else {
            next()
          }
        })
      }
    },
    methods: {
      inputChange (md, html) {
        this.article.content = {
          md,
          html
        }
      },
      saveDraft () {
        this.saveTip = '保存中...'
        const article = {
          title: this.article.title,
          content: this.article.content
        }
        this.$db.set('article', article).write()
        this.saveTip = `${moment().format('YYYY/MM/DD HH:mm:ss')} 已保存`
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