/**
 * RsA密钥存储对象类
 */
export interface LoginRsa {
  /**
   * 公钥
   */
  publicKey: string;
  /**
   * rsa密钥标识符
   */
  rasKey: string;
  [property: string]: any;
  
}
   