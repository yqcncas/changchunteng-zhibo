<template>
	<view class="container">
		<view class="header">
			<image class="bg" src="/static/icon/18.png" mode="aspectFill"></image>
			<image class="logo" src="/static/icon/19.png" mode="aspectFill"></image>
			<view>好好学习，天天向上！</view>
		</view>
		<!-- 登录 -->
		<view class="confirm-login" @click="handleWeChatLogin">
			<image src="/static/icon/23.png"></image>
			<text>微信登录</text>
		</view>
		<!-- 第三方登录 -->
		<view class="other-login" @click="handleOpenMobileLogin">
			<text>手机号登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// 用户点击了微信登录-> 获取微信授权信息-> 获取不到说明没有授权 -> 授权之后在获取
			handleWeChatLogin () { 
				uni.showLoading({ title: '登陆中...' })
				uni.getUserInfo({
					provider: 'weixin',
					success: (loginRes) => {
						this.weChatDirectLogin(loginRes)
					},
					fail: (loginErr) => {
						// 微信登录失败 -> 未授权
						// console.log('微信登录失败返回的数据：',loginErr)
						this.handleWxLoginAccess() // 授权
					}
				})
			},
			// 微信登录授权
			handleWxLoginAccess () {
				uni.login({
					provider: 'weixin',
					success: (accessRes) => {
						// console.log('点击了微信授权返回参数：', accessRes)
						this.handleWeChatLogin()
					},
					fail: (err) => {
						// plus.nativeUI.alert(JSON.stringify(err)) 
						uni.showToast({ title: '您已取消授权', icon: 'none' })
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
			// 微信直接登录
			async weChatDirectLogin (loginRes) {
				uni.hideLoading()
				console.log(loginRes.userInfo)
				let res = await this.$fetch(this.$api.wxLogin, { openId: loginRes.userInfo.unionId }) // 将 unionId 当 openid 使用，减少后端工作量
				console.log('登录接口返回：',res)
				if (res.code === -1 && res.msg === '仅允许学生账号登录') return uni.showToast({ title: res.msg, icon: 'none' })
				if (res.code === -1) { 
					uni.showToast({ title: '首次登录需要您绑定手机号~', icon: 'none' })
					uni.setStorageSync('wx_login_userInfo', loginRes)
					return setTimeout(() => { uni.navigateTo({ url: '/pages/bind-mobile/bind-mobile' }) }, 800)
				}
				// 登录极光IM
				uni.showToast({ title: res.msg, icon: 'none' })
				if (!this.$IM.isLogin()) this.loginJIM(res.data)
				else {
					// 登录成功
					uni.setStorageSync('user_info', res.data.user) // 保存用户信息
					uni.setStorageSync('token', res.data.token) // 保存token
					setTimeout(() => { uni.reLaunch({ url: '/pages/index/index' }) }, 300)
				} 
			},
			// 跳转到手机号登录
			handleOpenMobileLogin () {
				// console.log('123')
				// uni.chooseLocation() 
				uni.redirectTo({ url: '/pages/login/login' })
			},
			// 登录极光IM
			loginJIM (userInfo) {
				this.$IM.login({
					username: userInfo.user.userId.toString(),
					password: userInfo.user.userId.toString()
				}, (res) => {
					// 登录成功
					uni.setStorageSync('user_info', userInfo.user) // 保存用户信息
					uni.setStorageSync('token', userInfo.token) // 保存token
					// 跳转到首页
					uni.reLaunch({ url: '/pages/index/index' })
				})
			}
		}
	}
</script>

<style lang="less">
.container {
	overflow: hidden;
	
	.header {
		width: 100vw;
		height: 522rpx;
		position: absolute;
		left: 0;
		top: 0;
		
		& > .bg {
			width: 100vw;
			height: 522rpx;
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
		}
		
		& > .logo {
			width: 180rpx;
			height: 180rpx;
			display: block;
			margin: 0 auto;
			margin-top: 158rpx;  
		}
		
		& > view {
			margin-top: 30rpx;
			color: #FFFFFF;
			text-align: center;
		}
	}

	.confirm-login {
		width: 600rpx;
		height: 100rpx;
		background: #8987DF;
		border-radius: 50rpx;
		margin: 0 auto;
		margin-top: 762rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		
		& > image {
			width: 40rpx;
			height: 34rpx;
			margin-right: 20rpx;
		}
		
		&:active {
			opacity: .8;
		}
	}

	.other-login {
		position: fixed;
		width: 100vw;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 40rpx;
		color: #B2B2B2;
	}
}
</style>
