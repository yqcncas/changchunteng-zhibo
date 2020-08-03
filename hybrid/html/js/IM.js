const JIM = new JMessage()

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
		let signature = hex_md5(`appkey=${this.appKey}&timestamp=${timestamp}&random_str=${this.random_str}&key=${this.secret}`)
		console.log(timestamp)
		
		JIM.init({
			"appkey": this.appKey,
			"random_str": this.random_str,
			"signature": signature,
			"timestamp": timestamp,
			"flag": 1 // 是否启用消息记录漫游，默认 0 否，1 是
		}).onSuccess((data) => { 
			console.log('初始化成功：',data)
			this.onDisconnect() // 断线监听
			this.login({ username: 'test_1', password: '123123' })
			
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
			// 登录成功进入聊天室
			this.enterChatroom('23606744')  
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
		}).onSuccess(function(data) {
		   //data.code 返回码
		   //data.message 描述
		   //data.id 聊天室 id
		   console.log('进入聊天室成功：', data)
		   callback()
		}).onFail(function(data) {
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
		   console.log('退出聊天室成功：', data)
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
			callback(data, msg)
		}).onFail((data) => {
			//data.code 返回码
			//data.message 描述
		})
	} 
	
	// 聊天室消息监听
	onRoomMsg (callback = () => {}) {
		JIM.onRoomMsg((data) => {
			callback(data) 
		})
	}
	
	// 断线监听
	onDisconnect () {
		JIM.onDisconnect(() => {
			console.log('断线啦')
		});
	}
}