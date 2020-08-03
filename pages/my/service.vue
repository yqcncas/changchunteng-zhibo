<template>
	<view class="container">
		<view class="list">
			<block v-for="item in chatList" :key="item.id">
				<view class="item">
					<view class="time">{{ item.createTime }}</view>
					<!-- 聊天内容，头像，右 -->
					<view class="main-right">
						<view class="content">{{ item.content }}</view>
						<image :src="avatar" mode="aspectFill"></image>
					</view> 
				</view>
				<view class="item tiem-no">
					<!-- 聊天时间 -->
					<!-- 聊天内容，头像，左 -->
					<view class="main-left" v-if="item.reply">
						<image src="/static/icon/17.png" mode="aspectFill"></image>
						<view class="content">{{ item.reply }}</view>
					</view>
				</view>
			</block>
		
		</view>
		<view style="height: 104upx;"></view>
		<send-msg @successSendMsg="successSendMsg" :teacherId="teacherId"></send-msg>
	</view>
</template>

<script>
	import sendMsg from './send.vue'
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				chatList: [],
				avatar: null, // 我的头像
				teacherId: null
			};
		},
		components: {
			sendMsg
		},
		methods: {
			// 获取与该用户的聊天记录
			async getChatRecord() {
				console.log(this.teacherId) 
				let res = await this.$fetch(this.$api.get10086Info, { teacherId: this.teacherId })
				res.rows.forEach(item => { 
					item.createTime = this.$dayjs(item.createTime).fromNow()
				})
				this.chatList = res.rows.reverse()
				this.$nextTick(() => {
					uni.pageScrollTo({ scrollTop: 9999999, duration: 300 })
				})
			},
			// 用户发送消息成功之后
			successSendMsg () {
				this.getChatRecord()
			}
		},
		onLoad(options) {
			this.teacherId = options.teacherId
			this.avatar = uni.getStorageSync('user_info').avatar
			this.getChatRecord()
		}
	}
</script>

<style lang="less">
page {
	background: #f7f7f7;
}

.container {
	padding: 0 30upx 30upx 30upx;
	
	.list {
		
		.item {
			
			.time {
				padding: 40upx 0;
				color: #A2A2A2;
				text-align: center;
			}
			
			.main-left {
				display: flex;
				
				image {
					max-width: 80upx;
					max-height: 80upx;
					min-width: 80upx;
					min-height: 80upx;
					border-radius: 50%;
					margin-right: 30upx;
				}
				
				.content {
					border-radius: 8upx;
					padding: 20upx;
					background: #fff;
					max-width: 432upx;
					position: relative;
					word-wrap: break-word;
					
					&::before {
						content: "";
						position: absolute;
						top: 20upx;
						left: -10upx;
						background-size: 100%;
						width: 10upx;
						height: 20upx;
						background-image: url('~@/static/icon/28.png');
					}
				}
			}
			
			.main-right {
				display: flex;
				justify-content: flex-end;
				
				.content {
					border-radius: 8upx;
					padding: 20upx;
					background: #8987DF;
					max-width: 432upx;
					position: relative;
					word-wrap: break-word;
					color: #FFFFFF;
					
					&::after {
						content: "";
						position: absolute;
						top: 20upx;
						right: -10upx;
						background-size: 100%;
						width: 10upx;
						height: 20upx;
						background-image: url('~@/static/icon/29.png');
					}
				}
				
				image {
					max-width: 80upx;
					max-height: 80upx;
					min-width: 80upx;
					min-height: 80upx;
					border-radius: 50%;
					margin-left: 30upx;
				}
			}
			
			&.tiem-no {
				padding-top: 40upx;
			}
		}
	}
}

@keyframes rotate {
	from {
		transform: translateY(-50%) rotatez(0deg);
	}

	to {
		transform: translateY(-50%) rotatez(360deg);
	}
}
</style>
