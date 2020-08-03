<template>
	<view class="container" v-if="showContainer">
		<!-- 已支付 -->
		<view class="header">
			<!-- 待支付 -->
			<view class="wait-buy" v-if="orderDetail.status === 2">
				<view>
					<view>待支付</view>
					<view>
						<text>订单金额</text>
						<text>¥{{ orderDetail.money }}</text>
					</view>
					<view v-if="false">剩23小时59分自动关闭</view>
				</view>
				<image src="/static/icon/24.png"></image>
			</view>
			<!-- 已支付 -->
			<view class="already-buy" v-if="orderDetail.status === 1">
				<view>
					<view>已支付</view>
					<view>
						<text>订单金额</text>
						<text>¥{{ orderDetail.money }}</text>
					</view>
				</view>
				<image src="/static/icon/25.png"></image>
			</view>
			<!-- 订单已关闭 -->
			<view class="closed-buy" v-if="orderDetail.status === 3">
				<view>
					<view>已取消</view>
					<view>
						<text>订单金额</text>
						<text>¥{{ orderDetail.money }}</text>
					</view>
				</view>
				<image src="/static/icon/26.png"></image>
			</view>
		</view>
		<view class="line-30"></view>
		<!-- 购买的课程列表 -->
		<view class="course-list">
			<view @click="handleOpenCourseDetail(courseItem)" class="order-course-item" v-for="(courseItem, courseIndex) in orderDetail.orderItems">
				<view class="order-course-item-header">
					<text class="order-course-type">{{ courseItem.course.courseTypeName }}</text>
					<text class="order-course-price">¥{{ courseItem.course.price }}</text>
				</view>
				<text class="order-course-name">{{ courseItem.course.name }}</text>
				<!-- 老师头像，姓名 -->
				<view class="order-course-base-info"> 
					<view class="order-course-base-info-left"> 
						<image class="teacher-avatar" :src="baseURL+courseItem.course.avatar" mode="aspectFill"></image>
						<text class="teacher-name">{{ courseItem.course.teacherName }}</text>
					</view>
					<text class="order-course-base-info-level">共{{ courseItem.course.childNum }}讲</text>
				</view>
			</view>
		</view>
		<!-- 总价 -->
		<view class="order-total">
			<text class="total-count">共{{ orderDetail.num }}项，总计：</text>
			<text class="total-price">¥{{ totalPrice }}</text>
		</view>
		<view class="line-30"></view>
		<!-- 订单信息 -->
		<view class="order-info">
			<view>
				<text>订单编号</text>
				<text>{{ orderDetail.orderNo }}</text>
			</view>
			<view>
				<text>下单时间</text>
				<text>{{ orderDetail.createTime }}</text>
			</view>
		</view>
		<!-- 订单详情 --> 
		<view class="order-handle" v-if="orderDetail.status === 2">
			<view @click="handleCancelOrder">取消订单</view>
			<view @click="handleOrderBuy">立即支付</view>
		</view>
	</view>
</template>

<script>
	import { baseURL } from '@/config'
	export default {
		data () {
			return {
				totalPrice: 0, // 总价（未打折）
				baseURL: baseURL,
				showContainer: false, // 页面是否展示
				orderId: null,
				orderDetail: {}, // 订单详情数据
				course_type_list: [], // 学科列表
				handleExist: false, // 时间判断
			}
		},
		methods: {
			// 获取订单详情
			async getOrderDetail () {
				let res = await this.$fetch(this.$api.orderInfo, { orderId: this.orderId })
				res.data.orderItems.forEach(item => {
					this.totalPrice += item.course.price
					this.course_type_list.forEach(course_type_item => {
						if (item.course.courseTypeId === course_type_item.id) {
							item.course.courseTypeName = course_type_item.name
						}
					})
				})
				this.showContainer = true
				this.orderDetail = res.data 
			},
			// 点击取消订单时触发
			async handleCancelOrder () {
				let res = await this.$fetch(this.$api.cancelOrder, { orderId: this.orderId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.showToast({ title: '订单取消成功~' })
				this.getOrderDetail()
			},
			// 订单支付界面
			async handleOrderBuy () {
				uni.showModal({
				    title: '提示',
				    content: '您确定要报名学习该课程吗？',
				    success: (handle) => {
				        if (handle.confirm) {
							this.handleExist = Date.now() > Date.parse(uni.getStorageSync('end_time')) ? true : false
							this.$fetch(this.$api.pay, { orderId: this.orderId, pay: true, reward: true }).then(res => {
								if (res.code) return uni.showToast({ title: res.msg, icon: 'none' }) 
								this.getOrderDetail()
								if (!this.handleExist) {
									uni.showModal({
									    title: '报名成功',
									    content: '稍后客服会通过手机号码联系您，确定具体的上课时间及地点，请保持手机畅通！',
										showCancel: false
									});
								}
							})
				        }
				    }
				});
			},
			// 打开课程详情
			handleOpenCourseDetail ({ courseId }) {
				uni.navigateTo({ url: '/pages/course-detail/course-detail?courseId='+courseId }) 
			}
		},
		onLoad(options) {
			this.orderId = options.orderId
			this.course_type_list = uni.getStorageSync('course_type_list')
			this.getOrderDetail()
		}
 	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}

/* 顶部阴影 */
page::after {
	content: "";
	position: fixed;
	top: 0;
	/*  #ifdef H5 */
	top: 44px;
	/*  #endif  */
	left: 0;
	box-shadow: inset 0 4upx 8upx 0 rgb(244, 244, 244);
	z-index: 9;
	width: 750upx;
	height: 8upx;
}

.container {
	
	.header {
		background: #FFFFFF;
		
		& > .wait-buy {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 60rpx;
			
			& > view {
				
				view:first-child {
					font-size: 20px;
					color: #4A90E2;
					margin-bottom: 30rpx;
				}
				
				view:nth-child(2) {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					
					text:first-child {
						margin-right: 20rpx;
					}
					
					text:last-child {
						font-size: 18px;
						color: #D0021B;
					}
				}
				
				view:last-child {
					color: #9B9B9B;
				}
			}
			
			& > image {
				width: 176rpx;
				height: 162rpx;
			}
		}
		
		& > .already-buy {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 60rpx;
			
			& > view {
				
				view:first-child {
					font-size: 20px;
					margin-bottom: 30rpx;
				}
				
				view:last-child {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					
					text:first-child {
						margin-right: 20rpx;
					}
					
					text:last-child {
						font-size: 18px;
						color: #D0021B;
					}
				}
			}
			
			& > image {
				width: 122rpx;
				height: 122rpx;
			}
		}
		
		& > .closed-buy {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 60rpx;
			
			& > view {
				 
				view:first-child {
					font-size: 20px;
					color: #9B9B9B; 
					margin-bottom: 30rpx;
				}
				
				view:last-child {
					display: flex;
					align-items: center;
					margin-bottom: 10rpx;
					
					text:first-child {
						margin-right: 20rpx;
					}
					
					text:last-child {
						font-size: 18px;
						color: #D0021B;
					}
				}
			}
			
			& > image {
				width: 146rpx;
				height: 164rpx;
			}
		}
	}

	.course-list {
		background: #FFFFFF;
		padding: 30rpx;
		padding-bottom: 0;
		
		.order-course-item {
			padding-top: 30rpx;
			border-top: 1px solid #F6F6F6;
			
			&:first-child {
				padding-top: 0;
				border-top: none;
			}
		}
		
		.order-course-item-header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;
		}
		
		.order-course-type {
			background-color: rgba(137,135,223,0.30);
			border-radius: 2px;
			padding: 5rpx 14rpx;
			font-size: 12px;
			color: #8987DF;
		}
		
		.order-course-name {
			margin-top: 20rpx;
			font-size: 17px;
			font-weight: bold;
			color: #333333;
		}
		
		.order-course-price {
			font-size: 14px;
			color: #333333;
			font-weight: bold;
		}
		
		.order-course-base-info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			padding-bottom: 30rpx;
		}
		
		.last-order-course-base-info {
			padding-bottom: 30rpx;
			border-bottom-width: 0px;
		}
		
		.teacher-avatar {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.teacher-name {
			font-size: 14px;
			color: #333333;
		}
		
		.order-course-base-info-left {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
		.order-course-base-info-level {
			color: #8987DF;
			font-size: 14px;
		}
	}
	
	.order-total {
		background: #FFFFFF;
		padding: 30rpx;
		padding-top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		
		.total-count {
			color: #9B9B9B;
			font-size: 14px;
		}
		
		.total-price {
			font-size: 18px;
			color: #D0021B;
		}
	}
	
	.order-info {
		margin-bottom: 100rpx;
		background: #FFFFFF;
		padding: 30rpx;
		color: #9B9B9B;
		
		& > view {
			
			&:first-child {
				margin-bottom: 10rpx;
			} 
			
			text:first-child {
				margin-right: 30rpx;
			}
		}
	}

	.order-handle {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		
		& > view {
			width: 160rpx;
			height: 60rpx;
			color: #8987DF;
			border-radius: 30rpx;
			border: 1px solid #8987DF;
			margin-right: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			&:first-child {
				border: 1px solid #9B9B9B;
				color: #9B9B9B; 
			}
		}
	}
}
</style>
