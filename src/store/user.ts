import type { BaseAccountDept } from "@/entity/account/account-dept";
import type { BaseAccountOrg } from "@/entity/account/account-org";
import type { BaseAccountRole } from "@/entity/account/account-role";
import type { AccountUserInfo, BaseAccountUser } from "@/entity/account/account-user";
import { BaseUtil } from "@/utils/base-util";
import { acceptHMRUpdate, defineStore } from "pinia";

interface UserState {
    // 所属部门信息
    deptList: Array<BaseAccountDept>
    // 所属单位信息
    orgList: Array<BaseAccountOrg>
    // 所属角色信息
    roleList: Array<BaseAccountRole>
    // 权限
    permissionMap: { [key: string]: string }
    // 用户扩展信息
    userInfo: AccountUserInfo | undefined
    // 用户基础信息
    user: BaseAccountUser | undefined
}
const STORE_KEY = 'user-store'; // store的key
export const useUserStore = defineStore(STORE_KEY, {
    state: (): UserState => ({
        deptList: [],
        orgList: [],
        roleList: [],
        permissionMap: {},
        userInfo: undefined,
        user: undefined
    }),
    getters: {
        /**
         * 获取用户名
         * @param state 
         * @returns 
         */
        userName: state => state.userInfo?.userInfoName || state.user?.userName || '请登录',

        /**
         * 获取用户头像
         * @param state 
         * @returns 
         */
        avatar: state => {
            const headPath = state.userInfo?.headPath || state.user?.headPath
            if(headPath){
                return BaseUtil.getUploadPath(headPath)
            }
        }
    },
    actions: {
        /**
         * 设置用户信息
         * @param userData 
         */
        setInfo(userData: BaseAccountUser) {
            this.$patch({
                deptList: userData.deptList,
                orgList: userData.orgList,
                roleList: userData.roleList,
                permissionMap: userData.permissionMap,
                userInfo: userData.userInfo,
                user: {
                    ...userData,
                }
            })
        },
        /**
         * 清除用户信息
         */
        clearInfo() {
            this.$patch({
                deptList: [],
                orgList: [],
                roleList: [],
                permissionMap: {},
                userInfo: undefined,
                user: undefined
            })
        }
    },
    // 开启数据持久化
    persist: {
        key: STORE_KEY, // 存储的key
        storage: localStorage, // 存储方式 localStorage/sessionStorage
    }
})
if (import.meta.hot) { // 是否有热更新的能力
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}