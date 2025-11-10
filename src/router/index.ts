import { useSystemStore } from '@/store/system'
import { KeepAlive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'
const routers = [
    {
        name: 'index',
        path: '/', // 根路径, 注意：一个应用只能有一个根路径
        component: () => import('@/views/index/Index.vue'),
        redirect: '/home', // 重定向到首页
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('@/views/index/Home.vue') // 路由组件
            },
            {
                name: 'mine',
                path: '/mine',
                component: () => import('@/views/index/Mine.vue')
            }
        ]
    },
    {
        name: 'business',
        path: '/business',
        component: () => import('@/views/Main.vue'), // 路由组件
        children: [
            {
                name: '在线报修',
                path: '/repair/add',
                component:() => import('@/views/service/repair/Add.vue'),
                meta: { // meta元信息
                    KeepAlive: false
                }
            },
            {
            name: '房产详情',
            path: '/house/detail',
            component: () => import('@/views/house/HouseDetail.vue'),
            meta: {
                title: '房产详情',
                KeepAlive: false
                }
            }
        ],
        props: (route: RouteLocationNormalized) => ({
            title: route.query.title || route.params.title || route.name
        })
    },
    {
        name: 'login', // 路由名称
        path: '/login', // 路由路径
        component: () => import('@/views/login/Login.vue') // 路由组件
    }
]
// 创建路由实例{name}
const router = createRouter({
    history: createWebHistory(), // HTML5模式
    // history: createWebHashHistory(), // hash模式 /#/login
    routes: routers
})
// 导航守卫
router.beforeEach((to: RouteLocationNormalized, 
    from: RouteLocationNormalizedLoaded, 
    next: NavigationGuardNext) => {
    // 判断用户是否登录，如果已经登录，则直接放行，否则跳转到登录页面
    const systemStore = useSystemStore()
    const isLogin = systemStore.isLogin
    if(to.path !== '/login' && !isLogin) {
        next({path: '/login'})
    } else {
        next()
    }
})
// 导出路由实例
export const getRouter = () => {
    return router
}
export default router
