<template>
    <div class="page">
        <van-form @submit="onSubmit">
            <!-- 报修类型选择 自有住宅/公共区域 -->
            <van-cell-group inset>
                <van-radio-group v-model="params.typeName">
                    <van-cell-group inset>
                        <van-cell
                         v-for="item in typeList"
                         :key="item.id"
                         :title="item.itemName"
                         clickable
                         @click="changeType(item)">
                         <template #icon>
                            <van-image :src="item.itemValue === '1' ? mySelfIcon : publicIcon" />
                         </template>
                            <template #right-icon>
                                <van-radio :name="item.itemName" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-cell-group>
            <!-- 报修地址 -->
            <van-cell-group inset>
                <van-field
                    v-if="placeType === '2'"
                    v-model="params.place"
                    placeholder="请输入维修地点"
                    label="维修地点"
                    maxlength="50"
                    input-align="right"
                    :required="placeType === '2'"
                    :rules="[{required: true, message: '请输入维修地点'}]"
                />
                <van-field
                    v-else
                    v-model="roomSelected"
                    :left-icon="houseIcon"
                    is-link
                    readonly
                    :border="false"
                    :required="placeType === '1'"
                    :rules="[{required: true, message: '请选择房间'}]"
                    @click="openPicker('room')"
                />
            </van-cell-group>
            <!-- 问题描述 -->
            <van-cell-group inset>
                <van-field
                    v-model="params.content"
                    rows="1"
                    autosize
                    type="textarea"
                    placeholder="请简单描述现场情况（如：浴室下水道堵塞），以便开展维修。"
                />
                <van-field>
                    <template #input>
                        <van-uploader
                            v-model="fileList"
                            max-count="9"
                            multiple
                            accept="image/*"
                            result-type="file"
                            :after-read="afterRead"
                            :before-delete="beforeDelete"
                        />
                    </template>
                </van-field>
            </van-cell-group>
            <!-- 报修问题选择 -->
            <van-cell-group inset>
                <van-field
                    v-model="params.questionTypeName"
                    label="问题类型"
                    placeholder="请选择问题类型"
                    is-link
                    readonly
                    input-align="right"
                    :required="true"
                    :rules="[{required: true, message: '请选择问题类型'}]"
                    @click="openPicker('questionType')"
                />
                <van-field
                    v-model="masterSelected"
                    label="联系专员"
                    placeholder="请选择联系专员"
                    is-link
                    readonly
                    input-align="right"
                    :required="true"
                    :rules="[{required: true, message: '请选择联系专员'}]"
                    @click="openPicker('master')"
                />
                <van-field
                    v-model="repairDateSelected"
                    label="维修日期"
                    placeholder="请选择维修日期"
                    is-link
                    readonly
                    input-align="right"
                    :required="true"
                    :rules="[{required: true, message: '请选择维修日期'}]"
                    @click="openPicker('repairDate')"
                />
            </van-cell-group>
            <!-- 联系人信息 -->
            <van-cell-group inset>
                <van-field
                    v-model="params.concatName"
                    label="联系人"
                    placeholder="请输入联系人"
                    input-align="right"
                    :required="true"
                    :rules="[{required: true, message: '请输入联系人'}]"
                />
                <!-- {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}, -->
                <van-field
                    v-model="params.concatPhone"
                    label="联系电话"
                    placeholder="请输入联系电话"
                    input-align="right"
                    :required="true"
                    :rules="[
                        {required: true, message: '请输入联系电话'},
                        {validator: value => isPhone(value + ''), message: '请输入正确的手机号'}
                    ]"
                />
            </van-cell-group>
            <!-- 上报按钮 -->
             <van-button type="primary" round block native-type="submit">立即上报</van-button>
        </van-form>
        <!-- 弹出选择器 -->
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
                v-if="pickerType === 'room'"
                :columns="roomColumns"
                @confirm="onRoomConfirm"
                @cancel="showPicker = false"
            />
            <van-picker
                v-else-if="pickerType === 'questionType'"
                :columns="questionColumns"
                :columns-field-names="{ text: 'itemName', value: 'id' }"
                @confirm="onQuestionConfirm"
                @cancel="showPicker = false"
            />
            <van-picker
                v-else-if="pickerType === 'master'"
                :columns="masterColumns"
                :columns-field-names="{ text: 'name', value: 'userId' }"
                @confirm="onMasterConfirm"
                @cancel="showPicker = false"
            />
            <van-date-picker
                v-else-if="pickerType === 'repairDate'"
                v-model="currentDate"
                title="选择维修日期"
                :min-date="minDate"
                @confirm="onRepairDateConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
    </div>
</template>
<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import requestDict from '@/api/system/dictionary'
import requestResident from '@/api/home/resident'
import requestFile from '@/api/system/upload'
// import requestMaster from '@/api/service/repair/repair-master'
// import requestRepair from '@/api/service/repair/online-repair'
import type { DictionaryManage } from '@/entity/system/dictionary-manage';
import type { OnlineRepairVo } from '@/entity/service/repair/online-repair';
import mySelfIcon from '@/assets/images/server/repair/myself.png'
import publicIcon from '@/assets/images/server/repair/public.png'
import houseIcon from '@/assets/images/server/repair/house.png'
import type { UploaderFileListItem } from 'vant';
import { BaseUtil } from '@/utils/base-util';
import { isPhone } from '@/utils/verification-util';
import { useUserStore } from '@/store/user';
import type { ResidentVo } from '@/entity/home/resident';
import type { RepairMasterVo } from '@/entity/service/repair/repair-master';
import type { QueryType } from '@/http/request-model.ts'
import { messageMethod } from '@/utils/message-util'
const params = ref<Partial<OnlineRepairVo>>({
    /**
     * 联系人
     */
    concatName: '',
    /**
     * 联系电话
     */
    concatPhone: '',
    /**
     * 描述信息
     */
    content: '',
    /**
     * 申报人id
     */
    fkPublishUserId: '',
    /**
     * 维修师傅id
     */
    fkRepairMasterId: '',
    /**
     * 房屋id
     */
    fkRoomId: '',
    /**
     * 报修图片列表
     */
    imgList: [],
    /**
     * 报修图片(以逗号分割)
     */
    imgListString: '',
    /**
     * 维修地点
     */
    place: '',
    /**
     * 问题类型id（数据字典 online_repair_question_type）
     */
    questionTypeId: '',
    /**
     * 问题类型名称
     */
    questionTypeName: '',
    /**
     * 预约上门时间
     */
    repairDate: '',
    /**
     * 状态: 0=未派单 1=已申报 2=已接单 3=已维修
     */
    status: 1,
    /**
     * 场所类型id（数据字典 online_repair_type）
     */
    typeId: '',
    /**
     * 场所名称
     */
    typeName: '',
})
// 选择的房间名称
const roomSelected = ref('')
// 是否显示弹出层
const showPicker = ref(false)
// 选择器类型
const pickerType = ref('')
const userStore = useUserStore()
const residentInfo = ref<ResidentVo>({} as ResidentVo)
// 选择的联系专员
const masterSelected = ref('')
// 选择的维修日期
const repairDateSelected = ref('')
onMounted(async () => {
    await getTypeList()
    await getUserResidentInfo()
    getQuestionTypeList()
    params.value.fkPublishUserId = userStore.user?.id || userStore.userInfo?.fkUserId || ''
    params.value.concatName = residentInfo.value.name ||  userStore.user?.userName || userStore.userInfo?.userInfoName || ''
    params.value.concatPhone = residentInfo.value.mobile ||  userStore.userInfo?.phone || ''
})
type UploaderFile = UploaderFileListItem & {id?: string}
// 图片上传
const fileList = ref<UploaderFile[]>([])
// 默认加载超时时间
const DEFAULT_TIMEOUT = 60000;
watch(fileList, () => {
    const doneFiles = fileList.value.filter(item => item.status === 'done')
    // 上传成功的图片ids
    params.value.imgListString = doneFiles.map(item => item.id).join(',')
}, {
    immediate: true,
    deep: true
})
import { useRouter } from 'vue-router'
const router = useRouter()
async function onSubmit(){
    console.log('提交报修单', params.value)
    await requestRepair.add({
        ...params.value,
        repairDate: params.value.repairDate ? params.value.repairDate + ' 00:00:00' : undefined
    } as unknown as QueryType)
    messageMethod.success('报修单提交成功')
    // 返回上一页
    router.back()
}
const currentDate = ref<string[]>([new Date().getFullYear().toString(), (new Date().getMonth() + 1).toString(), new Date().getDate().toString()])
const minDate = new Date()
function onRepairDateConfirm(value: { selectedValues: string[] }) {
    console.log('选择的维修日期', value)
    repairDateSelected.value = value.selectedValues.join('-')
    params.value.repairDate = repairDateSelected.value
    showPicker.value = false
}
const questionColumns = ref<DictionaryManage[]>([])
async function getQuestionTypeList(){
    const {data} = await requestDict.getListByRootCode('online_repair_question_type')
    questionColumns.value = data || []
}
function onQuestionConfirm(value: { selectedOptions: DictionaryManage[] }) {
    params.value.questionTypeId = value.selectedOptions[0].id
    params.value.questionTypeName = value.selectedOptions[0].itemName
    showPicker.value = false
    // 选择联系专员
    getMaster()
}
const masterColumns = ref<RepairMasterVo[]>([])
async function getMaster() {
    const { data } = await requestMaster.all({
        handlerType: 1,
        questionTypeId: params.value.questionTypeId
    })
    if(data && data.length > 0) {
        masterColumns.value = data || []
        params.value.fkRepairMasterId = data[0].id
        masterSelected.value = data[0].name
    } else {
        params.value.fkRepairMasterId = ''
        masterSelected.value = ''
    }
}
function onMasterConfirm(value: {selectedOptions: RepairMasterVo[]}) {
    params.value.fkRepairMasterId = value.selectedOptions[0].userId
    masterSelected.value = value.selectedOptions[0].name
    showPicker.value = false
}
/**
 * 选择图片后触发
 * @param file 
 * @param detail 
 */
async function afterRead(file: UploaderFile | UploaderFile[], detail: { name: string | undefined; index: number }) {
    console.log('选择的图片', file, detail)
    // 处理多张图片上传
    if(file instanceof Array){
        for(let fileInfo of file){
           await afterRead(fileInfo, { name: fileInfo.file?.name, index: detail.index++ })
        }
    } else {
        // 单张图片上传
        fileList.value[detail.index] = {
            id: '-1',
            url: file.url,
            status: 'uploading',
            message: '上传中...'
        }
        console.log('上传图片', fileList.value)
        // 超时后停止上传，状态改为失败
        setTimeout(() => {
            fileList.value.filter(item => item.status === 'uploading').forEach(item => {
                item.status = 'failed'
                item.message = '上传失败'
            })
        }, DEFAULT_TIMEOUT);
        const { data, code, message } = await requestFile.upload({file: file.file})
        if(code === '0'){
            // 上传成功
            fileList.value[detail.index] = { id: data.id, url: BaseUtil.getUploadPath(data.uploadPath || ''), status: 'done' }
        } else {
            fileList.value[detail.index].status = 'failed'
            fileList.value[detail.index].message = message || '上传失败'
        }
    }
}
/**
 * 删除图片前触发
 * @param file 
 * @param detail 
 */
function beforeDelete(file: UploaderFile | UploaderFile[], detail: { name: string | undefined; index: number }){
    fileList.value.splice(detail.index, 1)
}
/**
 * 打开弹出层触发
 * @param type 
 */
function openPicker(type: string) {
    pickerType.value = type
    showPicker.value = true
}
function onRoomConfirm(value: { selectedOptions: {text: string, value: string}[] }) {
    params.value.fkRoomId = value.selectedOptions[0].value
    params.value.place = value.selectedOptions[0].text
    roomSelected.value = value.selectedOptions[0].text
    showPicker.value = false
}
const roomColumns = ref<{
    text: string,
    value: string
}[]>([])
async function getUserResidentInfo() {
    const {data} = await requestResident.my()
    // 柳湖景苑一期 1单元 1栋 104
    console.log('住户信息', data)
    residentInfo.value = data || {} as ResidentVo
    if(data && data?.roomList && data?.roomList?.length > 0) {
        roomColumns.value = data.roomList.map(item => {
            return {
                text: `${item.community?.name}${item.unit?.name}${item.building?.name}${item.name}`,
                value: item.id
            }
        })
    }
}
const typeList = ref<DictionaryManage[]>([])
const placeType = ref('1')
// 获取报修类型
async function getTypeList() {
    const {data} = await requestDict.getListByRootCode('online_repair_type')
    if(data) {
        typeList.value = data
    }
    params.value.typeName = typeList.value[0]?.itemName || ''
    params.value.typeId = typeList.value[0]?.id || ''
    placeType.value = typeList.value[0]?.itemValue || '1'
}
function changeType(typeItem: DictionaryManage) {
    params.value.typeName = typeItem?.itemName || ''
    params.value.typeId = typeItem?.id || ''
    placeType.value = typeItem?.itemValue || '1'
    // 1 自有住宅 2 公共区域
    if(placeType.value === '1') {
        roomSelected.value = roomColumns.value[0].text || ''
        params.value.fkRoomId = roomColumns.value[0].value || ''
        params.value.place = roomColumns.value[0].text || ''
    } else {
        roomSelected.value = ''
        params.value.fkRoomId = ''
        params.value.place = ''
    }
}
</script>
<style lang="scss" scoped>
@use '../../../assets/scss/mixin.scss' as *;
.page{
    --van-cell-group-inset-padding: 0;
    padding: 16px;
    :deep(.van-cell-group--inset){
        width: 100%;
        margin-bottom: 15px;
    }
    .van-cell {
        align-items: center;
        :deep(.van-image__img){
            @include wh(26px, 26px);
            margin-right: 5px;
        }
    }
    :deep(.van-radio-group) {
        @include flex(row, space-between, center);
        
    }
}
</style>