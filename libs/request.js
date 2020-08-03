import { baseURL } from '@/config'
/**
 * @param{string}url 请求地址(baseUrl基础地址之后的地址)
 * @param{Object}data 请求参数
 * @param{string}method 请求方法(默认为GET请求)
 * @param{string}contentType 请求内容类型(默认为JSON类型，可选form)
 * @param{Object}headers 其他 header 数据
 */
export default (url, data, method = 'GET', contentType = 'form', headers = {}) => {
	// 判断url地址第一个字符是否含 '/', 有则截取掉
	if (baseURL.slice(baseURL.length-1) === '/' && url.slice(0, 1) === '/') url = url.slice(1)
	// 删除data对象空属性
	for (let i in data) {
		if (typeof(data[i]) == 'undefined' || (data[i] != 0 && !data[i])) {
			delete data[i]
		}
	}
	// 判断请求内容类型
	if (!(/[A-Za-z]{4}/.test(contentType))) throw 'contentType 格式不正确，请检查是否为字符串json或者form'
	if (contentType.toUpperCase() === 'JSON') {
		headers['Content-Type'] = 'application/json; charset=UTF-8' // 可以传引用类型
	} else {
		headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8' // 无法传引用类型（传的是字符串，后端不想解析）
	}
	
	// 存储TOKEN
	let token = uni.getStorageSync('token')
	if (token) headers.token = token
	
	return new Promise(function(resolve, reject) {
		uni.request({
			url: baseURL + url, 
			data: data,
			method: method,
			header: headers,
			success: function(res) {
				if (parseInt(res.statusCode) === 200) {
					if (res.data.code === 401) {
						uni.showToast({ title: res.data.msg, icon: 'none' })
						// return setTimeout(() => { uni.reLaunch({ url: '/pages/wechat-login/wechat-login' }) }, 600)
						return setTimeout(() => { uni.reLaunch({ url: '/pages/login/login' }) }, 600)
					}
					resolve(res.data)
				} else if (parseInt(res.statusCode) === 401) {
					// 请求401时
					throw Error(`请求接口${baseUrl}${url},请求所传参数${JSON.stringify(data)};后端返回401`)
				} else if (parseInt(res.statusCode) === 500) {
					// 	请求500时				
					throw Error(`请求接口${baseUrl}${url},请求所传参数${JSON.stringify(data)};后端返回500`)
				} else {
					resolve(res.data)
				}
			},
			fail: function(err) {
				console.log(err)
				// uni.showToast({
				// 	icon: 'none',
				// 	title: err
				// })
			}
		})
	})
}
