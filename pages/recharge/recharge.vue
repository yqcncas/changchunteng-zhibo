<template>
	<view class="container">
		<!-- 选择充值方式 -->
		<view class="type-container">
			<view class="title">选择充值方式</view>
			<view class="main">
				<view @click="payType = 0">
					<view class="icon" :class="payType === 0 ? 'select' : ''"><text></text></view>
					<image src="/static/icon/14.png"></image>
					<text>支付宝支付</text>
				</view>
				<view @click="payType = 1">
					<view class="icon" :class="payType === 1 ? 'select' : ''"><text></text></view>
					<image src="/static/icon/15.png"></image>
					<text>微信支付</text>
				</view>
			</view>
		</view>
		<!-- 过渡线 -->
		<view class="line-30"></view>
		<!-- 选择充值面额 -->
		<view class="recharge-money">
			<view class="title">选择充值面额</view>
			<view class="money-list">
				<view @click="handleSelectMoney(item.id)" v-for="item in payMoneyList" :key="item.id" :class="item.id === selectMoney ? 'select' : ''">
					<text>充{{ item.payMoney }}得</text>
					<view>
						<text>¥</text>
						<text>{{ item.money }}</text>
					</view>
				</view>
			</view>
			<!-- 备注 -->
			<view class="explain">
				<view>注：1、赠送的学币不可退现金。</view>
				<view>2、有退费情况，扣除赠送学币后，再按实际计费计算</view>
			</view>
		</view>
		<!-- 确认付款 -->
		<view class="confirm-buy" :class="selectMoney === null ? 'no-select-confirm' : ''" @click="handleConfirm">确认购买</view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				payType: 0,
				payMoneyList: [],
				selectMoney: null
			};
		},
		methods: {
			// 获取充值面额列表
			async getPayConfig () {
				let res = await this.$fetch(this.$api.getPayConfig)
				this.payMoneyList = res.data
				console.log(this.payMoneyList)
			},
			// 选中金额
			handleSelectMoney (id) {
				this.selectMoney = id
			},
			// 用户点击了充值时
			async handleConfirm () {
				console.log(this.selectMoney)
				if (this.selectMoney === null) return uni.showToast({ title: '您还没有选择充值金额~', icon: 'none' })
				// let info = await this.getOrderInfo()
				// this.$fetch(this.payType === 0 ? this.$api.aliPay : this.$api.wxPay, { id: this.selectMoney }, 'POST').then(res => {
				// 	console.log('1111111')
				// })
				const { msg } = await this.$fetch(this.payType === 0 ? this.$api.aliPay : this.$api.wxPay, { id: this.selectMoney }, 'POST')
				// plus.nativeUI.alert(JSON.stringify(msg)) 
				uni.requestPayment({
				    provider: this.payType === 0 ? 'alipay' : 'wxpay',
				    orderInfo: msg,
				    success: (response) => {
				        uni.showToast({ title: "支付成功！" })
				    },
				    fail: (err) => {
						uni.showToast({ title: "支付失败！", icon: 'none' })
				    }
				})
			},
			// mock
			getOrderInfo(e) {
			    return new Promise((res) => {
					let type = this.payType === 0 ? 'alipay' : 'wxpay'
					plus.nativeUI.alert('https://demo.dcloud.net.cn/payment/?payid=' + type + '&appid=HBuilder&total=0.01')
			        uni.request({
			            url: 'https://demo.dcloud.net.cn/payment/?payid=' + type + '&appid=HBuilder&total=0.01',
			            success: (result) => {
							// plus.nativeUI.alert(JSON.stringify(result))
			                res(result.data)
			            },
			            fail: (e) => { 
			                res(e);
			            }
			        })
			    })
			},
		},
		onLoad() {
			this.getPayConfig()
		}
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}

.container {
	background: #FFFFFF;
	border-top: 1px solid #F0F0F0;
	
	.type-container {
		padding: 0 30rpx;
		
		.title {
			font-size: 17px;
			color: #333333;
			font-weight: bold;
			padding-top: 30rpx;
		}
		
		.main {
			
			& > view {
				padding: 30rpx 0;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #F0F0F0;
				
				.icon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 1px solid #DDDDDD;
					margin-right: 30rpx;
					
					& > text {
						content: "";
						width: 0rpx;
						height: 0rpx;
						border-radius: 50%;
						background: #8987DF;
						transition: all .3s;
					}
					
					&.select { 
						border: 1px solid #8987DF;
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						
						/* ios 不支持 */
						/*
						&::before {
							content: "";
							width: 24rpx;
							height: 24rpx;
							border-radius: 50%;
							background: #8987DF;
						}
						*/ 
						
						& > text {
							width: 24rpx;
							height: 24rpx;
							border-radius: 50%;
							background: #8987DF;
						}
					}
				}
				
				image {
					width: 42rpx;
					height: 42rpx;
					margin-right: 20rpx;
				}
				
				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
	
	.recharge-money {
		padding: 30rpx;
		margin-bottom: 90rpx;
		
		.title {
			font-size: 17px;
			color: #333333;
			font-weight: bold;
		}
		
		.money-list {
			display: flex;
			flex-wrap: wrap;
			
			& > view {
				width: 210rpx;
				height: 140rpx;
				box-sizing: border-box;
				border: 1px solid #F0F1F1;
				border-radius: 10rpx;
				margin-top: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-right: 30rpx;
				
				& > text:first-child {
					color: #5B5B5B;
				}
				
				& > view {
					display: flex;
					align-items: center;
					color: #E9C885;
					
					text:first-child {
						font-size: 12px;
					}
					
					text:last-child {
						font-size: 24px;
					}
				}
				
				&:nth-child(3n) {
					margin-right: 0;
				}
				
				&.select {
					background: rgba(233,200,133,0.20);
					border: 1px solid #E9C885;
				}
			}
		}
	
		.explain {
			margin-top: 30rpx;
			color: #9B9B9B;
			
			view:last-child {
				margin-left: 54rpx;
				margin-top: 10rpx;
			}
		}
	}

	.confirm-buy {
		width: 750rpx;
		height: 90rpx;
		background: #8987DF;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	
	.no-select-confirm {
		background: #adadad;
	}
}
</style>
