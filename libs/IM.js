import md5 from '@/libs/md5.js'
import { JMessage } from '@/config/index.js'
const JIM = new JMessage() 
import store from '@/store'

class IM {
	/**
	 * appkey : 开发者在极光平台注册的 IM 应用 appkey
	 * secret 为开发者在极光平台注册的 IM 应用 masterSecret
	 * random_str : 20-36 长度的随机字符串, 作为签名加 salt 使用
	 */
	constructor(appKey, secret, random_str) {
		this.appKey = appKey
		this.secret = secret
		this.random_str = random_str
		// console.log(this.signature) 
	}
	
	// 初始化
	init () {
		let timestamp = Date.now()
		let signature = md5(`appkey=${this.appKey}&timestamp=${timestamp}&random_str=${this.random_str}&key=${this.secret}`)
		
		JIM.init({
			"appkey": this.appKey,
			"random_str": this.random_str,
			"signature": signature,
			"timestamp": timestamp,
			"flag": 1 // 是否启用消息记录漫游，默认 0 否，1 是
		}).onSuccess((data) => { 
			console.log('初始化成功：',data)
			// 如果用户缓存有信息,登录极光
			let userDetail = uni.getStorageSync('user_info')
			if (userDetail) this.login({username: `${userDetail.userId}`, password: `${userDetail.userId}` })
			this.onDisconnect() // 断线监听
		}).onFail((err) => {
			// 同上
			console.log('初始化失败：', err) 
		})
	}
	
	// 登录
	login(parames, callback = () => {}) {	
		JIM.login({
			username: parames.username,
			password : parames.password,
		}).onSuccess((data) => {
			console.log('登录成功：', data) 
			// 开始监听聊天室消息
			this.onRoomMsg((res) => {})
			// 登录成功进入聊天室
			// this.enterChatroom('23606744')  
			// this.exitChatroom('23606744', (res) => {
			// 	console.log(res)
			// })
			// 传递登录成功之后的回调
			 callback(data)
		}).onFail((err) => {
			 //同上
			 callback(err)
		});
	}
	
	// 进入聊天室
	enterChatroom (id, callback = () => {}) {
		console.log(id)
		JIM.enterChatroom({
			id
		}).onSuccess((data) => {
		   //data.code 返回码
		   //data.message 描述
		   //data.id 聊天室 id
		   console.log('进入聊天室成功：', data)
		   // this.getChatroomInfo(id)
		   callback()
		}).onFail((data) => {
			console.log('进入聊天室失败：', data)
		   //data.code 返回码
		   //data.message 描述
		});
	}
	
	// 退出聊天室
	exitChatroom (id, callback = () => {}) {
	   JIM.exitChatroom({
		   id
		 }).onSuccess((data) => {
		   //data.code 返回码
		   //data.message 描述
		   //data.id 聊天室 id
		   // console.log('退出聊天室成功：', data)
		   callback(data)
	   }).onFail((data) => {
		   //data.code 返回码
		   //data.message 描述
		   console.log('退出聊天室失败：', data)
		   callback(data)
	   });
	}
	 
	// 聊天室发送消息
	sendChatroomMsg (parames, callback = () => {}) {
		 JIM.sendChatroomMsg({
			target_rid: parames.target_rid, // 聊天室ID
			content: parames.content, // 消息文本
		 }).onSuccess((data, msg) => {
			let obj = {
				username: msg.content.from_id,
				content: msg.content.msg_body.text,
				msg_id: data.msg_id,
				isCurrentUser: true, // 自己发送的消息
			}
			
			this.getUserInfo(msg.content.from_id, (res) => {
				obj.nickname = res.user_info.nickname
				obj.avatar = res.user_info.avatar
				store.commit('pushChatRoomList', obj)
			})
			
			callback(data, msg)
		}).onFail((data) => {
			//data.code 返回码
			//data.message 描述
		})
	} 
	
	// 聊天室消息监听
	onRoomMsg (callback = () => {}) {
		JIM.onRoomMsg((data) => {
			// 这里可以做判断,如果不是当前聊天室return 掉
			if (Date.now() - data.ctime_ms > 1000) return
			let obj = {
				username: data.content.from_id,
				content: data.content.msg_body.text,
				msg_id: data.msg_id,
				isCurrentUser: false, // 监听到的聊天室消息肯定不是自己发送的消息
			}
			
			// 获取头像 昵称
			this.getUserInfo(data.content.from_id, (res) => {
				obj.nickname = res.user_info.nickname
				obj.avatar = res.user_info.avatar
				store.commit('pushChatRoomList', obj)
			})
			callback(data)  
		})
	}
	
	// 断线监听
	onDisconnect () {
		JIM.onDisconnect(() => {
			console.log('断线啦') 
		});
	}
	
	// 登录状态
	isLogin() {
		return JIM.isLogin()
	}
	
	// 根据username获取个人信息
	getUserInfo(username, callback) {
		JIM.getUserInfo({
			username
		}).onSuccess(res => {
			callback(res)
		})
	}
	
	// 获取聊天室详情
	getChatroomInfo (id, callback = () => {}) {
		JIM.getChatroomInfo({
			id
		}).onSuccess(res => {
			callback(res) 
		})
	}
	
	// 退出登录
	loginOut() {
		JIM.loginOut() 
	}
}

export default IM