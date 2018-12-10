<template>
  <div id="segmentFault">
    <div class='formtitle'>{{$route.meta.label}}平台设置</div>
    <el-form label-position='left' ref="form" :model="segmentFault" :rules='rules' label-width="7em" size='small'>
      <el-form-item prop='PHPSESSID'>
        <template slot='label'>PHPSESSID</template>
        <template>
          <el-input placeholder='PHPSESSID' v-model='segmentFault.PHPSESSID'></el-input>
          <i class='el-icon-info tip'></i> <span class='tip'>复制 cookie 中的 PHPSESSID</span>
        </template>
      </el-form-item>
      <el-form-item prop='token'>
        <template slot='label'>token</template>
        <template>
          <el-input placeholder='token' v-model='segmentFault.token'></el-input>
          <i class='el-icon-info tip'></i> <span class='tip'>登录网页版后，随便打开一个页面，查看页面源码，找到 w.SF.token function，执行该 function 后返回的字符串作为 token</span>
        </template>
      </el-form-item>
      <el-form-item prop='tags'>
        <template slot='label'>标签</template>
        <template>
          <el-select style='width: 100%;'
            :disabled='disabled'
            v-model="segmentFault.tags"
            multiple
            :multiple-limit='5'
            filterable
            remote
            placeholder="文章标签，最多 5 个"
            no-data-text='没有该 tag'
            :remote-method="search"
            :loading="loading">
            <el-option
              v-for="item in searchResults"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <i class='el-icon-info tip'></i> <span class='tip'>发布文章时必填项；需先填写账号信息方可搜索。</span>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size='small' type="primary" @click="save('form')" icon='el-icon-success'>确定</el-button>
          <el-button size='small' type='danger' @click="remove" icon='el-icon-delete'>删除本地账号信息</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { search } from '../../../utils/segmentFaultPublish'

  export default {
    data () {
      return {
        segmentFault: {},
        rules: {
          PHPSESSID: [
            { required: true, message: '请输入 PHPSESSID', trigger: 'blur' }
          ],
          token: [
            { required: true, message: '请输入 token', trigger: 'blur' }
          ],
          tags: [
            { type: 'array', required: true, message: '至少填写一个标签', trigger: 'blur' }
          ]
        },
        loading: false,
        searchResults: []
      }
    },
    computed: {
      disabled () {
        let PHPSESSID = this.segmentFault.PHPSESSID
        let token = this.segmentFault.token
        if (!PHPSESSID || !PHPSESSID.replace(/\s+/g, '') || !token || !token.replace(/\s+/g, '')) {
          return true
        }
        return false
      }
    },
    mounted () {
      this.readDb()
    },
    methods: {
      readDb () {
        this.segmentFault = Object.assign({}, this.$db.getState().platforms.segmentFault)
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$db.set('platforms.segmentFault', this.segmentFault).write()
            this.notification({
              title: '提示',
              body: '保存成功!'
            })
          } else {
            return false
          }
        })
      },
      remove () {
        this.segmentFault = {}
        this.$db.set('platforms.segmentFault', {}).write()
        this.notification({
          title: '删除提示',
          body: '本地账号信息删除完成!'
        })
      },
      notification ({
        title,
        body
      }) {
        let notification = new this.$electron.remote.Notification({
          title,
          body
        })
        notification.show()
        notification.onclick = () => {
          notification.close()
        }
      },
      async search (query) {
        if (query !== '') {
          this.loading = true
          try {
            const data = await search({
              token: this.segmentFault.token,
              PHPSESSID: this.segmentFault.PHPSESSID,
              q: query
            })
            if (data.status === 0) {
              this.loading = false
              this.searchResults = data.data
            } else {
              this.notification({
                title: '搜索标签',
                body: '搜索标签发生错误'
              })
            }
          } catch (err) {
            if (err.statusCode === 404) {
              this.notification({
                title: '提示',
                body: '请核对账号信息是否正确!'
              })
            }
          }
        } else {
          this.searchResults = []
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #segmentFault {
    padding: 30px;
    box-sizing: border-box;
    .tip {
      font-size: 12px;
    }
  }
</style>