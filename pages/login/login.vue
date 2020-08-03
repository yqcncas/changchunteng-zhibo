<template>
	<view class="container">
		<view class="header">
			<image class="bg" src="/static/icon/18.png" mode="aspectFill"></image>
			<image class="logo" src="/static/icon/19.png" mode="aspectFill"></image>
			<view>好好学习，天天向上！</view>
		</view>
		<!-- 登录 -->
		<view class="ipt-container">
			<!-- 手机号码 -->
			<view>
				<image src="/static/icon/20.png" mode="aspectFill"></image>
				<input type="number" maxlength="11" v-model="mobile" placeholder="请输入手机号码" />
			</view>
			<!-- 验证码 -->
			<view>
				<image src="/static/icon/21.png" mode="aspectFill"></image>
				<view>
					<input v-model="verification" maxlength="6" type="number" placeholder="请输入验证码" />
					<view>
						<text v-show="!verificationFlag" @click="handleGetVerification">获取验证码</text>
						<text v-show="verificationFlag">已发送（{{ count }}S）</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 登录 -->
		<view class="confirm-login" @click="handleLogin">登录</view>
		<!-- 第三方登录 -->
		<!-- <view class="other-login">
			<text>第三方登录</text>
			<view>
				<image @click="handleOpenWeChatLogin" src="/static/icon/22.png" mode="aspectFill"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	let timer = null
	export default {
		data() {
			return {
				verificationFlag: false, // 判断是否发生验证码
				mobile: '', // 手机号
				verification: '', // 验证码
				count: 60, // 时间
			};
		},
		methods: {
			// 验证手机号格式是否正确
			checkMobileFormat (mobile) {
				let reg = /^[1][3456789][0-9]{9}$/
				if (!reg.test(mobile)) {
				  uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				  return false
				}
				return true
			},
			// 获取验证码
			async handleGetVerification () { 
				if (!this.checkMobileFormat(this.mobile)) return
				this.verificationFlag = true
				let res = await this.$fetch(this.$api.sms, { mobile: this.mobile })
				if (res.code !== 0) return uni.showToast({ title: res.msg, icon: 'none' })
				timer = setInterval(() => {
				  if (this.count === 0) {
				    clearInterval(timer)
					this.verificationFlag = false
					this.count = 60
				  }
				  this.count = --this.count
				}, 1000)
			},
			// 微信登录
			handleOpenWeChatLogin () {
				uni.navigateTo({
					url: '/pages/wechat-login/wechat-login'
				})
			},
			// 用户点击了登录--手机号码登录
			async handleLogin () {
				let res = await this.$fetch(this.$api.login, { mobile: this.mobile, verification: this.verification })
				// 如果用户没有注册，默认给用户注册
				if (res.msg === '用户不存在，请注册') return this.defaultRegister()
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				console.log('走的登录')
				// 登录极光IM
				uni.showToast({ title: res.msg, icon: 'none' })
				if (!this.$IM.isLogin()) { 
					console.log('极光没有登录')
					this.loginJIM(res.data)
				} else { 
					// 登录成功
					uni.setStorageSync('user_info', res.data.user) // 保存用户信息
					uni.setStorageSync('token', res.data.token) // 保存token
					setTimeout(() => { uni.reLaunch({ url: '/pages/index/index' }) }, 300)
				}
			},
			// 注册账号
			async defaultRegister () {
				let res = await this.$fetch(this.$api.register, { mobile: this.mobile, verification: this.verification })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				console.log('走的注册')
				// 登录极光IM
				uni.showToast({ title: res.msg, icon: 'none' })
				if (!this.$IM.isLogin()) {
					console.log('极光没有登录')
					this.loginJIM(res.data)
				} else { 
					// 登录成功
					uni.setStorageSync('user_info', res.data.user) // 保存用户信息
					uni.setStorageSync('token', res.data.token) // 保存token
					setTimeout(() => { uni.reLaunch({ url: '/pages/index/index' }) }, 300)
				}
			},
			// 登录极光IM
			loginJIM (userInfo) {
				let loginBug = true
				setTimeout(() => {
					if (loginBug) uni.reLaunch({ url: '/pages/index/index' })
				}, 2500)
				this.$IM.login({
					username: userInfo.user.userId.toString(),
					password: userInfo.user.userId.toString()
				}, (res) => {
					console.log('极光登录成功')
					loginBug = false
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

	.ipt-container {
		margin-top: 602rpx;
		
		& > view:first-child {
			width: 600rpx;
			height: 100rpx;
			background: #FFFFFF;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			margin: 0 auto;
			box-shadow: 0 4px 8px 0 rgba(137,135,223,0.03), 0 2px 4px 0 rgba(137,135,223,0.05);
			margin-bottom: 30rpx;
			
			image {
				width: 32rpx;
				height: 36rpx;
				margin: 0 30rpx;
			}
			
			input {
				flex: 1;
				font-size: 14px;
				padding-left: 30rpx;
				border-left: 1px solid #F0F0F0;
			}
		}
	
		& >	view:last-child {
			width: 600rpx;
			height: 100rpx;
			background: rgba(137,135,223,0.05);
			border-radius: 50rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			
			image {
				max-width: 36rpx;
				min-width: 36rpx;
				max-height: 36rpx;
				min-height: 36rpx;
				margin: 0 30rpx;
			}
			
			input {
				flex: 1;
				padding-left: 30rpx;
				border-left: 1px solid #F0F0F0;
				font-size: 14px;
			}
			
			& > view {
				display: flex;
				align-items: center;
				margin-right: 40rpx;
				
				text:first-child {
					color: #4A90E2;
				}
				
				text:last-child {
					color: #a2a2a2;
				}
			}
		}
	}

	.confirm-login {
		width: 600rpx;
		height: 100rpx;
		background: #8987DF;
		border-radius: 50rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		
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
		
		& > text {
			color: #CCCCCC;
		}
		
		& > view {
			margin-top: 22rpx;
			margin-bottom: 40rpx;
		}
		
		image {
			width: 60rpx;
			height: 60rpx;
		}
	}
}
</style>
