import { GetRequestModel, PostRequestModel, type QueryType } from "@/http/request-model"
import type { LoginRsa } from "@/entity/login/login-rsa"
import type { BaseAccountUser } from "@/entity/account/account-user"
/**
 * 登录接口请求配置
 */
export default {
    /**
     * 获取RSA公钥信息
     * @returns 
     */
    rsa: () => new GetRequestModel<LoginRsa>
    ('/getRsaPublicKey', {}).request(),
    /**
     * 用户登录
     * @param data 
     * @returns 
     */
    login: (data: QueryType) => new PostRequestModel<BaseAccountUser>
    ('/login', data).request()
}