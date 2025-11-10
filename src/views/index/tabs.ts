import home from '@/assets/images/index/home.png'
import homeActive from '@/assets/images/index/home-active.png'
import district from '@/assets/images/index/district.png'
import districtActive from '@/assets/images/index/district-active.png'
import houseKeeper from '@/assets/images/index/housekeeper.png'
import houseKeeperActive from '@/assets/images/index/housekeeper-active.png'
import mine from '@/assets/images/index/mine.png'
import mineActive from '@/assets/images/index/mine-active.png'
/**
 * 底部导航栏tab配置
 */
interface TabItem {
    // 标题
    title: string
    // 图标
    icon: string
    // 激活图标
    activeIcon: string
    //路由地址
    routerLink: string
}

export const tabList: Array<TabItem> = [
    {
        title: '首页',
        icon: home,
        activeIcon: homeActive,
        routerLink: '/home'
    }, {
        title: '30min商圈',
        icon: district,
        activeIcon: districtActive,
        routerLink: '/market'
    }, {
        title: '善管家',
        icon: houseKeeper,
        activeIcon: houseKeeperActive,
        routerLink: '/houseKeeper'
    }, {
        title: '我的',
        icon: mine,
        activeIcon: mineActive,
        routerLink: '/mine'
    },
]

