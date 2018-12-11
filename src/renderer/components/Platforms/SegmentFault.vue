<template>
  <div id="segmentFault">
    <setting-title></setting-title>
    <el-form label-position='left' ref="form" :model="form" :rules='rules' label-width="7em" size='small'>
      <el-form-item label="账号" prop='account'>
        <el-input placeholder='请输入手机号或邮箱' v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password'>
        <el-input placeholder='请输入密码' v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <template slot='label'>PHPSESSID</template>
        <template>
          <el-input placeholder='PHPSESSID' :disabled='true' v-model='segmentFault.PHPSESSID'></el-input>
          <i class='el-icon-info tip'></i> <span class='tip'>服务端生成的 SESSIONID</span>
        </template>
      </el-form-item>
      <el-form-item>
        <template slot='label'>标签</template>
        <template>
          <el-select @change='tagsChange' style='width: 100%;'
            :disabled='disabled'
            v-model="tags"
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
              :label="item.name + ',' + item.id"
              :value="item.id">
              <span style="float: left">{{item.name}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">tagId: {{item.id}}</span>
            </el-option>
          </el-select>
          <i class='el-icon-info tip'></i> <span class='tip'>发布文章时必填项；需先填写账号信息方可搜索。</span>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button size='small' type="primary" @click="save('form')" icon='el-icon-success'>保存/更新本地账号信息</el-button>
          <el-button size='small' type='danger' @click="remove" icon='el-icon-delete'>删除本地账号信息</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-alert
      title="token 参数"
      description="在发送 API 请求时，还有一个必须参数 token，token 需要在页面内动态获取，不过不用担心，OneKeyGo 已经帮你做了。感兴趣的可以打开 segmentfault 任意页面，在源代码中搜索 w.SF.token，这个 function 就是用来生成 token 的。"
      type="info"
      show-icon
      :closable="false">
    </el-alert>
  </div>
</template>

<script>
  import { getWriteToken, login, search } from '../../../utils/segmentFaultPublish'
  import SettingTitle from '../SettingTitle'

  export default {
    components: {
      settingTitle: SettingTitle
    },
    data () {
      return {
        tags: [],
        tagsLen: 0,
        tagsToSave: [],
        writeToken: '',
        segmentFault: {},
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入手机号或邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        loading: false,
        searchResults: []
      }
    },
    computed: {
      disabled () {
        let PHPSESSID = this.segmentFault.PHPSESSID
        if (!PHPSESSID || !PHPSESSID.replace(/\s+/g, '')) {
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
        this.segmentFault = Object.assign({}, this.$db.read().get('platforms.segmentFault').value())
        this.tagsToSave = this.segmentFault.tags || []
        this.tags = (this.segmentFault.tags || []).map(item => {
          return `${item.name},${item.id}`
        })
        this.tagsLen = this.tags.length
      },
      login () {
        let loading = this.$loading({
          lock: true,
          text: '努力加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        login({
          remember: 1,
          username: this.form.account,
          password: this.form.password
        }, (res, token, PHPSESSID) => {
          if (res.status === 0) {
            this.writeSession(PHPSESSID)
          } else {
            this.$notify({
              title: '信息有误',
              message: JSON.stringify(res.data[1]),
              type: 'error'
            })
          }
        }, (err, token, PHPSESSID) => {
          console.log('login catch err: ', err)
          if (err.statusCode === 302) {
            this.writeSession(PHPSESSID)
            return
          }
          this.$notify({
            title: '提示',
            message: err.message || '登录失败，请稍后重试',
            type: 'error'
          })
        })
        loading.close()
      },
      writeSession (PHPSESSID) {
        this.segmentFault = {
          PHPSESSID
        }
        this.$db.set('platforms.segmentFault.PHPSESSID', PHPSESSID).write()
        this.$notify({
          title: '提示',
          message: '账号信息保存/更新成功!',
          type: 'success'
        })
      },
      save (formName) {
        if (!this.segmentFault.PHPSESSID) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$db.set('platforms.segmentFault', this.segmentFault).write()
              this.login()
            } else {
              this.$notify({
                title: '提示',
                message: '请填写必填选项',
                type: 'info'
              })
              return false
            }
          })
        } else {
          if (this.tags.length) {
            this.$db.set('platforms.segmentFault.tags', this.tagsToSave).write()
            this.$notify({
              title: '提示',
              message: '文章标签保存成功!',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '提示',
              message: '请填写文章标签',
              type: 'info'
            })
          }
        }
      },
      remove () {
        this.segmentFault = {}
        this.$db.set('platforms.segmentFault', {}).write()
        this.$notify({
          title: '删除提示',
          message: '本地账号信息删除完成!',
          type: 'success'
        })
      },
      tagsChange (ids) {
        ids = ids || []
        let arr = []
        if (this.tagsLen > this.tags.length) {
          // 删除了标签
          for (let i = 0, len = ids.length; i < len; i++) {
            let obj = this.tagsToSave.find(item => {
              return item.id === ids[i].split(',')[1]
            })
            arr.push(obj)
          }
          this.tagsToSave = arr
        } else if (this.tagsLen < this.tags.length) {
          // 添加了标签
          let obj = this.searchResults.find(item => {
            return item.id === ids[ids.length - 1]
          })
          this.tagsToSave.push(obj)
        }
        this.tagsLen = this.tags.length
      },
      async search (query) {
        if (!this.writeToken) {
          this.writeToken = await getWriteToken()
        }
        if (query !== '') {
          this.loading = true
          try {
            const data = await search({
              token: this.writeToken,
              PHPSESSID: this.segmentFault.PHPSESSID,
              q: query
            })
            if (data.status === 0) {
              this.loading = false
              this.searchResults = data.data
            } else {
              this.$notify({
                title: '搜索标签',
                message: '搜索标签发生错误!',
                type: 'error'
              })
            }
          } catch (err) {
            console.log('search catch err: ', err)
            if (err.statusCode === 404) {
              this.$notify({
                title: '提示',
                message: '请核对账号信息是否正确!',
                type: 'error'
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