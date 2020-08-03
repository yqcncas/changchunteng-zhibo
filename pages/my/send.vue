<template>
	<view class="send-container">
		<textarea :cursor-spacing="15" :fixed="true" placeholder="请输入内容…" auto-height placeholder-class="ipt-tip" v-model="chatContent" />
		<view class="confirm">
			<view class="send-text" @click="sendMsg">发送</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				chatContent: '',
			}
		},
		props: {
			teacherId: {
				type: String,
				default: ''
			}
		},
		methods: {
			// 发送聊天消息
			async sendMsg() {
				let res = await this.$fetch(this.$api.sendInfo, { content: this.chatContent, teacherId: this.teacherId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.chatContent = ''
				this.$emit('successSendMsg')
			}
		},
		watch: {
			chatContent(newValue) {
			}
		},
	}
</script>

<style lang="less">
	.send-container {
		position: fixed;
		left: 0;
		bottom: 0upx;
		box-shadow: 0 -1px 4px 0 rgba(0,0,0,0.03);
		background: #f7f7f7;
		width: 750upx;
		padding-top: 16upx;
		padding-bottom: 14upx;
		display: flex;
		align-items: center;
		
		textarea {
			flex: 1;
			background: #fff;
			height: 80upx;
			border-radius: 8upx;
			width: 544upx;
			padding: 20upx 30upx;
			margin-left: 30upx;
		}
		
		.confirm {
			width: 116upx;
			display: flex;
			justify-content: center;
			
			.send-text {
				text-align: center;
				color: #4A90E2;
			}
			
		}
	}
</style>
