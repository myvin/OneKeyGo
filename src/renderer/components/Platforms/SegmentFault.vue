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
          ]
        }
      }
    },
    mounted () {
      this.readDb()
    },
    methods: {
      readDb () {
        this.segmentFault = Object.assign({}, this.$db.getState().platforms.segmentFault)
        console.log('segmentFault: ', this.$db.getState().platforms.segmentFault.token)
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