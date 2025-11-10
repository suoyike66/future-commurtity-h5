<template>
    <div class="page">
        <!-- 树叶装饰 -->
         <img :src="decorationTop" 
         class="leaf-top" alt="leaf-1" />
         <img :src="decorationBottom" 
         class="leaf-bottom" alt="leaf-2" />
         <div class="space-1"></div>
        <!-- logo -->
         <div class="logo"></div>
        <!-- 标签页切换 -->
        <LoginTabs v-model:activeTab="activeTab" />
        <!-- 登录表单 v-if v-else 控制组件的显示与隐藏-->
         <LoginForm v-if="activeTab === 0" />
         <LoginCode v-else />
        <!-- 第三方登录 -->
         <div class="other-login">
            <div class="other-login_check">
                <div>其他登录方式</div>
                <img src="@/assets/images/login/zhifubao.svg" alt="zhifubao"/>
                <img src="@/assets/images/login/weixin.svg" alt="weixin"/>
                <img src="@/assets/images/login/weibo.svg" alt="weibo"/>
            </div>
            <div class="space-1"></div>
            <div class="register">注册账户</div>
         </div>
         <div class="space-2"></div>
        <!-- 隐私条款 -->
         <div class="privacy">
            <div class="privacy_links">
                <span>帮助</span>
                <span>隐私</span>
                <span>条款</span>
            </div>
            <div class="copyright">copyright 2017 蚂蚁金服体验技术部出品</div>
         </div>
    </div>
</template>
<script setup lang="ts">
// 引入子组件，一定要加上.vue后缀
import LoginTabs from './components/LoginTabs.vue'
import LoginForm from './components/LoginForm.vue'
import LoginCode from './components/LoginCode.vue'
import decorationBottom from '@/assets/images/login/decoration-bottom.png'
import decorationTop from '@/assets/images/login/decoration-top.png'
import { ref } from 'vue'
// 定义当前操作的标签页 0-账号密码登录 1-手机号登录
// ref创建响应式数据，如果这个数据发生变化，视图会自动更新
const activeTab = ref(0)
</script>
<style scoped lang="scss">
@use './login.scss' as *;
</style>