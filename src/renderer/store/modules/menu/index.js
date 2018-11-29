import platforms from './platforms'

const menuState = {
  items: [
    {
      name: 'Edit',
      path: '/edit',
      meta: {
        icon: 'el-icon-edit',
        label: '写文章'
      },
      component: require('@/components/Edit').default
    },
    {
      name: 'Draft',
      path: '/draft',
      meta: {
        icon: 'el-icon-document',
        label: '草稿箱'
      },
      component: require('@/components/Draft').default
    },
    {
      name: 'Publish',
      path: '/publish',
      meta: {
        icon: 'el-icon-upload',
        label: '一键发布'
      },
      component: require('@/components/Publish').default
    },
    platforms,
    {
      name: 'Setting',
      path: '/setting',
      meta: {
        icon: 'el-icon-setting',
        label: '设置'
      },
      component: require('@/components/Setting').default
    }
  ]
}

const mutations = {
}

const getters = {
  menuItems (state) {
    return state.items
  }
}

export default {
  state: menuState,
  mutations,
  getters
}
