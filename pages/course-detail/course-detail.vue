<template>
	<view class="container" v-show="showContainer">
		<image class="header-bg" :src="detail.course.pic" mode="aspectFill"></image>
		<!-- 课程信息 --> 
		<view class="course-info">
			<view class="type">
				<text>{{ detail.course.courseTypeName }}</text>
				<text>{{ detail.course.name }}</text>
			</view>
			<view class="address" v-if="!handleExist" style="margin-bottom: 20rpx;">
				<text style="color: #9B9B9B;margin-right: 22rpx;">上课地址</text>
				<text>{{ detail.course.address }}</text> 
			</view> 
			<view class="time"> 
				<text>时间</text>
				<text>{{ detail.course.classTime }}</text>
			</view>
			<view class="level">
				<text>难度</text>
				<image v-for="item in detail.course.level" src="/static/icon/2.png" mode="aspectFill"></image>
			</view>
			<!-- 价格，收藏等 -->
			<view class="main">
				<view class="left">
					<text>¥{{ detail.course.price }}</text>
					<text>共{{ detail.course.times }}名同学学习该课程</text>
				</view>
				<!-- 未收藏 -->
				<image @click="handleCollect(detail.collect)" v-if="!detail.collect" mode="aspectFill" src="/static/icon/3.png"></image>
				<!-- 已收藏 -->
				<image @click="handleCollect(detail.collect)" v-if="detail.collect" mode="aspectFill" src="/static/icon/30.png"></image>
			</view>
			<!-- 过渡线 -->
		</view>
		<view class="line-30"></view>
		<!-- 授课老师 -->
		<view class="teachar">
			<view>授课老师</view>
			<scroll-view :scroll-x="true" class="teacher-list">
				<view class="teacher-item" v-for="item in 1" :key="item" @click="handleOpenTeacherDetail">
					<view class="right-arrow">
						<image class="avatar" :src="baseURL+detail.course.avatar" mode="aspectFill"></image>
						<view>
							<text>授课</text>
							<text>{{ detail.course.teacherName }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 过渡线 -->
		<view class="line-30"></view>
		<!-- 讲课大纲 -->
		<view class="course-list">
			<view class="title">讲课大纲·共{{ detail.course.childNum }}讲</view>
			<view class="item" v-for="item in detail.chapterList" :key="item.chapterId">
				<view>
					<text>第{{ item.chapterCount }}节</text>
					<text>{{ item.name }}</text>
				</view>
				<!-- <view>时间</view> -->
				<view class="vip-handle" v-if="handleExist">
					<!-- 开课状态为已结束并且有视频地址 -->
					<view class="recorded" v-if="item.video && item.status === 2" @click="handleVideoPlay(item.video)">听课</view>
					<!-- 是直播课并且状态为1正在直播 -->
					<view class="live" v-if="detail.course.type === 1 && item.status === 1" @click="handleEnterRoom">正在直播</view>
					<!-- 状态为正在直播且暂未开播并且没有video -->
					<view class="not-started" v-if="detail.course.type === 1 && item.status === 0 && !(item.video)">暂未开播</view>
				</view>
			</view>
			<!-- 全部课程 -->
			<view class="total" @click="hanldeOpenTotal">查看全部课程</view>
		</view>
		<!-- 过渡线 -->
		<view class="line-30" v-if="detail.course.actId"></view>
		<!-- 课程详情 -->
		<view class="course-active" v-if="detail.course.actId">
			<view class="title">课程活动</view>
			<image @click="handleOpenActiveDetail" class="active-pic" :src="detail.course.actPic" mode="aspectFill"></image>
		</view>
		<!-- 过渡线 -->
		<view class="line-30"></view>
		<view class="course-detail">
			<view class="title">课程详情</view>
			<parser :html="detail.course.content" show-with-animation lazy-load>加载中...</parser>
		</view>
		
		<view style="height: 128rpx;background: #F7F7F7;"></view>
		<!-- 用户暂未购买时 -->
		<view class="no-buy" v-if="!detail.buy">
			<view class="service" @click="handleOpenService">
				<image src="/static/icon/5.png"></image> 
				<text>客服</text>
			</view>
			<view class="cart" @click="handleOpenCart">
				<image src="/static/icon/4.png"></image>
				<text>购物车</text>
			</view>
			<view class="add-card" @click="handleAddCart">加入购物车</view>
			<view class="sign" @click="handleOpenLive">立即报名</view>
		</view>
		<view class="already-buy" v-if="detail.buy" @click="hanldeOpenTotal">
			<view class="service" @click="handleOpenService">
				<image src="/static/icon/5.png"></image>
				<text>客服</text>
			</view>
			<view>{{ handleExist ? '立即学习' : '章节列表' }}</view>
		</view>
	</view>
</template> 

<script>
	import { baseURL } from '@/config'
	import parser from "@/components/jyf-Parser/index"
	export default {
		data() {
			return {
				showContainer: false, // 数据是否加载完毕
				baseURL: baseURL,
				courseId: null,
				detail: { course: {} },
				courseTypeList: [],
				collectFlag: true, // 默认是可以点击收藏的
				handleExist: false
			};
		},
		components: {
			parser
		},
		methods: {
			// 获取课程详情
			async getCourseInfo () {
				let res = await this.$fetch(this.$api.getCourseInfo, { courseId: this.courseId })
				this.showContainer = true
				res.data.chapterList.forEach((item, index) => {
					item.chapterCount = this.$numberToChinese(index + 1)
				})
				this.detail = res.data 
				console.log(this.detail) 
				this.courseTypeList.forEach(item => {
					if (item.id === this.detail.course.courseTypeId) this.detail.course.courseTypeName = item.name
				})
			},
			// 查看全部课程
			hanldeOpenTotal () {
				uni.navigateTo({ url: '/pages/total-course/total-course?courseId='+ this.courseId + '&type=' + this.detail.course.type + '&teacherId=' + this.detail.course.teacherId + '&robot=' + this.detail.course.robot })
			},
			// 前往购物车页面
			handleOpenCart () {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			// 加入购物车
			async handleAddCart () {
				let res = await this.$fetch(this.$api.addCart, { courseId: this.courseId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.showToast({ title: '加入购物车成功~' })
			},
			// 课程直接生成订单
			async handleOpenLive () {
				let res = await this.$fetch(this.$api.genOrderFromCourse, { courseId: this.courseId }) 
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				// 已生成订单之后 
				uni.navigateTo({ url: '/pages/order-detail/order-detail?orderId=' + res.data.orderId })
				// return
				// uni.navigateTo({ url: '/pages/live-detail/live-detail' })
			},
			// 收藏 / 取消收藏该课程
			async handleCollect (flag) {
				if (!this.collectFlag) return uni.showToast({ title: '请勿连续重复点击~', icon: 'none' })// 等待上次结果返回
				this.collectFlag = false
				if (!flag) {
					let res = await this.$fetch(this.$api.collect, { courseId: this.courseId })
					this.collectFlag = true
					if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
					uni.showToast({ title: '加入收藏成功' })
					// 更改收藏状态
					this.detail.collect = true
				} else {
					let res = await this.$fetch(this.$api.cancelCollect, { courseId: this.courseId })
					this.collectFlag = true
					if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
					// 更改收藏状态
					this.detail.collect = false
				}
			},
			// 录播视频播放
			handleVideoPlay (src) {  
				uni.navigateTo({ url: '/pages/video-detail/video-detail?src='+src })
			},
			// 打开教师详情
			handleOpenTeacherDetail () {
				uni.navigateTo({ url: '/pages/teacher-detail/teacher-detail?teacherId='+this.detail.course.teacherId })
			},
			// 前往客服中心
			handleOpenService () {
				uni.navigateTo({
					url: '/pages/my/service?teacherId='+this.detail.course.teacherId
				})
			},
			// 进入直播间
			handleEnterRoom () { 
				uni.navigateTo({ url: '/pages/live-detail/live-detail?courseId='+this.detail.course.courseId+'&robot='+this.detail.course.robot })
			},
			// 前往活动详情
			handleOpenActiveDetail () {
				console.log(this.detail.course.actId) 
				if (this.detail.course.actId) uni.navigateTo({ url: '/pages/activity/activity?actId='+this.detail.course.actId })
			} 
		},
		onLoad(options) {
			this.courseTypeList = uni.getStorageSync('course_type_list') || []
			this.courseId = options.courseId
			this.getCourseInfo() 
			// 判断是否显示 视频 handle
			this.handleExist = Date.now() > Date.parse(uni.getStorageSync('end_time')) ? true : false
			console.log(this.handleExist)
		}
	}
</script>

<style lang="less">
.container {
	
	.header-bg {
		width: 100vw;
		height: 430rpx;
	}
	
	.course-info {
		padding: 30rpx;
		
		.type {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			text:first-child {
				background: #8987Df;
				padding: 2rpx 6rpx;
				margin-right: 22rpx;
				font-size: 12px;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 4rpx;
			}
			
			text:last-child {
				font-size: 17px;
				color: #333333;
				font-weight: bold;
			}
		}
		
		.time, .level {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			
			text:first-child {
				color: #9B9B9B;
				margin-right: 30rpx;
			}
		}
		
		.level {
			
			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 6rpx;
			}
		}
		
		.main {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			view:first-child {
				display: flex;
				align-items: center;
				
				text:first-child {
					font-size: 22px;
					color: #D0021B;
					margin-right: 20rpx;
				}
				
				text:last-child {
					font-size: 12px;
					color: #9B9B9B;
				}
			}
			
			image {
				width: 42rpx;
				height: 38rpx;
			}
		}
	}

	.teachar {
		padding: 30rpx;
		
		& > view:first-child {
			font-size: 17px;
			font-weight: bold;
		}
		
		.teacher-list {
			white-space: nowrap;
			margin-top: 20rpx;
			
			.teacher-item {
				display: inline-block;
				margin-right: 60rpx;
				& > view {
					height: 90rpx;
					
					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					
					& > view {
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-right: 30rpx;
						
						text:first-child {
							font-size: 12px;
							color: #9B9B9B;
						}
					}
				}
			} 
		}
	}

	.course-list {
		padding: 30rpx;
		
		.title {
			font-size: 17px;
			font-weight: bold;
		}
		
		.item {
			padding: 30rpx 0;
			border-bottom: 1px solid #F7F7F7;
			
			& > view:first-child {
				
				text:first-child {
					color: #8987DF;
					margin-right: 30rpx;
				}
			}
			
			& > .vip-handle {
				display: flex;
				justify-content: flex-end;
				
				& > view {
					margin-top: 20rpx;
					width: 150rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 8rpx;
					color: #FFFFFF;
					
					&.recorded {
						background: #618FF0;
					}
					
					&.live {
						background: #8987DF;
					}
					
					&.not-started {
						background: #F7F7F7;
						color: #9B9B9B;
					}
				}
			}
		}
		
		.total {
			background: #F7F7F7;
			border-radius: 30rpx;
			width: 220rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #9B9B9B;
			margin: 0 auto;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
		}
	}
	
	.course-active {
		padding: 30rpx;
		
		.title {
			font-size: 17px;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		
		.active-pic {
			width: 690rpx;
			height: 300rpx;
			border-radius: 6rpx; 
		}
	}
	
	.course-detail {
		padding: 30rpx;
		
		.title {
			font-size: 17px;
			font-weight: bold;
		}
	}
	
	.no-buy {
		border-top: 1rpx solid #F6F6F6;
		position: fixed;
		background: #FFFFFF;
		bottom: 0;
		width: 100vw;
		height: 98rpx;
		display: flex;
		
		& > view {
			flex: 2;
			
			image {
				width: 46rpx;
				height: 46rpx;
				margin-bottom: 6rpx;
			}
		}
		
		.service, .cart {
			flex: 1;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center; 
			color: #9B9B9B;
		}
		
		.add-card, .sign{
			background: #618FF0;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
		
		.sign {
			background: #8987DF;
		}
	}
	
	.already-buy {
		border-top: 1rpx solid #F6F6F6;
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 98rpx;
		display: flex;
		// justify-content: center;
		align-items: center;
		color: #FFFFFF; 
		background: #FFFFFF;
		
		.service {
			width: 125rpx;
			height: 98rpx;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center; 
			color: #9B9B9B;
			
			image {
				width: 46rpx;
				height: 46rpx;
				margin-bottom: 6rpx;
			}
		}
		
		&:active {
			opacity: .8;
		}
		
		view:last-child {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #8987DF;
		}
	}
}
</style>
