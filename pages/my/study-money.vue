<template>
	<view class="container">
		<!-- 总额 -->
		<view class="header">
			<view>
				<text>学币总额</text>
				<text>¥{{ userInfo.allMoney }}</text>
			</view>
			<view>
				<view @click="handleOpenCashOut">提现</view>
				<view @click="handleOpenRecharge">充值</view>
			</view>
		</view>
		<!-- 可提现，不可提现 -->
		<view class="money-type">
			<view>
				<text>可提现金额</text>
				<text>{{ userInfo.okMoney }}</text>
			</view>
			<view>
				<text>不可提现金额</text>
				<text>{{ userInfo.noMoney }}</text>
			</view>
		</view>
		<view class="line-30"></view>
		<!-- 提现记录 -->
		<view class="cash-record">
			<view class="item" v-for="item in moneyList"> 
				<view class="left">
					<text>{{ item.createTime }}</text>
					<text>{{ item.type === 1 ? '充值' : item.type === 2 ? '学习课程' : item.type === 3 ? '提现' : '分佣' }}</text>
				</view>
				<view class="right">
					<text class="reduce" v-if="item.type !== 1 && item.type !== 4">-{{ item.money }}</text>
					<text class="add" v-if="item.type === 1 || item.type === 4">+{{ item.money }}</text> 
				</view>
			</view>
		</view>
		<uni-load-more :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components:{ uniLoadMore },
		data () {
			return {
				pageNum: 0, // 当前页数
				pageSize: 10, // 每页数量
				hasFlag: true,
				moneyList: [], // 学币日志
				userInfo: {}, // 用户信息
			}
		},
		methods: {
			// 打开充值页面
			handleOpenRecharge () {
				uni.navigateTo({
					url: '/pages/recharge/recharge'
				})
			},
			// 打开提现页面
			handleOpenCashOut () {
				uni.redirectTo({ url: '/pages/cash-out/cash-out?money='+this.userInfo.okMoney })
			},
			// 获取学币明细
			async getMoneyList () {
				if (!this.hasFlag) return
				++this.pageNum
				let res = await this.$fetch(this.$api.moneyList, { pageNum: this.pageNum, pageSize: this.pageSize })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.hasFlag = this.pageNum * this.pageSize < res.total
				this.moneyList = [...this.moneyList, ...res.rows]
			},
			// 获取个人信息
			async getUserInfo () {
				let res = await this.$fetch(this.$api.userInfo)
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.userInfo = res.data 
			}
		},
		onLoad() {
			this.getUserInfo()
			this.getMoneyList() 
		},
		onReachBottom () {
			this.getMoneyList()
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
	
	& > .header {
		position: relative;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		
		& > view:first-child {
			display: flex;
			align-items: center;
			
			text:first-child {
				color: #9B9B9B;
				margin-right: 40rpx;
			}
			
			text:last-child {
				font-size: 28px;
				color: #333333;
				font-weight: bold;
			}
		}
		
		& > view:last-child {
			
			view {
				width: 150rpx;
				height: 60rpx;
				background: #8987DF;
				margin-bottom: 30rpx;
				border-radius: 8rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #FFFFFF;
				
				&:last-child {
					margin-bottom: 0;
				}
				
				&:active {
					background: #6462a5;
				}
			}
		}
		
		&::before {
			content: "";
			position: absolute;
			width: 690rpx;
			height: 1px;
			left: 30rpx;
			bottom: 0;
			background: #F0F0F0;
		}
	}

	& > .money-type {
		display: flex;
		padding: 30rpx;
		
		& > view {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			text:first-child {
				font-size: 12px;
				color: #9B9B9B;
				margin-bottom: 8rpx;
			}
			
			text:last-child {
				font-size: 17px;
				font-weight: bold;
			}
			
			&:first-child {
				border-right: 1px solid #F0F0F0;
			}
		}
	}

	& > .cash-record {
		
		& > .item {
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			
			.left {
				display: flex;
				flex-direction: column;
				
				text:first-child {
					font-size: 12px;
					margin-bottom: 10rpx;
					color: #9B9B9B;
				}
			}
			
			.right {
				.add {
					font-size: 17px;
					color: #618FF0;
				}
				
				.reduce {
					font-size: 17px;
					color: #D0021B;
				}
			}
			
			&::before {
				content: "";
				position: absolute;
				left: 30rpx;
				bottom: 0;
				width: 720rpx;
				height: 1px;
				background: #f0f0f0;
			}
			
			&:last-child::before {
				display: none;
			}
		}
	}
}
</style>
