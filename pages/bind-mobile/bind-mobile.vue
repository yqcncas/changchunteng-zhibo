<template>
	<view class="container">
		<input v-model="mobile" maxlength="11" class="ipt-container" type="number" placeholder="请输入手机号" placeholder-style="color: #9B9B9B;font-size: 14px" />
		<view style="margin-left: 30rpx;height: 1rpx;background: #F7F7F7;"></view>
		<view class="ipt-container">
			<input maxlength="6" v-model="verification" type="number" placeholder="请输入验证码" placeholder-style="color: #9B9B9B;font-size: 14px" />
			<view>
				<text v-show="!verificationFlag" @click="handleGetVerification">获取验证码</text>
				<text v-show="verificationFlag">已发送（{{ count }}S）</text>
			</view>
		</view>
		<!-- 立即注册 -->
		<view class="register" @click="handleRegister">立即注册</view>
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
			// 用户点击了立即注册
			async handleRegister () {
				if (!this.verification.trim().length) return uni.showToast({ title: '请输入验证码~', icon: 'none' })
				if (!this.mobile.trim().length) return uni.showToast({ title: '请输入手机号码~', icon: 'none' })
				uni.showLoading({ title: '登录中...' })
				let wx_login_userInfo = uni.getStorageSync('wx_login_userInfo') || {}
				let obj = {
					avatar: wx_login_userInfo.userInfo.avatarUrl,
					mobile: this.mobile,
					openId: wx_login_userInfo.userInfo.unionId,
					userName: wx_login_userInfo.userInfo.nickName,
					verification: this.verification 
				}
				let res = await this.$fetch(this.$api.register, obj)
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.showToast({ title: '注册成功~' })
				uni.setStorageSync('user_info', res.data.user) // 保存用户信息
				uni.setStorageSync('token', res.data.token) // 保存token
				// 跳转到首页
				uni.reLaunch({ url: '/pages/index/index' })
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
			}
		},
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
