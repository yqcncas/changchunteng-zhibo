<template>
	<view class="container" v-if="showContainer">
		<image class="header-img" :src="detail.activity.pic" mode="aspectFill"></image>
		<!-- 活动标题 -->
		<view class="active-title">打包课程</view>
		<!-- 课程列表 -->
		<view class="course-list">
			<view class="course-item" v-for="item in detail.courseList" @click="handleOpenCourseDetail">
				<!-- 课程名称 -->
				<view class="course-name">
					<image class="course-name-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAA8CAYAAACgsw7vAAAAAXNSR0IArs4c6QAAA8pJREFUeAHtnT1M20AYhu9zfgRUZWFC/UlgQerEglS6MtMRtVMrsUGUCkoCVRFCiBYCFFQU2FqJqRVjmZlZmZBYINBWdGFBBdpA+HqhCrJMnPicIT77zeKf+w697/Ny57PiJJSZ2WeBV6AIkBDfjEA5hllBROcRIV4h+OD9M0wPvWnLIfgABU8kduPtsYWiZQQfoOCZjMG+PsoXLYcD5DvQVknQl/RobLMEASO+RMLHW7mKP4k0iNdmixjxZhp+3SdjYmgodmS2hxFvpuHDfXn7th1vf5i1WkPwViI+OpahM4XEgFzQFay2ELyViJ+OSXxKpeJb5Swh+HJUfHGOjpvuhMfsrCB4OzKanzcMMZpI3D+2s4Hg7chofF7es2+NpGOfK1nA7VwlOhq2yQVdQRg8UFzYVZKPEV+JjpZtnE2n27arSceIr0ZIq3Y6ami6O+FEMka8E0qa1BjEw8lky4kTuRjxTihpUCOv6ZupsfhXp1Ix4p2S8nZdnikyqCIRI16Flkdr5WhfSI/e21WRhxGvQsuLtUS5cDQ0rSoNwasS81i9ISg5PPzgXFUWglcl5qF6+QzdRmostuFGEoJ3Q80DfeR1/TzCIulWCoJ3S67+/a4fk3YrA8G7JVfHfubHpN3KQPBuyWneD8FrGCCz6MjtHYzUIh3B10Kvvn3Hl2b2424lIHi35Orcj5kbL0gsu5WB4N2S80A/OeX3ZjKHT91IQfBuqHmpD199XFz83qgqCcGrEvNaPXP8Ml8YV5WF4FWJebBeXu9HMpmfHSrSELwKLe/WRokvVlTkIXgVWh6ulaO+Z25u/7lTiQjeKSkN6rhAH5aXj5udSEXwTihpU8Otf85OppzIRfBOKGlVQwk55XdWk4zgqxHSrF1e60OiQKtyK78Iw/6F4O3ZaNvCgrvnZw/6KxlA8JXoaNwmPzg3m83+aLGzgODtyGh/nlvOTi9n7WwgeDsyfjjPon9+PtddzgqCL0fFJ+eKCzwuiNX1dbngs7wQvAWI3w5l+J25vcOE1ReCtxLx4zFfTS0t5VrN1hC8mYZP9+UKvzn/Vyya7SF4Mw0/7zM/y2QOekoWEXyJRAC2xFcrcqEXLVpF8AEIvGTR/Fg24TdpSliCsf3/mTt+hBEfjLxvXMrbu+vHssOnv3+9lKu+4rs5TTetpp3p908qvstjKsWuRgSMqXfda6EIdclvQ9zRSDek1kjgeqqfnHy8E4pGuuRvU63V+PfQXRMCt6bxibdbL8xTP6Z6TZJUlHlrcYepX5GgpuW3gi/6wNSvaZoKsv8B52XZjSl7aJYAAAAASUVORK5CYII="></image>
					<text class="course-name-text">{{ item.course.courseName }}</text>
				</view>
				<!-- 价格 -->
				<view class="price"><text class="price-text">¥{{ item.course.price }}</text></view>
				<!-- 课程标题 -->
				<text class="course-title">{{ item.course.name }}</text>
				<text class="course-time">{{ item.course.classTime }}</text>
				<!-- 课程难度 -->
				<view class="course-level">
					<text class="course-level-title">难度</text>
					<image v-for="star in item.course.level" class="course-level-star" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlFJREFUSA2dVU1LVUEYfuZeTdPyA+5O4kpUcMFbGiFEi36AVgvtmrRIilaS6xaB4V/QTdFeCP0BBS2Cyo8igoI+NlJguFDMrEVp9+2ZOdfDnDtHZ+4dGM7M+z7P887HO+8Bamgyhz55jP4aKMiEgmUeI8QukrHAQOOhPBUClAdoQQ5viC0YvGAVv3FG3cCGjx+2gxxKsbhWVOhCK276xCOoB8UzP8xjWaJoMQEVfMUf9Knr2EzYqyb+HWQw5IhrEYU8mjBWpedMD7wDrv5QZfW9DlMbBCsocxclbKX6aYwDyH1KHedVNqObowLJRX7PEXNxP3LFvkzsa44/8PuJnBWmwJqa4AGyKZnFMTTiHsdn2fMMmdN29vqa4CfZqwz2ngKTDRSfomGsPrUUlkIbrW3U1Cnd7L/kFI1gk6Cc4SVNcTvvgknhwI/UvpthBuhMGGSQV+FcL/It/mGA2p/NEXGgn/5lBnnipfoAgpf4i0tm4cTGd2Dqyhau0jbHLj6dVL/gKRd6RY3i+57fSUc+riPImhTr3gMFftd5LEWufM3GxzuwjO0cd1jz0OFRnofDcwNkcarOAE1MlqicW0tyAwhOW/7ahlmX6wYA0gtbSChdv6paIgAvOEt/TxUmmgrzA3jEPs0c2696FkwFtgQSAbBj6kje8uuE/WWEyzivhnCbfQK7/PELZlICddHXafOTARpNJXxWAWxT4CEJkXDJpK5xqWv4ooZxJw4E/IgceI6G5B/OfQf6B9+JCyR800+9EuzAD4/lBKvnSS7vhbqFbRv8HzgBjfYGEr3GAAAAAElFTkSuQmCC" mode="aspectFill"></image>
				</view>
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
		<!-- 购买选项 -->
		<view class="come-buy">
			<view>
				<text>打包优惠价：</text>
				<text>¥{{ detail.activity.price }}</text>
			</view>
			<view :class="detail.flag == -1 ? 'no-buy' : ''" @click="handleAwayBuy">立即支付</view>
		</view>
	</view>
</template>

<script>
	import { baseURL } from '@/config'
	export default {
		data() {
			return {
				baseURL: baseURL,
				actId: null,
				showContainer: false, // 页面是否展示
				detail: {},
				course_type_list: []
			};
		},
		methods: {
			// 获取活动信息
			async agetActiveInfo () {
				let res = await this.$fetch(this.$api.getActivityInfo, { actId: this.actId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.showContainer = true
				res.data.courseList.forEach(item => {
					this.course_type_list.forEach(courseItem => {
						if (item.course.courseTypeId === courseItem.id) item.course.courseName = courseItem.name
					})
				})
				this.detail = res.data
			},
			// 选择立即支付时
			async handleAwayBuy () {
				if (this.detail.flag == -1) return 
				let res = await this.$fetch(this.$api.genOrderFromActivity, { actId: this.actId })
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				uni.navigateTo({ url: '/pages/order-detail/order-detail?orderId=' + res.data.orderId })
			}
		},
		onLoad(options) {
			this.course_type_list =  uni.getStorageSync('course_type_list')
			this.actId = options.actId
			this.agetActiveInfo()
		}
	}
</script>

<style lang="less">
.container {
	
	.header-img {
		position: relative;
		z-index: -1;
		width: 100vw;
		height: 530rpx;
		vertical-align: middle;
	}
	
	.active-title {
		width: 100vw;
		height: 90rpx;
		background: #FFFFFF;
		border-radius: 20px 20px 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(51, 51, 51, .7);
		margin-top: -45rpx;
	}
	
	.course-list {
		padding: 30rpx;
		margin-bottom: 100rpx;
	}
	
	.course-item {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		background-color: #FFF;
		border-radius: 7px;
		position: relative;
		margin-bottom: 30rpx;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05), 0 4px 8px 0 rgba(0,0,0,0.03);
	}
	
	.course-name {
		position: absolute;
		top: 30rpx;
		left: -8rpx; 
		width: 126rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.course-name-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 126rpx;
		height: 60rpx;
	}
	
	.course-name-text {
		font-size: 14px;
		color: #FFFFFF;
		position: absolute;
		z-index: 2;
		transform: translateY(-5rpx);
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
	
	.come-buy {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 100rpx;
		box-sizing: border-box;
		border-top: 1rpx solid #eee;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		
		& > view:first-child {
			flex: 1;
			display: flex;
			justify-content: flex-end; 
			align-items: center;
			padding-right: 30rpx;
			
			text:first-child {
				font-size: 12px;
				color: #9B9B9B;
			}
			
			text:last-child {
				font-size: 18px;
				color: #D0021B;
			}
		}
		
		& > view:last-child {
			width: 260rpx;
			height: 100%;
			background: #8987DF;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
		}
	}
	
	.no-buy {
		background: #9c9c9c !important;
	}
}
</style>
