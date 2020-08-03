<template>
	<view class="container">
		<view class="list">
			<view v-for="item in cartList" :key="item.orderItemId" @click="handleToggle(item)">
				<icon v-if="item.select" type="success" size="22"/>
				<icon v-if="!item.select" type="circle" size="22" /> 
				<view class="main" @click.stop="handleOpenCourseDetail(item.course.courseId)"> 
					<!-- 课程名称 -->
					<view class="course-name">
						<text class="course-name-text">{{ item.course.courseTypeName }}</text>
					</view>
					<!-- 价格 -->
					<view class="price"><text class="price-text">¥{{ item.course.price }}</text></view>
					<!-- 课程标题 -->
					<text class="course-title">{{ item.course.name }}</text>
					<!-- 讲师 -->
					<view class="teacher">
						<view class="teacher-left">
							<image class="teacher-avatar" :src="baseURL+item.course.avatar" mode="aspectFill"></image>
							<text class="teacher-name">{{ item.course.teacherName }}</text>
						</view>
						<text class="course-collection">共{{ item.course.childNum }}讲</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
		</view>
		<view class="settle-accounts">
			<view class="main">
				<view class="left">
					<!-- 全选/取消全选 -->
					<icon v-if="!totalSelect" type="circle" size="22" @click="handleTotalSelect"></icon>
					<icon v-if="totalSelect" type="success" size="22" @click="handleCancelTotalSelect"></icon>
					<text>全选</text>
					<view style="color: #4A90E2;margin-left: 20rpx;" @click="handleDeleteCart">删除</view>
				</view>
				<view class="right">
					<text>合计：</text>
					<!-- 总价 -->
					<text>¥{{ totalSelectPrice }}</text> 
				</view>
			</view>
			<!-- 没有勾选时 -->
			<view v-if="!isExistSelectCart" class="confirm-no">结算</view>
			<!-- 勾选时 -->
			<view v-if="isExistSelectCart" class="confirm" @click="handleGenerateOrder">结算</view>
		</view>
	</view>
</template>

<script>
	import { baseURL } from '@/config'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components:{ uniLoadMore },
		data() {
			return {
				isExistSelectCart: false, // 判断购物车是否有选中商品
				baseURL: baseURL, // 基础地址
				cartList: [], // 购物车列表
				totalSelect: false, // 是否全选
				totalSelectPrice: 0, // 当前选中价格汇总
				hasFlag: true, // 是否还有更多
				pageNum: 0, // 当前页码
				pageSize: 10, // 每页数量
				course_type_list: [], // 学科列表
			};
		},
		watch: {
			'cartList': {
				handler: function (newVal) {
					this.isExistSelectCart = false
					this.totalSelectPrice = 0
					let selectTotalCount = 0 // 选中总数量
					newVal.forEach(item => {
						if (item.select) {
							this.isExistSelectCart = true
							selectTotalCount++
							this.totalSelectPrice += item.course.price
						}
					})
					// 判断选中数量是否等同于购物车数量
					this.totalSelect = selectTotalCount === newVal.length && newVal.length !== 0
				},
				deep: true
			}
		},
		methods: {
			// 获取购物车列表
			async getCartList () {
				if (!this.hasFlag) return // 说明已经没有更多啦
				++this.pageNum
				let res = await this.$fetch(this.$api.getCartList, { pageNum: this.pageNum, pageSize: this.pageSize })
				this.hasFlag = this.pageNum * this.pageSize < res.total
				res.rows.forEach(item => {
					item.select = false // 默认全部没选中
					this.course_type_list.forEach(course_type_item => {
						if (item.course.courseTypeId === course_type_item.id) {
							item.course.courseTypeName = course_type_item.name
						}
					})
				})
				
				this.cartList = [...this.cartList, ...res.rows]
			},
			// 切换购物车状态
			handleToggle (item) {
				if (item.select) return item.select = false
				else item.select = true
			},
			// 全选
			handleTotalSelect () {
				if (!this.cartList.length) return uni.showToast({ title: '购物车中还没有课程~', icon: 'none' })
				this.totalSelect = true
				this.cartList.forEach(item => {
					item.select = true
				})
			},
			// 取消全选
			handleCancelTotalSelect () {
				this.totalSelect = false
				this.cartList.forEach(item => {
					item.select = false
				})
			},
			// 购物车生成订单
			async handleGenerateOrder () {
				uni.showLoading({ title: '订单生成中...' })
				let orderItemIds = []
				this.cartList.forEach(item => { if (item.select) orderItemIds.push(item.orderItemId) })
				let res = await this.$fetch(this.$api.genOrder, { orderItemIds: orderItemIds.join(',') }) 
				uni.hideLoading()
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				console.log(res)
				// 前往订单页面
				uni.navigateTo({ url: '/pages/order-detail/order-detail?orderId=' + res.data.orderId })
			},
			// 前往课程详情页面
			handleOpenCourseDetail (courseId) {
				uni.navigateTo({ url: '/pages/course-detail/course-detail?courseId='+courseId })
			},
			// 删除选中的购物车中的商品
			async handleDeleteCart () {
				let orderItemIds = []
				this.cartList.forEach(item => { if (item.select) orderItemIds.push(item.orderItemId) })
				if (!orderItemIds.length) return uni.showToast({ title: '您还没有选中要删除的课程~', icon: 'none' })
				let orderItemIdsClone = JSON.parse(JSON.stringify(orderItemIds))
				let res = await this.$fetch(this.$api.delCart, { orderItemIds: orderItemIdsClone.join(',') })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				// 重置数据
				this.hasFlag = true // 是否还有更多
				this.pageNum = 0 // 当前页码
				this.pageSize = 10 // 每页数量
				this.cartList = [] // 列表
				this.getCartList() // 获取最新的
			}
		},
		onLoad() {
			this.getCartList()
			this.course_type_list = uni.getStorageSync('course_type_list')
		},
		onReachBottom () {
			this.getCartList()
		}
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}
.container {
	
	.list {
		margin-bottom: 110rpx;
		
		& > view {
			padding: 30rpx;
			display: flex;
			align-items: center;
			
			&:nth-last-child(2) {
				padding-bottom: 0;
			}
			
			&:last-child {
				padding: 0;
			}
			
			.icon {
				border-radius: 50%;
				box-sizing: border-box;
				width: 22px;
				height: 22px;
				border: 1px solid #ddd;
				margin-right: 22rpx;
			}
			
			icon {
				margin-right: 22rpx;
			}
			
			& > .main {
				flex: 1;
				background: #FFFFFF;
				padding: 30rpx;
				display: flex;
				position: relative;
				flex-direction: column;
				border-radius: 7px;
				
				.course-name {
					position: absolute;
					top: 30rpx;
					left: -8rpx; 
					width: 126rpx;
					height: 60rpx;
					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAA8CAYAAACgsw7vAAAAAXNSR0IArs4c6QAAA8pJREFUeAHtnT1M20AYhu9zfgRUZWFC/UlgQerEglS6MtMRtVMrsUGUCkoCVRFCiBYCFFQU2FqJqRVjmZlZmZBYINBWdGFBBdpA+HqhCrJMnPicIT77zeKf+w697/Ny57PiJJSZ2WeBV6AIkBDfjEA5hllBROcRIV4h+OD9M0wPvWnLIfgABU8kduPtsYWiZQQfoOCZjMG+PsoXLYcD5DvQVknQl/RobLMEASO+RMLHW7mKP4k0iNdmixjxZhp+3SdjYmgodmS2hxFvpuHDfXn7th1vf5i1WkPwViI+OpahM4XEgFzQFay2ELyViJ+OSXxKpeJb5Swh+HJUfHGOjpvuhMfsrCB4OzKanzcMMZpI3D+2s4Hg7chofF7es2+NpGOfK1nA7VwlOhq2yQVdQRg8UFzYVZKPEV+JjpZtnE2n27arSceIr0ZIq3Y6ami6O+FEMka8E0qa1BjEw8lky4kTuRjxTihpUCOv6ZupsfhXp1Ix4p2S8nZdnikyqCIRI16Flkdr5WhfSI/e21WRhxGvQsuLtUS5cDQ0rSoNwasS81i9ISg5PPzgXFUWglcl5qF6+QzdRmostuFGEoJ3Q80DfeR1/TzCIulWCoJ3S67+/a4fk3YrA8G7JVfHfubHpN3KQPBuyWneD8FrGCCz6MjtHYzUIh3B10Kvvn3Hl2b2424lIHi35Orcj5kbL0gsu5WB4N2S80A/OeX3ZjKHT91IQfBuqHmpD199XFz83qgqCcGrEvNaPXP8Ml8YV5WF4FWJebBeXu9HMpmfHSrSELwKLe/WRokvVlTkIXgVWh6ulaO+Z25u/7lTiQjeKSkN6rhAH5aXj5udSEXwTihpU8Otf85OppzIRfBOKGlVQwk55XdWk4zgqxHSrF1e60OiQKtyK78Iw/6F4O3ZaNvCgrvnZw/6KxlA8JXoaNwmPzg3m83+aLGzgODtyGh/nlvOTi9n7WwgeDsyfjjPon9+PtddzgqCL0fFJ+eKCzwuiNX1dbngs7wQvAWI3w5l+J25vcOE1ReCtxLx4zFfTS0t5VrN1hC8mYZP9+UKvzn/Vyya7SF4Mw0/7zM/y2QOekoWEXyJRAC2xFcrcqEXLVpF8AEIvGTR/Fg24TdpSliCsf3/mTt+hBEfjLxvXMrbu+vHssOnv3+9lKu+4rs5TTetpp3p908qvstjKsWuRgSMqXfda6EIdclvQ9zRSDek1kjgeqqfnHy8E4pGuuRvU63V+PfQXRMCt6bxibdbL8xTP6Z6TZJUlHlrcYepX5GgpuW3gi/6wNSvaZoKsv8B52XZjSl7aJYAAAAASUVORK5CYII=');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				
				.course-name-text {
					font-size: 14px;
					color: #FFFFFF;
					transform: translateY(-4rpx);
				}
				
				.price {
					text-align: right; 
				}
				
				.price-text {
					text-align: right;
					font-size: 22px;
					color: #D0021B;
				}
				
				.course-title {
					margin-top: 20rpx;
					font-size: 17px;
					font-weight: bold; 
					color: #333333;
				}
				
				.course-time {
					font-size: 14px;
					color: #9B9B9B;
					margin-top: 10rpx;
				}
				
				.course-level {
					margin-top: 16rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				
				.course-level-title {
					font-size: 14px;
					color: #9B9B9B;
					margin-right: 20rpx;
				}
				
				.course-level-star {
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}
				
				.teacher {
					margin-top: 30rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
				}
				
				.teacher-left {
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				
				.teacher-avatar {
					width: 56rpx;
					height: 56rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				
				.teacher-name {
					font-size: 14px;
				}
				
				.course-collection {
					color: #8987DF;
					font-size: 14px;
				}
			}
		}
	}
	
	.settle-accounts {
		box-shadow: 0px -5rpx 5rpx -5rpx rgba(0, 0, 0, .06);
		position: fixed;
		bottom: 0rpx;
		background: #fff;
		display: flex;
		align-items: center;
		width: calc(100vw - 60rpx);
		height: 110rpx;
		padding: 0 30rpx;
	}
	
	.settle-accounts > .main {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.settle-accounts > .main > .left {
		display: flex;
		align-items: center;
	}
	
	.settle-accounts > .main > .left > icon {
		margin-right: 20rpx;
	}
	
	.settle-accounts > .main > .right {
		display: flex;
		align-items: center;
	}
	
	.settle-accounts > .main > .right > text:last-child {
		font-size: 12px;
		color: #9B9B9B;
	}
	
	.settle-accounts > .main > .right > text:last-child {
		font-size: 18px;
		color: #D0021B;
	}
	
	.settle-accounts > .confirm {
		width: 160rpx;
		height: 70rpx;
		background: #8987DF;
		border-radius: 35rpx;
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin-left: 20rpx;
	}
	
	.settle-accounts > .confirm-no {
		width: 160rpx;
		height: 70rpx;
		background: #C1C1C1;
		border-radius: 35rpx;
		text-align: center;
		color: #fff;
		line-height: 70rpx;
		margin-left: 20rpx;
	}
}
</style>
