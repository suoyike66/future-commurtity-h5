<template>
    <!-- 显示与当前路由匹配的组件 -->
    <router-view v-slot="{ Component, route }">
        <!-- 组件缓存，在组件切换时保持组件的状态，不重新渲染 -->
         <!-- :is控制组件的动态渲染 
             :key控制组件的唯一性，key值改变时会重新渲染组件 -->
        <KeepAlive>
            <component :is="Component" :key="route.fullPath"></component>
        </KeepAlive>
    </router-view>
    <van-tabbar v-model="active" class="tab-bar" @change="onChange">
        <van-tabbar-item
        v-for="(item,index) in tabList"
        :key="`${item.title}-${index}`">
        <span class="label">{{ item.title }}</span>
        <template #icon>
            <img :src="active === index ? item.activeIcon : item.icon"
            class="icon" draggable="false" :alt="item.title"/>
        </template>
        </van-tabbar-item>
    </van-tabbar>
</template>
<script setup lang="ts">
import { KeepAlive, ref, watchEffect } from 'vue'
import { tabList } from './tabs'
import { useRoute, useRouter } from 'vue-router'
// 定义当前激活的tab索引
const  active = ref(0)
// 负责解析当前URL，处理导航逻辑，前进，后退等
const router = useRouter()
/**
 * tab切换事件
 */
function onChange(activeIndex: number) {
    console.log('tab切换', activeIndex)
    const routerLink = tabList[activeIndex].routerLink
    // 路由跳转
    if(routerLink) {
        router.replace(routerLink)
    }
}
// watch(() => router, () => {}, {
//     immediate: true
// })
// 显示URL与显示内容之间的映射关系
const route = useRoute()
// watch->immediate:true,监听路由变化，更新active索引
// watchEffect用于立即执行副作用函数，并在其依赖项发生变化时重新执行
watchEffect(() => {
    console.log('路由', route, router)
    const index = tabList.findIndex(tab => tab.routerLink === route.path)
    if(index !== -1) { // 找到匹配的tab并更新active索引
        active.value = index
    }
})
</script>
<style scoped lang="less"></style>