<template>
  <div>
    <div class='title'>{{$route.meta.label}}平台设置</div>
      <el-form :ref="refName" :model="form" :rules='rules' label-width="4em" size='small'>
        <el-form-item label="账号" prop='account'>
          <el-input placeholder='请输入手机号或邮箱' v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input placeholder='请输入密码' v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain size='small' type="primary" @click="validate(refName)" icon='el-icon-question'>验证账号</el-button>
          <el-button plain size='small' type="success" @click="create(refName)" icon='el-icon-circle-check'>立即创建</el-button>
          <el-button plain size='small' type='warning' @click="resetForm(refName)" icon='el-icon-circle-close'>重置表单</el-button>
          <el-button plain size='small' type='danger' @click="remove(refName)" icon='el-icon-delete'>删除本地账号</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
    props: ['refName'],
    data () {
      return {
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
    methods: {
      validate () {},
      create (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      remove () {}
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
