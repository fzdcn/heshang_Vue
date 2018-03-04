// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== 'production'
export const API_BASE = DEBUG ? 'http://192.168.18.250/heshang/web/api' : ('http://' + window.location.host + '/api')
export const QI_NIU_CDN_DOMAIN = 'cdn-p.ytclg.com'
export const IMAGE_UPLOAD_URL = API_BASE + '/upload/images'

// 本地存储的文件信息相关，本地存储的信息内容【格式】有更新时更改次版本
export const LOCAL_STORAGE_VERSION = 1.0
