import Juejin from '@/components/Platforms/Juejin'
import Jianshu from '@/components/Platforms/Jianshu'
import SegmentFault from '@/components/Platforms/SegmentFault'
import Bokeyuan from '@/components/Platforms/Bokeyuan'
import Kaiyuanzhongguo from '@/components/Platforms/Kaiyuanzhongguo'
import Shaoshupai from '@/components/Platforms/Shaoshupai'

export default {
  name: 'Platforms',
  meta: {
    icon: 'el-icon-menu',
    label: '发布平台设置'
  },
  children: [
    {
      name: 'Juejin',
      path: '/platforms/juejin',
      meta: {
        icon: 'el-icon-edit-outline',
        label: '掘金'
      },
      component: Juejin
    },
    {
      name: 'Jianshu',
      path: '/platforms/jianshu',
      meta: {
        icon: 'el-icon-edit-outline',
        label: '简书'
      },
      component: Jianshu
    },
    {
      name: 'SegmentFault',
      path: '/platforms/segmentFault',
      meta: {
        icon: 'el-icon-edit-outline',
        label: 'SegmentFault'
      },
      component: SegmentFault
    },
    {
      name: 'Bokeyuan',
      path: '/platforms/bokeyuan',
      meta: {
        icon: 'el-icon-edit-outline',
        label: '博客园'
      },
      component: Bokeyuan
    },
    {
      name: 'Kaiyuanzhongguo',
      path: '/platforms/kaiyuanzhongguo',
      meta: {
        icon: 'el-icon-edit-outline',
        label: '开源中国'
      },
      component: Kaiyuanzhongguo
    },
    {
      name: 'Shaoshupai',
      path: '/platforms/shaoshupai',
      meta: {
        icon: 'el-icon-edit-outline',
        label: '少数派'
      },
      component: Shaoshupai
    }
  ]
}
