import Vue from 'vue'
import Router from 'vue-router'
import menuModule from '@/store/modules/menu'

Vue.use(Router)

// Generate routes
const generateRoutesFromMenu = (menu = [], routes = []) => {
  for (let i = 0, l = menu.length; i < l; i += 1) {
    const item = menu[i]

    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: require('@/components/Home').default,
      children: [
        ...generateRoutesFromMenu(menuModule.state.items)
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default
    },
    {
      path: '/mini',
      name: 'mini',
      component: require('@/components/Mini').default
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
