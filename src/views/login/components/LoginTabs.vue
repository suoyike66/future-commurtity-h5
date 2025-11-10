<template>
    <div class="login-tabs">
        <!-- 使用v-for一定要添加key，且key的值要是唯一的  v-bind简写为: v-on简写@ -->
        <div class="login-tabs_item"
         v-for="(tab, index) in tabList" :key="tab"
         :class="{'tab-active': props.activeTab === index}"
         @click="onTabClick(index)">
         {{ tab }}
        </div>
        <div
        class="indicator"
        v-for="(tab, index) in tabList" :key="`indicator-${tab}`"
         :class="{'indicator-active': props.activeTab === index}"></div>
    </div>
</template>
<script setup lang="ts">
const tabList = ['账号密码登录', '手机号登录']
// 定义props属性 接收父组件传递的数据
const props = defineProps<{
    activeTab: number
}>()
// 定义emits事件 用于向父组件传递数据
const emits = defineEmits<{
    // 定义事件
    (e: 'update:activeTab', value: number): void
}>()
function onTabClick(index: number) {
    // 触发事件
    emits('update:activeTab', index)
}
</script>
<style scoped lang="scss">
@use '../../../assets//scss//mixin.scss' as *;
.login-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr; // 50% 50%;/150px 120px;
    grid-template-rows: auto 1px;
    justify-self: center; // 水平居中
    width: 300px;
    &_item{
        font-size: 16px;
        color: #021c1b;
        text-align: center;
        grid-row: 1/2
    }
    .tab-active{
        color: #fff;
    }
    .indicator{
        @include wh(136px, 1px);
        justify-self: center;
        margin-top: 8px;
        grid-row: 2/3
    }
    .indicator-active{
        background-color: #fff;
    }
}
</style>