<template>
	<view class="container">
		<!-- <video src="rtmp://achao.bajiaostar.com/live/123456789" :autoplay="true"></video> -->
		<view class="header right-arrow" @click="handleOpenDetail">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				<text>{{ userInfo.userName }}</text>
			</view>
		</view>
		<!-- 订单收藏 -->
		<view class="collect-order">
			<view @click="handleOpenOrder">
				<image src="/static/icon/6.png"></image>
				<text>我的订单</text>
			</view>
			<view @click="handleOpenCollect">
				<image src="../../static/icon/7.png"></image>
				<text>我的收藏</text>
			</view>
		</view>
		<!-- 过渡线 -->  
		<view class="line-30"></view>
		<!-- 导航菜单 -->
		<view class="nav-list">
			<view class="item right-arrow" @click="handleOpenMyStudyMoney"> 
				<view class="money">
					<view>
						<image src="/static/icon/8.png"></image>
						<text>我的学币</text> 
					</view> 
					<view class="balance">余额：{{ userInfo.allMoney }}</view>
				</view>
			</view>
			
			<view @click="handleOpenNavDetail(item)" class="item right-arrow" v-for="item in navList" :key="item.id">
				<view>
					<image :src="item.imgUrl"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [
					{
						id: 2,
						name: '操作指南',
						openUrl: '/pages/operate-guide/operate-guide?type=1',
						imgUrl: require('@/static/icon/9.png')
					},
					{
						id: 3,
						name: '邀请好友',
						openUrl: '/pages/my/invitation-qrcode',
						imgUrl: require('@/static/icon/10.png')
					},
					{
						id: 4,
						name: '联系客服',
						openUrl: '/pages/my/service',
						imgUrl: require('@/static/icon/11.png')
					},
					{
						id: 5,
						name: '我要加盟',
						openUrl: '/pages/operate-guide/operate-guide?type=4',
						imgUrl: require('@/static/icon/12.png')
					},
					{
						id: 6,
						name: '系统设置',
						openUrl: '/pages/system-set/system-set',
						imgUrl: require('@/static/icon/13.png')
					}
				],
				userInfo: {}, // 用户信息
			};
		},
		methods: {
			// 修改用户信息
			handleOpenDetail () {
				uni.navigateTo({ url: '/pages/my-info/my-info' })
			},
			// 前往导航菜单内页
			handleOpenNavDetail (item) {
				console.log(item)
				uni.navigateTo({ url: item.openUrl })
			},
			// 打开订单列表
			handleOpenOrder () {
				uni.navigateTo({
					url: '/pages/order/order'
				})
			},
			// 我的学币
			handleOpenMyStudyMoney () { 
				uni.navigateTo({ url: '/pages/my/study-money' }) 
			},
			// 前往我的收藏页面
			handleOpenCollect () {
				uni.navigateTo({ url: '/pages/my/my-collect' })
			},
			// 获取个人信息
			async getUserInfo () {
				let res = await this.$fetch(this.$api.userInfo)
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.userInfo = res.data
				uni.setStorageSync('user_info', res.data)
			}
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}
	.container {
		background: #FFFFFF;
		
		.header {
			position: relative;
			padding: 30rpx;

			.user-info {
				display: flex;
				align-items: center;

				.avatar {
					width: 140rpx;
					height: 140rpx;
					background: #f2f2f2;
					border-radius: 50%;
					margin-right: 40rpx;
				}

				text {
					font-weight: bold;
					font-size: 17px;
				}
			}

			&::before {
				content: "";
				position: absolute;
				width: 690rpx;
				height: 1px;
				background: #F7F7F7;
				bottom: 0;
			}
		}

		.collect-order {
			padding: 30rpx;
			display: flex;

			&>view {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 90rpx;
					height: 90rpx;
					margin-right: 30rpx;
				}

				&:first-child {
					border-right: 1rpx solid #F0F0F0;
				}
			}
		}

		.nav-list {
			&>.item {
				position: relative;
				padding: 25rpx;
				background: #fff;

				view {
					display: flex;
					align-items: center;

					image {
						width: 50rpx;
						height: 50rpx;
						margin-right: 24rpx;
					}
				}

				.money {
					flex: 1;
					display: flex;
					justify-content: space-between;

					.balance {
						color: #9B9B9B;
						font-size: 14px;
						margin-right: 20rpx;
					}
				}

				&::before {
					content: "";
					position: absolute;
					bottom: 0rpx;
					left: 90rpx;
					width: 600rpx;
					height: 1px;
					background: #F6F6F6;
				}

				&:first-child {
					border-radius: 7px 7px 0 0;
				}

				&:last-child {
					border-radius: 0 0 7px 7px;
				}

			}
		}

	}
</style>
