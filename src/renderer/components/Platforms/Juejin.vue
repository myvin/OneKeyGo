<template>
  <div id="juejin">
    <div class='formtitle'>{{$route.meta.label}}平台设置</div>
      <el-form ref="refName" :model="form" :rules='rules' label-width="6em" size='small'>
        <el-form-item label="账号" prop='account'>
          <el-input placeholder='请输入手机号或邮箱' v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input placeholder='请输入密码' v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot='label'>clientId</template>
          <template>
            <el-input placeholder='clientId' :disabled='true' v-model='juejin.clientId'></el-input>
            <i class='el-icon-info tip'></i> <span class='tip'>调用 API 必须的参数一</span>
          </template>
        </el-form-item>
        <el-form-item>
          <template slot='label'>token</template>
          <template>
            <el-input placeholder='token' :disabled='true' v-model='juejin.token'></el-input>
            <i class='el-icon-info tip'></i> <span class='tip'>调用 API 必须的参数二</span>
          </template>
        </el-form-item>
        <el-form-item>
          <template slot='label'>userId</template>
          <template>
            <el-input placeholder='userId' :disabled='true' v-model='juejin.userId'></el-input>
            <i class='el-icon-info tip'></i> <span class='tip'>调用 API 必须的参数三</span>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button plain size='small' type="primary" @click="validate('refName')" icon='el-icon-question'>验证账号</el-button>
          <el-button plain size='small' type="success" @click="create('refName')" icon='el-icon-circle-check'>创建/更新账号信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain size='small' type='warning' @click="resetForm('refName')" icon='el-icon-circle-close'>重置表单</el-button>
          <el-button plain size='small' type='danger' @click="remove" icon='el-icon-delete'>删除本地账号信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login } from '../../../utils/juejinPublish'
  export default {
    data () {
      return {
        juejin: {},
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入手机号或邮箱', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.readDb()
    },
    methods: {
      readDb () {
        this.juejin = this.$db.getState().platforms.juejin
      },
      async login (create) {
        try {
          const d = await login({
            phoneNumber: this.form.account,
            password: this.form.password
          })
          if (create) {
            const juejin = {
              token: d.token,
              userId: d.userId,
              clientId: d.clientId
            }
            this.juejin = juejin
            this.$db.set('platforms.juejin', juejin).write()
          }
          this.$notify.success({
            title: create ? '创建结果' : '验证结果',
            message: create ? '账号信息创建/更新成功！' : '账号信息正确'
          })
        } catch (err) {
          const status = err.response.status
          if (status === 401) {
            this.$notify.error({
              title: '提示',
              message: '密码错误，请重新填写'
            })
          } else if (status === 404) {
            this.$notify.error({
              title: '提示',
              message: '账号不存在，请重新填写'
            })
          }
        }
      },
      validate (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            return false
          }
        })
      },
      create (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login('create')
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      remove () {
        const juejin = {
          token: '',
          userId: '',
          clientId: ''
        }
        this.juejin = juejin
        this.$db.set('platforms.juejin', juejin).write()
        this.$notify.success({
          title: '提示',
          message: '本地账号信息删除完成'
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .tip {
    font-size: 12px;
  }
</style>