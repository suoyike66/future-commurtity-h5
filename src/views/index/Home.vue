<template>
    <div class="page">
        <!-- 展示当前用户所在社区 -->
        <div class="community-picker" @click="showCommunityPicker = true">
            <van-image :src="localIcon" 
            class="local-icon" alt="地址"/>
            <span class="community-name">{{ communityName }}</span>
            <van-image :src="arrowIcon" 
            class="arrow-icon" alt="箭头"/>
        </div>
        <!-- 从底部弹出选择社区选择器 -->
        <van-popup v-model:show="showCommunityPicker" position="bottom" round >
            <van-picker
                title="请选择社区"
                :columns="communityList"
                :columns-field-names="{text: 'name', value: 'id'}"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </van-popup>
        
        <!-- 轮播图展示 -->
        <van-swipe :autoplay="3000" indicator-color="#fff" class="banner-swipe">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
                <van-image :src="item.filePath" width="100%" height="100%" class="banner-image" />
            </van-swipe-item>
        </van-swipe>
        <!-- 菜单宫格展示 'menu-tab_item_selected': selectedMenuIndex === index-->
         <div class="menu-grid">
            <div class="menu-tab">
                <div class="menu-tab_item" v-for="(item, index) in guideList" :key="item.id"
                :class="selectedMenuIndex === index ? 'menu-tab_item_selected' : 'menu-tab_item_default'"
                @click="selectedMenuIndex = index">
                    {{ item.title }}
                </div>
            </div>
            <div class="menu-item">
                <div class="menu-item_container"
                :class="selectedMenuIndex === 0 ? 'menu-item_r1' : 
                selectedMenuIndex === 1 ? 'menu-item_r2' : 'menu-item_r3'">
                    <van-grid :border="false">
                    <template v-if="guideList[selectedMenuIndex]">
                        <van-grid-item v-for="list in guideList[selectedMenuIndex].itemList"
                        :key="list.id"
                        :icon="list.icon"
                        :text="list.title" 
                        @click="navigationTo(list)"/>
                    </template>
                </van-grid>
                </div>
            </div>
         </div>
        <!-- 公告通知 -->
        <div class="notice">
            <van-image :src="noticeImg" class="notice-img"/>
            <span class="notice-spot">·</span>
            <van-notice-bar class="notice-bar" :scrollable="false">
                <template #right-icon>
                    <van-image :src="rightArrowIcon" class="right-arrow-icon" alt="箭头"/>
                </template>
                <van-swipe
                    vertical
                    class="notice-swipe"
                    :autoplay="3000"
                    :touchable="false"
                    :show-indicators="false"
                >
                    <van-swipe-item 
                    v-for="item in noticeList"
                    :key="item.id"
                    class="notice-swipe-item">
                        <div class="notice-swipe-item_content">
                            {{ item.title }}
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </van-notice-bar>
        </div>
        <!-- 善生活\善资讯 -->
        <div class="function-list" v-for="item in lifeList" :key="item.title">
            <div class="common-module-title">
                <span class="title">{{ item.title }}</span>
            </div>
            <div class="function-list-item">
                <van-image v-if="item.module1.type === 'img'" 
                class="function-list-item_icon1" :src="item.module1.icon" alt=""/>
                <div class="function-list-item-parking" v-else>
                    <!-- 车位数据展示 -->
                     <div class="function-list-item-parking_info">
                        <div class="title">剩余停车位</div>
                        <div class="parking-count btm-line">
                            <span class="label">地上</span>
                            <span class="value blue-color">{{ carNumber.up }}</span>
                        </div>
                        <div class="parking-count">
                            <span class="label">地下</span>
                            <span class="value orange-color">{{ carNumber.down }}</span>
                        </div>
                     </div>
                     <div class="function-list-item-parking_img">
                        <van-image :src="news4" alt="" 
                        width="100%" height="100%"/>
                     </div>
                </div>
                <van-image class="function-list-item_icon2" :src="item.module2.icon" alt=""/>
                <van-image class="function-list-item_icon3" :src="item.module3.icon" alt=""/>
            </div>

        </div>
        
        <!-- 善资讯 -->
         <!-- <div class="common-module-title">
            <span class="title">善资讯</span>
         </div> -->
        <!-- 善活动 -->
         <div class="common-module-title">
            <span class="title">善活动</span>
            <span class="more-btn">更多</span>
         </div>
         <div class="activity-list">
            <div class="activity-list-item" v-for="item  in activityList" :key="item.id">
                <van-image :src="item.cover" alt="" class="cover" />
                <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="desc">{{ item.introduction }}</div>
                    <div class="create-date">{{ item.startTime }}</div>
                </div>
            </div>
         </div>
        <!-- 善房产 -->
        <div class="common-module-title">
            <span class="title">善房产</span>
            <span class="more-btn">更多</span>
        </div>
        <div class="house-box">
            <!-- 房产标签栏 -->
             <div class="house-tab">
                <div class="house-tab-item" v-for="(item, index) in houseTabList" :key="item"
                :class="{'house-tab-active': houseTabActiveIndex === index}"
                @click="changeTab(index)">{{ item }}</div>
             </div>
             <!-- 房产列表 -->
            <div class="house-list" v-for="item in houseList" :key="item.id"  @click="goToHouseDetail(item)">
                <van-image :src="item.cover" alt="" class="cover"/>
                <div class="info">
                    <div class="title">
                        <span class="icon"
                        :class="{ 'house': item.type === 1, 'car': item.type === 2}">
                        {{ ['房', '车'][item.type - 1] }}</span>
                        <span>{{ item.introduction }}</span>
                    </div>
                    <div class="tips">
                        <span class="orange">{{ item.roomType }}</span>
                        <span class="orange">{{ item.roomArea }}</span>
                        <span>{{ item.address }}</span>
                    </div>
                    <div class="tags">
                        <van-tag v-for="tag in item.tagList" :key="tag.title"
                        :plain="tag.title !== '进行中' && tag.title !== '已完成'"
                        type="primary">{{ tag.title }}</van-tag>
                    </div>
                    <div class="price">
                        <span>{{ item.price }}</span>
                        <span>{{ item.priceUnit }}</span>
                    </div>
                </div>
                <div class="call" v-if="item.status === 1 && item.contactPhone">
                    <a :href="`tel:${item.contactPhone}`">
                        <van-image :src="callIcon" alt="" class="call-icon"/>
                    </a>
                </div>
            </div>
        </div>
     </div>
</template>
<script setup lang="ts">
import localIcon from '@/assets/images/home/location.png'
import arrowIcon from '@/assets/images/home/arrow.png'
import moreIcon from '@/assets/images/menu/more-app.gif'
import noticeImg from '@/assets/images/home/notice.png'
import rightArrowIcon from '@/assets/images/home/rightArrow.png'
import callIcon from '@/assets/images/home/phone.svg'
import live3 from '@/assets/images/home/live3.png'
import live2 from '@/assets/images/home/live2.png'
import live1 from '@/assets/images/home/live1.png'
import news2 from '@/assets/images/home/news2.png'
import news3 from '@/assets/images/home/news3.png'
import news4 from '@/assets/images/home/news4.png'
import { onMounted, ref } from 'vue'
import requestResident from '@/api/home/resident'
import requestCommunity from '@/api/home/community'
import requestBanner from '@/api/home/banner'
import requestGuide from '@/api/home/guide'
import requestNotice from '@/api/home/notice'
import requestCarParking from '@/api/home/car-parking'
import requestActivity from '@/api/home/activity'
import requestRental from '@/api/home/building-rental'
import requestSale from '@/api/home/building-sale'
import type { CommunityMapVo } from '@/entity/home/community'
import type { BannerVo } from '@/entity/home/banner'
import type { GuideVo, GuideItemVo } from '@/entity/home/guide'
import { BaseUtil } from '@/utils/base-util'
import { useRouter } from 'vue-router'
import type { NoticeVo } from '@/entity/home/notice'
import type { ActivityVO } from '@/entity/home/activity'
import type { HouseItem } from '@/entity/home/house'
import type { BuildingRentalVo } from '@/entity/home/building-rental'
import type { BuildingSaleVo } from '@/entity/home/building-sale'
import type { BuildingTradeTagVo } from '@/entity/home/building-trade-tag'

// 用户所属社区名称
const communityName = ref('')
const userCommunityName = ref()
// 社区列表
const communityList = ref<CommunityMapVo[]>([])
const userCommunityList = ref<CommunityMapVo[]>([])
// 是否展示社区选择器
const showCommunityPicker = ref(false)
// 轮播图列表
const bannerList = ref<BannerVo[]>([])
// 功能导航列表
const guideList = ref<GuideVo[]>([])
// 选中的菜单下标
const selectedMenuIndex = ref(0)
const router = useRouter()
// 公告列表
const noticeList = ref<NoticeVo[]>([])
// 善生活、善资讯功能列表
const lifeList = ref([
    {
        title: '善生活',
        module1: {
            title: '二手闲置',
            icon: live3,
            linkPath: '/trade/list',
            type: 'img'
        },
        module2: {
            title: '积分商城',
            icon: live2,
            linkPath: '/integral/manager',
            type: 'img'
        },
        module3: {
            title: '艺术课堂',
            icon: live1,
            linkPath: '/home/classroomArt',
            type: 'img'
        }
    },
    {
        title: '善资讯',
        module1: {
            title: '车位数据展示',
            icon: '',
            linkPath: '',
            type: 'div'
        },
        module2: {
            title: '微家园',
            icon: news2,
            linkPath: '/notice/list',
            type: 'img'
        },
        module3: {
            title: '招募志愿者',
            icon: news3,
            linkPath: '/notice/list',
            type: 'img'
        }
    }
])
onMounted(async() => {
    // 获取用户个人的住户信息 =》获取住户的社区信息
    await getUserResident()
    // 获取用户的社区列表
    await getCommunityList()
    // 获取轮播图列表
    getBannerList()
    // 获取功能导航列表
    getGuideList()
    // 获取公告列表
    getNoticeList()
    // 获取车位数量信息
    getCarNumber()
    // 获取活动列表
    getActivityList()
    // 获取房产出租列表
    getBuildingRentalList()
    // 获取房产出售信息
    // getBuildingSaleList()
})
function changeTab(index: number) {
    houseTabActiveIndex.value = index
    if(houseTabActiveIndex.value === 0) {
        // 出租
        getBuildingRentalList()
    } else {
        // 出售
        getBuildingSaleList()
    }
}
const houseList = ref<HouseItem[]>([])
const statusList = ['进行中', '已完成', '已下架']
// 房产出租\出售tab
const houseTabList = ['出租', '出售']
// 选中的房产tab下标
const houseTabActiveIndex = ref(0)
function handleHouseData(list: BuildingRentalVo[] | BuildingSaleVo[]) {
    const formatRoomInfo = (typeName?: string, area?: string) => {
        return (typeName ? `${typeName}·` : '') + (area ? `${area}·` : '')
    }
    return list.map(item => {
        const {id, introduction, status, type, 
            contactPhone, coverPath, rentalPrice, salePrice, 
            priceUnitName, buildingTradeTags} = item
            const house: Partial<HouseItem> = {
                id,
                introduction,
                status,
                type,
                contactPhone,
                cover: coverPath ? BaseUtil.getUploadPath(coverPath) : '',
                price: (rentalPrice || salePrice) as string,
                priceUnit: priceUnitName || '元/月',
                tagList: buildingTradeTags || []
            }
            if(buildingTradeTags && buildingTradeTags.length > 0) {
                // 追加状态标签
                const statusTag = {
                    title: statusList[status - 1],
                } as BuildingTradeTagVo
                house?.tagList?.unshift(statusTag)
            }
            if(type === 1) {
                // 房屋 building \room
                const {name: buildingName, unit } = item.building ?? {}
                const {typeName: roomTypeName, area: roomArea} = item.room ?? {}
                house.address = `${buildingName ?? ''}${unit?.name ? `(${unit?.name})` : ''}`
                house.roomArea = formatRoomInfo('', roomArea)
                house.roomType = formatRoomInfo(roomTypeName, '') // 两室两厅·
            } else {
                // 车位 carParking
                const { typeName: carParkingTypeName, address: carParkingAddress } = item.carParking ?? {}
                house.address = carParkingAddress || ''
                house.roomType = formatRoomInfo(carParkingTypeName, '')
            }
            console.log('处理后的房产数据', house)
            return house
    }) as HouseItem[]
}
// 跳转到房产详情页面
const goToHouseDetail = (item: HouseItem) => {
    // 根据当前选中的tab确定是出租还是出售
    const tradeType = houseTabActiveIndex.value === 0 ? 'rental' : 'sale'
    router.push({
        path: '/house/detail',
        query: {
            id: item.id,
            type: tradeType
        }
    })
}
async function getBuildingRentalList() {
    const {data} = await requestRental.page({
        pageNum: 1,
        pageSize: 3
    })
    houseList.value = handleHouseData(data.list || [])
}
async function getBuildingSaleList() {
    const  {data} = await requestSale.page({
        pageNum: 1,
        pageSize: 3
    })
    houseList.value = handleHouseData(data.list || [])
}
const activityList = ref<ActivityVO[]>([])
async function getActivityList() {
    const {data} = await requestActivity.page({
        pageNum: 1,
        pageSize: 4
    })
    activityList.value = (data.list || []).map(item => {
        return {
            ...item,
            cover: item.cover ? BaseUtil.getUploadPath(item.cover) : '',
            introduction: item.introduction ? 
            item.introduction.replace(/<[^>]+>/g, '').substring(0, 30) + '...' : '',
            startTime: item.startTime ? 
            item.startTime.substring(0, 10) : ''
        }
    })
}
// 存储车位数量信息
const carNumber = ref<{
    up: number,
    down: number
}>({up: 0, down: 0})
async function getCarNumber(){
    const {data} = await requestCarParking.number()
    if(data) {
        carNumber.value.up = data['1'].lastSpaceCount || 0
        carNumber.value.down = data['2'].lastSpaceCount || 0
    }
}
async function getNoticeList() {
    const {data} = await requestNotice.page({
        pageNum: 1,
        pageSize: 10
    })
    noticeList.value = data.list || []
}
function navigationTo(item: GuideItemVo) {
    if(item.linkPath) {
        router.push({path: item.linkPath})
    }
}
async function getGuideList(){
    const {data} = await requestGuide.guideHome()
    if(data) {
        guideList.value = (data || [])
        .filter(item => item.isShowHome === 1)
        .map(item => {
            if(item.itemList && item.itemList.length > 0) {
                item.itemList = item.itemList
                .filter(i => i.isShow === 1)
                .map(i => {
                    return {
                        ...i,
                        icon: i.icon ? BaseUtil.getUploadPath(i.icon) : ''
                    }
                })
                item.itemList.push({
                    title: '更多应用',
                    icon: moreIcon,
                    linkPath: '/menu/all'
                } as GuideItemVo)
            }
            return item
        })
        console.log('功能导航列表', guideList.value)
    }
}
function getBannerList() {
    const params = {
        pageNum: 1,
        pageSize: 10
    }
    requestBanner.bannerList(params).then(({data}) => {
        if(data) {
            bannerList.value = (data.list || []).map(item => {
                return {
                    ...item,
                    filePath: item.filePath ? BaseUtil.getUploadPath(item.filePath) : ''
                }
            })
            console.log('轮播图列表', bannerList.value)
        }
    })
    
}
/**
 * 点击选择器确认按钮触发事件{selectedValues, selectedOptions, selectedIndexes}
 */
function onConfirm(options: {selectedOptions: CommunityMapVo[]}) {
    console.log('选择的社区', options)
    communityName.value =  options.selectedOptions[0].name || '未选择社区'
    showCommunityPicker.value = false
}
/**
 * 点击选择器取消按钮触发事件
 */
function onCancel() {
    showCommunityPicker.value = false
}
async function getUserResident() {
    const {data} = await requestResident.my()
    console.log('住户信息', data)
    if(data) {
        userCommunityList.value = data.roomList?.map(item => {
            return {
                id: item.community?.id,
                name: item.community?.name
            }
        }) ?? []
        console.log('用户社区列表', userCommunityList.value)
        userCommunityName.value = userCommunityList.value?.[0]?.name ?? '未选择社区'
    }
}
async function getCommunityList(){
    const params = {
        pageNum: 1,
        pageSize: 999
    }
    const {data} = await requestCommunity.communityMap(params)
    console.log('社区列表', data)
    if(data && data.length > 0) {
        communityList.value = userCommunityList.value || data
        communityName.value = userCommunityName.value || (data[0].name ?? '未选择社区')
    }
}
</script>
<style scoped lang="scss">
@use './home.scss' as *;
</style>