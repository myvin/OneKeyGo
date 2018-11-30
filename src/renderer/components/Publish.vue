<template>
  <div id='publish'>
    <div class='formtitle'>{{$route.meta.label}}</div>
    <ul>
      <li v-for="(child, index) in children" :key='index'>
        <span style='width: 6em;display: inline-block;'>{{child.meta.label}}</span>
        <el-switch
          v-model="publishSettings[child.name.toLowerCase()]">
        </el-switch>
        <el-alert style='margin-top: 20px;'
          :title="getInfo(child).title"
          :closable="false"
          :type="getInfo(child).type"
          show-icon>
        </el-alert>
      </li>
    </ul>
    <el-row style='margin-top: 20px;'>
      <el-button type='primary' @click='checkAllAccounts(true)'>一键发布</el-button>
      <el-button type='primary' @click='setDefaultSettings'>保存为默认设置</el-button>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    data () {
      return {
        platforms: {},
        publishSettings: {},
        children: []
      }
    },
    computed: {
      ...mapGetters({
        menu: 'menuItems'
      })
    },
    mounted () {
      this.getPlatforms()
      this.getSettingsPublish()
      this.getChildren()
      this.checkAllAccounts()
    },
    methods: {
      getPlatforms () {
        this.platforms = this.$db.get('platforms').value()
      },
      getSettingsPublish () {
        this.publishSettings = JSON.parse(JSON.stringify(this.$db.getState().settings.publish))
      },
      getChildren () {
        let menu = JSON.parse(JSON.stringify(this.menu))
        for (let i = 0, len = menu.length; i < len; i++) {
          if (menu[i].name === 'Platforms') {
            this.children = menu[i].children
            break
          }
        }
      },
      getInfo (item) {
        let title = ''
        let type = 'info'
        if (item.meta.switch) {
          title += '是否要发布到平台: 是'
        } else {
          title += '是否要发布到平台: 否'
        }
        if (item.meta.hasAccount) {
          title += ' / 本地有无平台账号信息: 有'
        } else {
          title += ' / 本地有无平台账号信息: 无'
          type = 'warning'
        }
        return {
          title,
          type
        }
      },
      checkAllAccounts (publish) {
        let children = this.children
        for (let i = 0, len = children.length; i < len; i++) {
          if (_.isEmpty(this.platforms[children[i].name.toLowerCase()])) {
            children[i].meta.hasAccount = false
            if (publish && this.publishSettings[children[i].name.toLowerCase()]) {
              let notification = new this.$electron.remote.Notification({
                title: '提示',
                body: '请先设置要发布的平台账号！'
              })
              notification.show()
              notification.onclick = () => {
                notification.close()
              }
            }
          } else {
            children[i].meta.hasAccount = true
          }
        }
        this.children = children
      },
      setDefaultSettings (to, from, next) {
        this.$db.set('settings.publish', this.publishSettings).write()
        let notification = new this.$electron.remote.Notification({
          title: '提示',
          body: '保存成功！'
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
    padding: 30px;
    box-sizing: border-box;
    li {
      margin-bottom: 10px;
    }
  }
</style>