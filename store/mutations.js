export default {
	// 添加最新的
	pushChatRoomList (state, newMsg) {
		// 添加标签,判断是老师还是学生
		newMsg.label = 1 // 1 是学生 2是老师
		// newMsg.isCurrentUser = false 
		let teacherList = uni.getStorageSync('teacher_list')
		// 遍历老师列表,判断消息发送者是否为老师
		teacherList.forEach(item => {
			if (item.dictValue === parseInt(newMsg.username)) newMsg.label = 2
		})
		// 判断消息发送者是否为当前用户
		// let userId = uni.getStorageSync('userId')
		// if (parseInt(userId) === parseInt(newMsg.username)) newMsg.isCurrentUser = true
		state.chatRoomList.push(newMsg)
		// console.log(state.chatRoomList)
	}, 
	
	// 清空 chatRoomList
	cleanChatRoomList (state) {
		console.log('我执行了吗')
		state.chatRoomList = []
	}
}
