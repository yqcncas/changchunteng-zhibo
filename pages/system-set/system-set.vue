<template>
	<view class="container">
		<view class="edit-info line">
			<view>
				<text>绑定手机</text>
				<text class="have" style="margin-right: 0;">{{ mobile }}</text>
			</view>
		</view>
		<!-- 用户协议，关于平台 -->
		<view style="padding: 30rpx;position: relative;" class="line right-arrow" @click="handleEditContent(2)">用户协议</view>
		<view style="padding: 30rpx;position: relative;" class="right-arrow" @click="handleEditContent(3)">关于平台</view>
		<view class="line-30"></view>
		<!-- 退出 -->
		<view class="out-login" @click="handleOutLogin">退出当前帐号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: ''
			};
		},
		methods: {
			// 前往绑定手机号页面
			handleOpenBindMobile () {
				uni.navigateTo({
					url: '/pages/bind-mobile/bind-mobile'
				})
			},
			// 退出登录
			handleOutLogin () { 
				this.$IM.loginOut()
				// 清除用户信息
				uni.removeStorageSync('user_info')
				uni.removeStorageSync('token')
				
				// 退出极光
				// #ifdef APP-PLUS
				// uni.reLaunch({ url: '/pages/wechat-login/wechat-login' })
				uni.reLaunch({ url: '/pages/login/login' })
				plus.runtime.restart() 
				// #endif
				
			},
			// 前往富文本
			handleEditContent (type) { 
				uni.navigateTo({ url: '/pages/operate-guide/operate-guide?type='+type })
			}
		},
		onLoad() {
			this.mobile = uni.getStorageSync('user_info').phonenumber
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
	
	.edit-info {
		position: relative;
		padding: 30rpx;
		
		& > view {
			flex: 1;
			justify-content: space-between;
			color: #9B9B9B;
			align-items: center;
			display: flex;
			
			text:first-child {
				color: #333333;
			}
			
			text:last-child {
				margin-right: 20rpx;
				
				&.have {
					color: #333333;
				}
			}
		}
		
	}
	
	.line {
		
		&::before {
			content: "";
			position: absolute;
			left: 30rpx;
			bottom: 0;
			width: 720rpx; 
			height: 1px;
			background: #F0F0F0;
		}
	}
	
	.out-login {
		padding: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #D0021B;
	}
}
</style>
