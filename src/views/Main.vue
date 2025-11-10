<template>
    <div class="page">
        <!-- 顶部导航信息 -->
        <div class="header">
            <div v-if="isCanBack" class="back-box" @click="goBack">
                <van-icon name="arrow-left" />
                <span>返回</span>
            </div>
            <div class="title">{{ title }}</div>
            <div class="icon"></div>
        </div>
        <!-- 子页面渲染 -->
        <router-view v-slot="{Component, route}">
            <keep-alive v-if="route.meta.keepAlive">
                <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath"/>
        </router-view>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{
    title: string
}>()
const router = useRouter()
const history = router.options.history
// 通过判断back是否为null来判断是否是第一层路由
// back：上一层路由地址
// current: 当前路由地址
// forward: 下一层路由地址
const isCanBack = history.state.back
function goBack() {
    router.back()
}
</script>
<style lang="scss" scoped>
@use '../assets/scss/mixin.scss' as *;
.header{
    @include wh(100%, 50px);
    padding: 0 16px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    .back-box{
        width: 60px;
        display: flex;
        align-items: center;
        .van-icon{
            margin-right: 5px;
        }
    }
    .title{
        font-size: 20px;
        font-weight: 800;
        color: #353b45;
        flex: 1 1 auto;
        text-align: center;
    }
    .icon{
        width: 60px;
    }
}
</style>