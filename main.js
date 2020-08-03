// 没有登录，没有token直接去登录页算啦
// if (!uni.getStorageSync('token')) uni.reLaunch({ url: '/pages/wechat-login/wechat-login' })
if (!uni.getStorageSync('token')) uni.reLaunch({ url: '/pages/login/login' })

import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app' 

import store from './store'
/**
 * 引入封装好的ajax网络请求以及接口地址列表
 */
import fetch from './libs/request.js'
import api from './api'

Vue.prototype.$fetch = fetch
Vue.prototype.$api = api

// 引入 IM
import IM from '@/libs/IM.js' 
Vue.prototype.$IM = new IM('4aa95da6ddec3b81b43f3515', '2ecd444d6fde142fa4e0f36e', 'random_str')
Vue.prototype.$IM.init()

// 引入 store 在uni-app中请输入辅助函数写法：eg: import { mapState } from 'vuex'
Vue.prototype.$store = store 

import { numberToChinese } from '@/config'
Vue.prototype.$numberToChinese = numberToChinese

/**
 * 引入时间插件 官方文档：https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md
 */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.locale('zh-cn') // 引入中文
dayjs.extend(relativeTime) // 引入相对时间
Vue.prototype.$dayjs = dayjs // 放入原型中

import { baseURL } from '@/config'
Vue.prototype.$baseUrl = baseURL

const app = new Vue({
    ...App
}) 
app.$mount()
