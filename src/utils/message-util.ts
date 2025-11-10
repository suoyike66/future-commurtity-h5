/**
 * 消息提示工具类
 */
import { showNotify, showDialog } from 'vant'
/**
 * type 消息类型 danger/success/primary/warning
 * message 消息内容
 * duration 消息持续时间，默认持续3s, 设置值为0时，表示消息不会自动关闭
 * onClose 消息关闭时的回调函数
 */
export const messageMethod = {
    /**
     * 通知类消息
     * @param message 
     * @param duration 
     * @param onClose 
     * @returns 
     */
    info(message: string, duration?: number, onClose?:() => void) {
        return showNotify({
            type: 'primary',
            message,
            duration: duration ?? 3000,
            onClose
        })
    },
    /**
     * 错误类消息
     * @param message 
     * @param duration 
     * @param onClose 
     * @returns 
     */
    error(message: string, duration?: number, onClose?:() => void) {
        return showNotify({
            type: 'danger',
            message,
            duration: duration ?? 3000,
            onClose
        })
    },
    /**
     * 成功类消息
     * @param message 
     * @param duration 
     * @param onClose 
     * @returns 
     */
    success(message: string, duration?: number, onClose?:() => void) {
        return showNotify({
            type: 'success',
            message,
            duration: duration ?? 3000,
            onClose
        })
    },
    /**
     * 警告类消息
     * @param message 
     * @param duration 
     * @param onClose 
     * @returns 
     */
    warning(message: string, duration?: number, onClose?:() => void) {
        return showNotify({
            type: 'warning',
            message,
            duration: duration ?? 3000,
            onClose
        })
    }
}
/**
 * title 标题
 * message 消息内容
 * ok 回调函数，点击确认时触发
 * cancel 回调函数，点击取消时触发
 * @returns
 */
export const confirmMethod = {
    info(title: string, message?: string, ok?: () => void, cancel?: () => void) {
        return showDialog({
            title,
            message
        }).then(() => {
            // 点击确认
            if(ok){
                ok()
            }
        }).catch(() =>  {
            // 点击取消
            if(cancel){
                cancel()
            }
        })
    }
}
