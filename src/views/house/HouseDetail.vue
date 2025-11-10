<template>
    <div class="house-detail-page">
        <van-nav-bar
            :title="'租房详情'"
            left-arrow
            @click-left="$router.back()"
            fixed
            placeholder
        />
        
        <!-- 详情内容 -->
        <div class="detail-content" v-if="detailData.id">
            <!-- 图片轮播 -->
            <van-swipe class="detail-swipe" :autoplay="3000" v-if="imageList.length > 0" @click="previewImage(0)">
                <van-swipe-item v-for="(image, index) in imageList" :key="index">
                    <van-image :src="image" fit="cover" width="100%" height="200px" />
                </van-swipe-item>
            </van-swipe>
            <div class="no-image" v-else>暂无图片</div>
            
            <!-- 价格和标题 -->
            <div class="price-section">
                <div class="price">
                    <span class="amount">{{ detailData.price }}</span>
                    <span class="unit">/月</span>
                    <span class="payment">押一付三</span>
                </div>
                <div class="title">{{ getHouseTitle(detailData) }}</div>
                <div class="tags">
                    <van-tag 
                        v-for="tag in detailData.buildingTradeTags" 
                        :key="tag.id"
                        type="primary"
                        plain
                        size="medium"
                    >
                        {{ tag.title }}
                    </van-tag>
                </div>
            </div>
            
            <!-- 房屋参数 -->
            <div class="house-params">
                <div class="section-header">
                    <span class="title">房屋参数</span>
                    <span class="more">详细参数></span>
                </div>
                <div class="params-grid">
                    <div class="param-item">
                        <div class="label">房型</div>
                        <div class="value">{{ getRoomTypeInfo(detailData) || '-' }}</div>
                    </div>
                    <div class="param-item">
                        <div class="label">面积</div>
                        <div class="value">{{ getAreaInfo(detailData) }}</div>
                    </div>
                    <div class="param-item">
                        <div class="label">楼层</div>
                        <div class="value">{{ getFloorInfo(detailData) }}</div>
                    </div>
                </div>
            </div>
            
            <!-- 设施/服务 -->
            <div class="facilities-section">
                <div class="section-header">
                    <span class="title">设施/服务</span>
                    <span class="more">更多服务></span>
                </div>
                <div class="facilities-grid">
                    <div class="facility-item" v-for="facility in facilitiesList" :key="facility.name">
                        <van-icon :name="facility.icon" size="24" />
                        <span class="facility-name">{{ facility.name }}</span>
                    </div>
                </div>
            </div>
            
            <!-- 房东信息 -->
            <div class="landlord-section">
                <div class="landlord-header">
                    <van-image
                        v-if="detailData.publishUserHeadPath"
                        :src="detailData.publishUserHeadPath"
                        round
                        width="50"
                        height="50"
                    />
                    <div class="landlord-info">
                        <div class="name">{{ detailData.contactName || '匿名用户' }}</div>
                        <div class="verified">
                            <van-icon name="certificate" color="#1989fa" />
                            <span>已验证房东身份</span>
                        </div>
                    </div>
                </div>
                <div class="community-info">
                    <van-icon name="location-o" />
                    <span>小区·{{ getCommunityInfo(detailData) }}</span>
                </div>
                <div class="map-link">
                    <span>地图详情></span>
                </div>
            </div>
            
            <!-- 房源描述 -->
            <div class="description-section" v-if="detailData.introduction">
                <div class="section-header">
                    <span class="title">房源描述</span>
                </div>
                <div class="description-content">
                    {{ detailData.introduction }}
                </div>
            </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-else class="loading-container">
            <van-loading type="spinner" class="loading">加载中...</van-loading>
        </div>
        
        <!-- 底部操作栏 -->
        <div class="bottom-actions" v-if="detailData.id && detailData.status === 1">
            <div class="action-buttons">
                <van-button class="chat-btn" @click="handleChat">
                    <van-icon name="chat-o" />
                    在线聊
                </van-button>
                <van-button class="call-btn" type="primary" @click="handleCall(detailData.contactPhone)">
                    <van-icon name="phone-o" />
                    打电话
                </van-button>
            </div>
        </div>
        
        <!-- 已下架提示 -->
        <div class="bottom-actions" v-else-if="detailData.id && detailData.status !== 1">
            <div class="action-buttons">
                <van-button class="disabled-btn" disabled block>
                    {{ getStatusText(detailData.status) }}
                </van-button>
            </div>
        </div>
        
        <!-- 图片预览 -->
        <van-image-preview
            v-model:show="showImagePreview"
            :images="previewImages"
            :start-position="previewIndex"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import requestRental from '@/api/home/building-rental'
import requestSale from '@/api/home/building-sale'
import type { BuildingRentalVo } from '@/entity/home/building-rental'
import type { BuildingSaleVo } from '@/entity/home/building-sale'
import type { BuildingTradeImageVo } from '@/entity/home/building-trade-image'
import { BaseUtil } from '@/utils/base-util'

const route = useRoute()
const detailData = ref<BuildingRentalVo | BuildingSaleVo | any>({})
const showImagePreview = ref(false)
const previewIndex = ref(0)
const previewImages = ref<string[]>([])

// 设施列表（根据实际数据调整）
const facilitiesList = ref([
    { name: '床', icon: 'hotel-o' },
    { name: '冰箱', icon: 'refrigerator-o' },
    { name: '电视机', icon: 'tv-o' },
    { name: '沙发', icon: 'bag-o' },
    { name: '空调', icon: 'fire-o' },
    { name: '衣柜', icon: 'cluster-o' },
    { name: '洗衣机', icon: 'other-pay' },
    { name: '热水器', icon: 'fire-o' }
])

// 计算图片列表
const imageList = computed(() => {
    const images: string[] = []
    
    // 封面图片
    if (detailData.value.coverPath) {
        images.push(detailData.value.coverPath)
    }
    
    // 其他图片
    if (detailData.value.buildingTradeImages && detailData.value.buildingTradeImages.length > 0) {
        const otherImages = detailData.value.buildingTradeImages
            .map((img: BuildingTradeImageVo) => img.filePath)
            .filter((path: string) => path && !images.includes(path))
        images.push(...otherImages)
    }
    
    return images
})

onMounted(() => {
    loadDetail()
})

const loadDetail = async () => {
    const { id, type } = route.query
    
    if (!id || !type) {
        showToast('参数错误')
        return
    }
    
    try {
        if (type === 'rental') {
            // 调用出租详情API - 使用GET请求通过ID查询
            const { data } = await requestRental.detail(id as string)
            detailData.value = processDetailData(data, 'rental')
        } else if (type === 'sale') {
            // 调用出售详情API - 使用GET请求通过ID查询
            const { data } = await requestSale.detail(id as string)
            detailData.value = processDetailData(data, 'sale')
        }
        
        // 设置预览图片
        previewImages.value = imageList.value
    } catch (error) {
        console.error('获取详情失败:', error)
        showToast('获取详情失败')
    }
}

// 处理详情数据
const processDetailData = (data: any, tradeType: string) => {
    if (!data) return {}
    
    // 处理图片路径
    if (data.coverPath) {
        data.coverPath = BaseUtil.getUploadPath(data.coverPath)
    }
    
    if (data.buildingTradeImages && data.buildingTradeImages.length > 0) {
        data.buildingTradeImages = data.buildingTradeImages.map((img: BuildingTradeImageVo) => ({
            ...img,
            filePath: BaseUtil.getUploadPath(img.filePath)
        }))
    }
    
    if (data.publishUserHeadPath) {
        data.publishUserHeadPath = BaseUtil.getUploadPath(data.publishUserHeadPath)
    }
    
    // 处理价格字段
    if (tradeType === 'rental') {
        data.price = data.rentalPrice
    } else if (tradeType === 'sale') {
        data.price = data.salePrice
    }
    
    return data
}

// 获取房屋标题
const getHouseTitle = (data: any) => {
    const typeText = data.type === 1 ? '整租' : '车位'
    const community = data.community?.name || ''
    const introduction = data.introduction || ''
    
    return `${typeText}·${community}${introduction ? `.${introduction}` : ''}`
}

// 获取户型信息
const getRoomTypeInfo = (data: any) => {
    if (data.type === 1 && data.room) {
        return data.room.typeName || '-'
    }
    return '-'
}

// 获取面积信息
const getAreaInfo = (data: any) => {
    if (data.type === 1 && data.room && data.room.area) {
        return `${data.room.area}M²`
    }
    return '-'
}

// 获取楼层信息（需要根据实际数据结构调整）
const getFloorInfo = (data: any) => {
    // 假设数据结构中有楼层信息，如果没有需要根据实际情况调整
    if (data.room && data.room.floor) {
        return data.room.floor
    }
    return '高层/6层' // 默认值，根据实际情况调整
}

// 获取小区信息
const getCommunityInfo = (data: any) => {
    return data.community?.name || '未知小区'
}

// 获取状态文本
const getStatusText = (status: number) => {
    const statusMap = { 1: '进行中', 2: '已完成', 3: '已取消' }
    return statusMap[status as keyof typeof statusMap] || '未知'
}

// 图片预览
const previewImage = (index: number) => {
    previewIndex.value = index
    showImagePreview.value = true
}

// 在线聊天
const handleChat = () => {
    showToast('在线聊功能开发中')
    // 实际开发中这里可以跳转到聊天页面或打开聊天窗口
}

// 拨打电话
const handleCall = (phone: string) => {
    if (!phone) {
        showToast('暂无联系电话')
        return
    }
    window.location.href = `tel:${phone}`
}
</script>

<style scoped lang="scss">
.house-detail-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding-bottom: 80px; /* 为底部操作栏留出空间 */
}

.detail-swipe {
    height: 200px;
    background-color: #f0f0f0;
    cursor: pointer;
}

.no-image {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #999;
}

.price-section {
    padding: 16px;
    background: white;
    margin-bottom: 8px;
    
    .price {
        display: flex;
        align-items: baseline;
        margin-bottom: 8px;
        
        .amount {
            font-size: 24px;
            font-weight: bold;
            color: #ff4444;
        }
        
        .unit {
            font-size: 16px;
            color: #ff4444;
            margin: 0 8px;
        }
        
        .payment {
            font-size: 14px;
            color: #666;
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
        }
    }
    
    .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        line-height: 1.4;
    }
    
    .tags {
        :deep(.van-tag) {
            margin-right: 8px;
            margin-bottom: 4px;
        }
    }
}

.house-params,
.facilities-section,
.landlord-section,
.description-section {
    padding: 16px;
    background: white;
    margin-bottom: 8px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    
    .title {
        font-size: 16px;
        font-weight: bold;
    }
    
    .more {
        font-size: 14px;
        color: #999;
    }
}

.params-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    
    .param-item {
        text-align: center;
        
        .label {
            font-size: 12px;
            color: #999;
            margin-bottom: 4px;
        }
        
        .value {
            font-size: 14px;
            color: #333;
        }
    }
}

.facilities-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    
    .facility-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .facility-name {
            font-size: 12px;
            color: #333;
            margin-top: 4px;
        }
    }
}

.landlord-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    
    .landlord-info {
        margin-left: 12px;
        
        .name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .verified {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #1989fa;
            
            .van-icon {
                margin-right: 4px;
            }
        }
    }
}

.community-info {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
    
    .van-icon {
        margin-right: 4px;
        color: #999;
    }
}

.map-link {
    text-align: right;
    
    span {
        font-size: 14px;
        color: #1989fa;
    }
}

.description-content {
    font-size: 14px;
    line-height: 1.6;
    color: #666;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 8px 16px;
    border-top: 1px solid #f0f0f0;
    
    .action-buttons {
        display: flex;
        gap: 12px;
        
        .van-button {
            flex: 1;
            height: 44px;
            border-radius: 8px;
            
            .van-icon {
                margin-right: 4px;
            }
        }
        
        .chat-btn {
            border: 1px solid #1989fa;
            color: #1989fa;
        }
        
        .call-btn {
            background: #1989fa;
            border: none;
        }
        
        .disabled-btn {
            background: #ccc;
            border: none;
            color: #666;
        }
    }
}
</style>