// 请在此对象写后端的请求接口列表
export default {
	// 此处写开发调试地址--自动生效
	// dev: 'http://60.180.141.109:8081', 
	dev: 'http://cct.bajiaostar.com',
	// 此处写线上环境地址--自动生效
	pro: 'http://cct.bajiaostar.com', 
	// pro: 'http://106.54.226.179:18081',  
	// 上传图片的地址
	unloadLocation: 'https://upload.qiniup.com/', 
	// 上传成功之后拼接资源的基础地址
	baseLocation: 'https://img.bajiaostar.com/', 
	// 
	wsDev: 'ws://101.132.115.48:8081',  
	wsPro: 'ws://101.132.115.48:8081',
	 
	/* ------------------------------------------接口---------------------------------------------- */
	
	/** 
	 * 无token接口
	 */
	getUserDict: '/api/no/getUserDict', // 获取老师列表
	register: '/api/no/register', // 注册
	wxLogin: '/api/no/wxLogin', // 微信直接登录
	sms: '/api/no/sms', // 短信验证
	login: '/api/no/login', // 登录
	getCourseType: '/api/no/getCourseType', // 获取学科列表
	update: '/api/no/update', // 版本检测
	getTime: '/api/no/getTime', // 截止时间
	
	
	/**
	 * 课程
	 */
	getPicasaList: '/api/course/getPicasaList', // 轮播图
	getCourseList: '/api/course/getCourseList', // 课程list childNum为章节数
	getClassType: '/api/no/getClassType', // 获取年级树
	getCourseInfo: '/api/course/getCourseInfo', // 进入课程详情
	addCart: '/api/course/addCart', // 加入购物车
	getChapterList: '/api/course/getChapterList', // 章节list
	getTeacherInfo: '/api/course/getTeacherInfo', // 老师详情
	genOrderFromCourse: '/api/course/genOrderFromCourse', // 课程直接生成订单
	getCartList: '/api/course/getCartList', // 购物车list
	genOrder: '/api/course/genOrder', // 购物车生成订单 orderItemIds用数组
	delCart: '/api/course/delCart', // 删除购物车内课程
	cancelOrder: '/api/course/cancelOrder', // 取消订单
	orderInfo: '/api/course/orderInfo', // 订单详情
	orderList: '/api/course/orderList', // 获取订单列表
	getActivityInfo: '/api/course/getActivityInfo', // 活动info code=-1即不可购买
	genOrderFromActivity: '/api/course/genOrderFromActivity', // 活动直接生成订单
	pay: '/api/course/pay', // 课程支付接口
	enterRoom: '/api/study/enterRoom', // 进入直播间
	getAchaoBook: '/api/no/getAchaoBook', // 获取操作指南,关于平台,用户协议
	getQrCode: '/api/mine/getQrCode', // 邀请好友
	
	/**
	 * 用户模块
	 */
	collect: '/api/mine/collect', // 加入收藏 
	cancelCollect: '/api/mine/cancelCollect', // 取消收藏 
	collectList: '/api/mine/collectList', // 查看我的收藏
	moneyList: '/api/mine/moneyList', // 学币明细
	editUserInfo: '/api/mine/editUserInfo', // 修改个人信息 用户性别（0男 1女 2未知）
	get10086Info: '/api/mine/get10086Info', // 获取客服信息列表
	sendInfo: '/api/mine/sendInfo', // 客服：发送信息
	draw: '/api/mine/draw', // 我要提现
	userInfo: '/api/mine/userInfo', // 用户信息
	uptoken: '/api/mine/uptoken', // 获取七牛token
	getPayConfig: '/api/mine/getPayConfig', // 获取充值面额列表
	joinUs: '/api/mine/joinUs', // 我要加盟
	
	/**
	 * 学习
	 */
	getStudyList: '/api/study/getStudyList', // 课程list childNum为章节数
	
	/**
	 * 支付充值
	 */
	aliPay: '/api/aliPay/appPay', // 支付宝app支付
	wxPay: '/api/wxPay/appPay', // 微信app支付
}
