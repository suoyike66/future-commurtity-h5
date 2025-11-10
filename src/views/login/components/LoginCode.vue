<template>
    <van-form class="login-form" @submit="onSubmit">
    <!-- 输入手机号 -->
     <van-field
     v-model.trim="formState.mobile"
     placeholder="请输入手机号"
     autocomplete="off"
     left-icon="phone-o"
     maxlength="11"
     type="number"
     name="mobile"
     class="login-form_item"
     />
    <!-- 输入验证码 -->
     <van-field
     v-model="formState.code"
     placeholder="请输入验证码"
     autocomplete="off"
     left-icon="clock-o"
     maxlength="6"
     type="number"
    name="code"
     class="login-form_item"
     >
        <template #button>
            <!-- <van-button>发送验证码</van-button> -->
            <div class="send-code"
                @click="sendCode"
                :class="{'disabled': codeDisabled}">
                发送验证码{{ showTime ? '(' + downTime +'s)' : '' }}
            </div>
        </template>
    </van-field>
    <!-- 登录按钮 -->
     <van-button class="submit-button" type="primary" native-type="submit">登录</van-button>
    </van-form>
</template>
<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import { isPhone } from '@/utils/verification-util'
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import { messageMethod } from '@/utils/message-util'
const router = useRouter()
// 定义表单数据
const formState = reactive({
    mobile: '',
    code: ''
})
// 发送验证码相关
const downTime = ref(60) // 倒计时
// 定时器
let timer: NodeJS.Timeout | null = null // unknown | null
// computed计算属性
// 是否显示倒计时
const showTime = computed(() => {
    return downTime.value < 60
})
// 按钮是否禁用
const codeDisabled = computed(() => {
    // 手机号码不正确或者正在倒计时，按钮禁用
    return isPhone(formState.mobile) === false || showTime.value
})
/**
 * 提交表单
 */
function onSubmit() {
    console.log('提交表单', formState);
    // 验证手机号是否正确
    if(!formState.mobile) {
        // 提示用户，请输入手机号
        messageMethod.error('请输入手机号')
        return
    }
    if(!isPhone(formState.mobile)) {
        // 提示用户，请输入正确的手机号
        messageMethod.error('请输入正确的手机号')
        return
    }
    // 验证码是否存在
    if(!formState.code) {
        messageMethod.error('请输入验证码')
        return
    }
    // 对接手机号登录接口
    // 提示用户，登录成功
    messageMethod.success('登录成功')
    // 进入首页 router.push() 路由跳转，记录历史，router.replace() 不记录历史
    router.replace('/')
}
/**
 * 发送验证码
 */
function sendCode() {
    // 如果按钮禁用，直接返回
    if(codeDisabled.value) return
    // 判断手机号是否正确
    if(!isPhone(formState.mobile)) {
        // 提示用户，请输入正确的手机号
        messageMethod.error('请输入正确的手机号')
        return
    }
    console.log('发送验证码', formState.mobile);
    // 开始倒计时
    downTime.value = 60
    timer = setInterval(() => {
        downTime.value--
        if(downTime.value <= 0) {
            downTime.value = 60
            // 倒计时结束，清空定时器
            if(timer) clearInterval(timer)
            timer = null
        }
    }, 1000);
    // 对接接口，发送验证码
    // 提示用户，验证码发送成功，请注意查收
    messageMethod.success('验证码发送成功，请注意查收')
}
/**
 * 组件卸载时，清空定时器
 */
onUnmounted(() => {
    // 清空定时器
    if(timer) clearInterval(timer)
    timer = null
})

</script>
<style scoped lang="scss">
@use '../login.scss' as *;
</style>