<template>
	<view> 
		<!-- <web-view src="/hybrid/html/index.html"></web-view>  :style="{ height: videoLiveHeight + 'px' }"-->
		<video :style="{ height: videoLiveHeight + 'px' }" class="live_video" :src="detail.pullAddress" :autoplay="true"></video>
		<div class="total_on_line_man">     
			<span></span> 
			<span>在线听课学生</span>  
			<span>{{ lineCount }}</span> 
		</div>
		<!-- 聊天消息文本 -->
		<scroll-view class="chat-msg-list" scroll-y="true" style="background: #F7F7F7;" :style="{ height: msgHeight + 'px' }" :scroll-top="chatRoomTop" :scroll-with-animation="true">
			<block v-for="item in chatRoomList" :key="item.msg_id">
				<view class="item left" v-if="!item.isCurrentUser">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view>
						<view>
							<text class="name">{{ item.nickname ? item.nickname : '昵称' }}</text>
							<text class="label" :class="item.label === 1 ? 'teacher-label' : ''">{{ item.label === 1 ? '学生' : '老师' }}</text>
						</view>
						<view class="content">{{ item.content }}</view>
					</view>
				</view>
				<view class="item right" v-if="item.isCurrentUser">
					<view>
						<view>
							<text class="label" :class="item.label === 1 ? 'teacher-label' : ''">{{ item.label === 1 ? '学生' : '老师' }}</text>
							<text class="name">{{ item.nickname ? item.nickname : '昵称' }}</text>
						</view>
						<view class="content">{{ item.content }}</view>
					</view>
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>
			</block>
		</scroll-view>
		<!-- 发送聊天消息 -->
		<div class="send-msg">
			<input :cursor-spacing="inputBottomGap" type="text" v-model="chatRoomContent" placeholder="请输入关键字">
			<span @click="handleSendContent">发送</span>
		</div>
	</view>
</template> 

<script>
	// 引入聊天 IM 
	import { wsBaseUrl } from '@/config/index.js'
	export default {
		data() {
			return { 
				robot: 0, // 机器人数量
				videoLiveHeight: parseInt(320 * (uni.getSystemInfoSync().windowWidth / 480)), // 直播视频高度，根据默认屏幕计算
				inputBottomGap: 7, // 发送文本消息 input 距离软键盘位置
				msgHeight: 322, // 计算聊天消息应占高度
				chatRoomContent: '', // 发送的聊天室文本内容
				chatRoomTop: 0, // 聊天室滚动条位置
				// chatRoomList: [], // 聊天消息列表
				courseId: null, // 课程ID
				detail: {}, // 直播间信息
				lineCount: 0, // 在线人数
				oldChatRoomTop: 0, // 旧值
				userId: null,
				socketTask: null, // task 任务
			};
		},
		computed: {
			chatRoomList: function () {
				this.chatRoomTop = 0
				this.$nextTick(() => { this.chatRoomTop = 999999999 })
				return this.$store.state.chatRoomList
			}
		},
		methods: {
			// 发送聊天室内容
			handleSendContent () {
				if (!this.chatRoomContent.trim().length) return uni.showToast({ title: '请先输入要发送的内容~', icon: 'none' })
				this.$IM.sendChatroomMsg({
					target_rid: this.detail.imId,
					content: this.chatRoomContent
				}, (data, msg) => {
					this.chatRoomContent = ''
					// setTimeout(() => { 
					// 	this.$nextTick(() => { this.chatRoomTop = 999999999 })
					// }, 2000)
				})
			},
			// 获取直播间信息
			async getRoomInfo () {
				let res = await this.$fetch(this.$api.enterRoom, { courseId: this.courseId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.detail = res.data
				this.$IM.enterChatroom(this.detail.imId)
				this.connectWebSocket(this.detail.imId)
				// 每秒查一下最新的聊天室人数
				setInterval(() => {
					this.$IM.getChatroomInfo(this.detail.imId, (roomInfo) => {
						this.lineCount = this.robot + roomInfo.info.total_member_count
					})
				}, 1000)  
			},
			// 连接 webSocket
			connectWebSocket (roomId) {
				console.log(`${wsBaseUrl}/websocket/${this.userId}/${roomId}`)
				this.socketTask = uni.connectSocket({ url: `${wsBaseUrl}/websocket/${this.userId}/${roomId}`, complete: ()=> {} })
				// 接收来自后端的参数
				// this.socketTask.onMessage((res) => {
				// 	console.log(res) 
				// })
			},
			closeSocket () {
				// 退出socket
				this.socketTask.close({
					success: () => { console.log('关闭成功！') }
				})
			}
			// 监听聊天室消息
			// watchRoomChat () {
			// 	this.$IM.onRoomMsg((res) => {
			// 		console.log(res)
			// 	})
			// }
		},
		onLoad(options) {
			this.robot = parseInt(options.robot)
			this.courseId = options.courseId
			this.inputBottomGap = uni.upx2px(15) 
			// video 标签默认宽高为 480px、高度 320px ，宽度 100 %，则高度也应调整一点
			// this.videoLiveHeight = parseInt(320 * (uni.getSystemInfoSync().windowWidth / 480))
			// 计算聊天消息所占高度
			this.msgHeight = uni.getSystemInfoSync().windowHeight - this.videoLiveHeight - 40 - uni.upx2px(110)
			this.userId = uni.getStorageSync('user_info').userId
			// 监听聊天室消息
			// this.watchRoomChat()
		},
		onUnload () {
			this.closeSocket()
			uni.hideKeyboard()
			this.$store.commit('cleanChatRoomList') 
			// this.$IM.exitChatroom(this.detail.imId, (res) => {
			// 	console.log('退出聊天室成功：', res)
			// }) 
			// 发送消息给socket 后端
			// this.socketTask.send({
			// 	data: '啦啦啦啦',
			// 	success: () => {
			// 		console.log('消息发送成功啦')
			// 	}
			// })
		},
		onHide () {
			this.closeSocket()
		},
		onShow () {
			this.getRoomInfo()
		}
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}

.live_video {
	width: 100vw;
	vertical-align: middle;
}

.total_on_line_man {
	display: flex;
	left: 0;
	width: 100vw;
	height: 40px;
	background: #FFFFFF;
	align-items: center;
	font-size: 12px;
	
	span:first-child {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		background: #97E85F;
		margin-left: 30rpx; 
		margin-right: 10rpx;
	}
	
	span:nth-child(2) {
		color: #9B9B9B;
	}
	
	span:last-child {
		color: #333333;
		margin-left: 10rpx;
	}
}

/* 聊天消息列表 */
.chat-msg-list {
	
	.item {
		padding: 30rpx;
		padding-bottom: 40rpx;
		display: flex;
		align-items: flex-start;
		
		& > .avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background: #f2f2f2;
		}
		
		& > view {
			display: flex;
			flex-direction: column;
			
			& > view:first-child {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				
				.name {
					margin-right: 10rpx;
					font-size: 12px;
				}
				
				.label {
					border-radius: 2px;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0rpx 8rpx;
					font-size: 10px;
					color: #8987DF;
					background: rgba(137,135,223,0.30);
					
					&.teacher-label {
						color: #618FF0;
						background: rgba(97,143,240,0.30);
					}
				}
			}
			
			.content {
				max-width: 430rpx;
				padding: 30rpx;
				border-radius: 8rpx;
				background: #FFFFFF;
				word-wrap: break-word;
			}
		}
		
		&.left {
			justify-content: flex-start;
			
			& > .avatar {
				margin-right: 30rpx;
			}
		}
		
		&.right {
			justify-content: flex-end;
			
			& > .avatar {
				margin-left: 30rpx;
			}
			
			& > view {
				
				& > view:first-child {
					justify-content: flex-end;
					
					.label {
						margin-right: 10rpx;
					}
				}
				
				& > .content {
					background: #8987DF;
					color: #FFFFFF; 
				}
			}
		}
	}
}

/* 发送内容 */
.send-msg {
	position: fixed;
	background: #FFFFFF;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 110rpx;
	font-family: PingFangSC-Regular;
	display: flex;
	align-items: center;
	
	input {
		margin-left: 30rpx;
		border-radius: 4px;
		width: 544rpx;
		height: 80rpx;
		padding-left: 30rpx !important;
		padding-right: 30rpx !important;
		background: #F8F8F8 !important;
	}
	
	span {
		height: 100%;
		flex: 1;
		color: #4A90E2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

/* 隐藏滚动条 */ 
::-webkit-scrollbar  
{  
	display: none!important;
    width: 0px;  
    height: 0px;  
}
</style>
