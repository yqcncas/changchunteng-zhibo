<template>
	<view class="container">
		<input v-model="userName" maxlength="11" class="ipt-container" type="text" :placeholder="plceholderUserName" placeholder-style="color: #9B9B9B;font-size: 14px" />
		
		<!-- 立即注册 -->
		<view class="register" @click="handleEditUserNickname">确认修改</view>
	</view>
</template>

<script>
	let timer = null
	export default {
		data() {
			return {
				plceholderUserName: '',
				userName: ''
			};
		},
		methods: {
			// 修改用户昵称
			async handleEditUserNickname () {
				let res = await this.$fetch(this.$api.editUserInfo, { userName: this.userName }, 'POST')
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.showToast({ title: '修改成功！' })
				uni.redirectTo({ url: '/pages/my-info/my-info' })
			}
		},
		onLoad(options) {
			this.plceholderUserName = options.userName
		},
		onUnload() {
			uni.hideKeyboard()
		}
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}

.container {
	border-top: 1px solid #F0F0F0;
	background: #FFFFFF;
	
	.ipt-container {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		input {
			flex: 1;
		}
		
		& > view {
			font-size: 12px;
			
			text:first-child {
				color: #4A90E2;
			}
			
			text:last-child {
				color: #a2a2a2;
			}
		}
	}

	.register {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 90rpx;
		background: #8987DF;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
}
</style>
