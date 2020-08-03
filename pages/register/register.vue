<template>
	<view class="container">
		<image class="bg" src="/static/image/register.png" mode="aspectFill"></image>
		<input v-model="registerObj.mobile" :style="{ marginTop: marginTop+'px' }" class="mobile" type="number" placeholder="请输入手机号" maxlength="11" placeholder-style="color: #9b9b9b">
		<view class="code-container">
			<input v-model="registerObj.verification" placeholder="请输入验证码" type="text" placeholder-style="color: #9b9b9b">
			<view>
				<text>获取验证码</text>
				<view v-show="false">60s</view>
			</view>
		</view>
		<view class="confirm-register">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				marginTop: 244,
				registerObj: {
					avatar: '', // 头像
					userName: '', // 用户名称
					openId: '', // 实际为uniID
					qrcode: '', // 邀请码
					mobile: '', // 手机号
					verification: '', // 验证码
				}
			};
		},
		methods: {
			// 获取微信授权返回的code
			requestWechat () {
				let appid = 'wx61e74a8b4a8b420d'
				let redirect_url = 'https://sqdownload.myun.info'
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirec`
			},
			// 解析 code
			getWechatCode () {
			  function parse_url (url) {
				// 定义函数
				var pattern = /(\w+)=(\w+)/gi // 定义正则表达式
				var parames = {} // 定义数组
				url.replace(pattern, function (a, b, c) {
				  parames[b] = c
				})
				return parames // 返回这个数组.
			  }
			  // 获取当前url   取到code
			  let url = window.location.href
			  let params = parse_url(url)
			  return params.code
			},
			// code 换 openid
			getWechatOpenId (code) {
				uni.request({
					url: 'https://sqliteapp.myun.info/api/login/h5GetOpenId',
					data: { code },
					success: ({data: res}) => {
						// console.log(res)
						if (res.code !== 0) throw res.msg
						this.registerObj.avatar = res.data.headimgurl
						this.registerObj.userName = res.data.nickname
						this.registerObj.openId = res.data.unionid
						alert(JSON.stringify(this.registerObj)) 
					}
				})
			},
		},
		onLoad() {
			this.marginTop = parseInt((uni.getSystemInfoSync().windowHeight / uni.upx2px(1206) * uni.upx2px(488)) + uni.upx2px(80))
			// 说明是微信扫码进入
			if (options.qrcode) {
				// 保存邀请码
				uni.setStorageSync('qrcode', options.qrcode)
				this.requestWechat()
			} else {
				// 解析微信回调
				this.getWechatOpenId(this.getWechatCode())
			}
		},
	}
</script>

<style lang="less">
page {
	height: 100vh;
	overflow: hidden;
}

input {
	font-size: 14px;
}

.container {
	.bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
	}
	
	.test {
		width: 100px;
		height: 100px;
		background: #FFFFFF;
	}
	
	.mobile {
		width: 424rpx;
		padding-left: 30rpx;
		height: 70rpx;
		background: #FFFFFF;
		border-radius: 2px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	
	.code-container {
		margin-left: auto;
		margin-right: auto;
		margin-top: 50rpx;
		width: 394rpx;
		padding: 0 30rpx;
		height: 70rpx;
		background: #FFFFFF;
		border-radius: 2px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		input {
			flex: 1;
		}
		
		& > view {
			padding-left: 20rpx;
			border-left: 1rpx solid #D8D8D8;
			
			text:first-child {
				font-size: 12px;
				color: #4A90E2;
			}
		}
	}
	
	.confirm-register {
		width: 454rpx;
		height: 70rpx;
		background: #FFA645;
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		margin: 100rpx auto 0 auto;
		
		&:active {
			background: #774c1d;
		}
	}
}
</style>
