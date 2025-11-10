<template>
    <van-form class="login-form" @submit="onSubmit">
        <!-- 输入账号 -->
        <!-- <van-field
            v-model:value="formState.userAccount"
            placeholder="请输入账号"
            left-icon="contact-o"
        >
           <template #left-icon>
                <img :src="leftIcon" alt="账号" class="left-icon"/>
            </template>
        </van-field>-->
        <!-- 修饰符
         .trim 清除空格 -->
         <van-field 
         v-model="formState.userAccount"
         placeholder="请输入账号"
         left-icon="contact-o"
         autocomplete="off"
         class="login-form_item"
        />
        <!-- 输入密码 -->
        <van-field
            v-model="formState.password"
            placeholder="请输入密码"
            type="password"
            left-icon="eye-o"
            autocomplete="off"
            class="login-form_item"
        />
        <!-- 忘记密码复选框 -->
        <div class="password-checked">
            <van-checkbox v-model="formState.checked" shape="square">记住密码</van-checkbox>
            <div class="space-1"></div>
            <div class="forgot-password">忘记密码</div>
        </div>
        <!-- 登录按钮 -->
        <van-button class="submit-button" type="primary" native-type="submit">登录</van-button>
    </van-form>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
// import leftIcon from '@/assets/images/index/mine.png'
import { JSEncrypt } from 'jsencrypt'
import requestMethod from '@/api/login/login'
import { useSystemStore } from '@/store/system'
import { useRouter } from 'vue-router'
import { messageMethod } from '@/utils/message-util'
import { useUserStore } from '@/store/user'
// 定义表单数据
const formState = reactive({
    userAccount: '',
    password: '',
    checked: false
})
// 获取系统store
const systemStore = useSystemStore()
// 获取用户store
const userStore = useUserStore()
// 路由信息
const router = useRouter()
// 提交表单
async function onSubmit(){
    // todo 获取公钥密钥进行用户密码加密处理
    // 1、获取公钥
    const rsa = await requestMethod.rsa()
    // const { publicKey, rsaKey } = rsa.data
    console.log('formState', formState.password)
    // 2、使用公钥加密用户密码
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(rsa.data.publicKey) // 
    const encryptedPassword = encrypt.encrypt(formState.password)
    // todo 登录请求
    const { data } = await requestMethod.login({
        userAccount: formState.userAccount,
        password: encryptedPassword,
        rsaKey: rsa.data.rsaKey,
        siteCode: 'h5'
    })
    console.log('登录结果', data)
    // todo 将token存储到本地
    systemStore.setToken(data.authToken)
    // todo 缓存登录用户信息
    userStore.setInfo(data)
    // todo 跳转到首页
    messageMethod.success('登录成功')
    router.replace('/')
}
</script>
<style scoped lang="scss">
@use '../login.scss' as *;
</style>