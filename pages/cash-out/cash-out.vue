<template>
	<view class="container">
		<view class="ipt-container">
			<text>支付包账号</text>
			<input type="text" v-model="requestObj.cardNo" placeholder="请输入支付宝账号">
		</view>
		<view style="border-bottom: 1px solid #f6f6f6;margin-left: 30rpx;"></view>
		<view class="ipt-container">
			<text>支付宝姓名</text>
			<input type="text" v-model="requestObj.cardName" placeholder="请输入支付宝实名认证姓名">
		</view>
		<view class="line-30"></view>
		<view class="main">
			<text>提现金额</text>
			<!-- <text>提现金额须为10的倍数</text> -->
			<view class="input">
				<text>￥</text>
				<input v-model="requestObj.money" type="number" maxlength="8" placeholder="000">
			</view>
			<view>
				<image src="/static/icon/16.png"></image>
				<text>可提现金额</text>
				<text>¥{{ money }}</text>
			</view>
			<view>提现金额需在¥20以上</view>
		</view>
		
		<view class="confirm" @click="handleConfirmCash">确认提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				requestObj: {
					cardName: '', // 提现申请人
					cardNo: '', // 提现号码
					money: '', // 提现金额
				}
			};
		},
		methods: {
			// 调用提现接口
			async handleConfirmCash () {
				if (!this.requestObj.cardName.trim().length) return uni.showToast({ title: '请输入收款人姓名~', icon: 'none' })
				if (!this.requestObj.cardNo.trim().length) return uni.showToast({ title: '请输入收款人支付宝号码~', icon: 'none' })
				if (this.requestObj.money < 20) return uni.showToast({ title: '提现金额需在¥20以上~', icon: 'none' })
				let res = await this.$fetch(this.$api.draw, this.requestObj)
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.showToast({ title: res.msg })
				setTimeout(() => { uni.redirectTo({ url: '/pages/my/study-money' }) }, 500)
			}
		},
		onLoad(options) {
			this.money = options.money
		},
		onUnload() {
			uni.hideKeyboard()
		}
	}
</script>

<style lang="less">

page {
	background: #f6f6f6;
}

.container {
	background: #fff;
	
	.ipt-container {
		padding: 30upx;
		background: #fff;
		display: flex;
		align-items: center;
		
		text {
			margin-right: 40upx;
		}
		
		input {
			flex: 1;
			font-size: 14px;
		}
	}
	
	.main {
		display: flex;
		flex-direction: column;
		padding: 30upx;
		
		text:first-child {
			font-size:32upx;
			color: #5B5B5B;
			font-weight: bold;
		}
		
		text:nth-child(2) {
			font-size: 24upx;
			color: #A6A6A6;
			margin-top: 10upx;
		}
		
		.input {
			font-size: 30px;
			color: #4A4A4A;
			display: flex;
			align-items: center;
			padding: 30upx 0;
			border-bottom: 1upx solid #f6f6f6;
			
			text {
				font-size: 24px;
				margin-right: 20upx;
			}
			
			input {
				flex: 1;
				font-size: 30px;
				height: 30px;
			}
		}
		
		view:nth-child(3) {
			display: flex;
			align-items: center;
			margin-top: 20upx;
			
			image {
				width: 30upx;
				height: 30upx;
			}
			
			text:nth-child(2) {
				font-size: 24upx;
				color: #9B9B9B;
				margin: 0 10upx 0 10upx;
			}
			
			text:last-child {
				color: #8987DF;
				font-weight: bold;
			}
		}
		
		view:last-child {
			margin-top: 10rpx;
			font-size: 12px;
			color: #9B9B9B;
			margin-left: 40rpx;
		}
	}
	
	.confirm {
		position: fixed;
		bottom: 0upx;
		background: #8987DF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #FFFFFF;
		width: 100vw;
		height: 100upx; 
	}
	
	.confirm:active {
		opacity: .8;
	}
}

</style>
