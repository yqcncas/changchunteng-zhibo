<template>
	<view class="container">
		<!-- 老师基本信息，所在照片 -->
		<view class="header">
			<image class="teacherPic" :src="teacherDetail.pic" mode="aspectFill"></image>
			<!-- 老师基本信息，标签 -->
			<view class="info">
				<view class="name">{{ teacherDetail.userName }}</view>
				<view class="type">{{ teacherDetail.lessons }}</view>
				<view class="labels">
					<text>{{ teacherDetail.edu }}</text>
					<text>教龄{{ teacherDetail.years }}年</text>
				</view>
			</view>
		</view>
		<!-- 老师课程与老师富文本信息 -->
		<view class="teacher-tabs">
			<view @click="tabSelect = false" :class="!tabSelect ? 'select' : ''">介绍</view>
			<view @click="tabSelect = true" :class="tabSelect ? 'select' : ''">课程</view>
		</view>
		<view class="content">
			<view style="padding: 30rpx;" v-show="tabSelect === false">
				<parser :html="teacherDetail.remark" show-with-animation lazy-load>加载中...</parser>
			</view>
			<view class="course-list" v-show="tabSelect === true">
				<view class="course-item" v-for="item in courseList" :key="item.courseId" @click="handleOpenCourseDetail(item.courseId)">
					<!-- 课程名称 -->
					<view class="course-name">
						<image class="course-name-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAA8CAYAAACgsw7vAAAAAXNSR0IArs4c6QAAA8pJREFUeAHtnT1M20AYhu9zfgRUZWFC/UlgQerEglS6MtMRtVMrsUGUCkoCVRFCiBYCFFQU2FqJqRVjmZlZmZBYINBWdGFBBdpA+HqhCrJMnPicIT77zeKf+w697/Ny57PiJJSZ2WeBV6AIkBDfjEA5hllBROcRIV4h+OD9M0wPvWnLIfgABU8kduPtsYWiZQQfoOCZjMG+PsoXLYcD5DvQVknQl/RobLMEASO+RMLHW7mKP4k0iNdmixjxZhp+3SdjYmgodmS2hxFvpuHDfXn7th1vf5i1WkPwViI+OpahM4XEgFzQFay2ELyViJ+OSXxKpeJb5Swh+HJUfHGOjpvuhMfsrCB4OzKanzcMMZpI3D+2s4Hg7chofF7es2+NpGOfK1nA7VwlOhq2yQVdQRg8UFzYVZKPEV+JjpZtnE2n27arSceIr0ZIq3Y6ami6O+FEMka8E0qa1BjEw8lky4kTuRjxTihpUCOv6ZupsfhXp1Ix4p2S8nZdnikyqCIRI16Flkdr5WhfSI/e21WRhxGvQsuLtUS5cDQ0rSoNwasS81i9ISg5PPzgXFUWglcl5qF6+QzdRmostuFGEoJ3Q80DfeR1/TzCIulWCoJ3S67+/a4fk3YrA8G7JVfHfubHpN3KQPBuyWneD8FrGCCz6MjtHYzUIh3B10Kvvn3Hl2b2424lIHi35Orcj5kbL0gsu5WB4N2S80A/OeX3ZjKHT91IQfBuqHmpD199XFz83qgqCcGrEvNaPXP8Ml8YV5WF4FWJebBeXu9HMpmfHSrSELwKLe/WRokvVlTkIXgVWh6ulaO+Z25u/7lTiQjeKSkN6rhAH5aXj5udSEXwTihpU8Otf85OppzIRfBOKGlVQwk55XdWk4zgqxHSrF1e60OiQKtyK78Iw/6F4O3ZaNvCgrvnZw/6KxlA8JXoaNwmPzg3m83+aLGzgODtyGh/nlvOTi9n7WwgeDsyfjjPon9+PtddzgqCL0fFJ+eKCzwuiNX1dbngs7wQvAWI3w5l+J25vcOE1ReCtxLx4zFfTS0t5VrN1hC8mYZP9+UKvzn/Vyya7SF4Mw0/7zM/y2QOekoWEXyJRAC2xFcrcqEXLVpF8AEIvGTR/Fg24TdpSliCsf3/mTt+hBEfjLxvXMrbu+vHssOnv3+9lKu+4rs5TTetpp3p908qvstjKsWuRgSMqXfda6EIdclvQ9zRSDek1kjgeqqfnHy8E4pGuuRvU63V+PfQXRMCt6bxibdbL8xTP6Z6TZJUlHlrcYepX5GgpuW3gi/6wNSvaZoKsv8B52XZjSl7aJYAAAAASUVORK5CYII="></image>
						<text class="course-name-text">{{ item.courseName }}</text>
					</view>  
					<!-- 价格 --> 
					<view class="price"><text class="price-text">¥{{ item.price }}</text></view>
					<!-- 课程标题 -->
					<text class="course-title">{{ item.name }}</text>
					<text class="course-time">{{ item.classTime }}</text>
					<!-- 课程难度 -->
					<view class="course-level">
						<text class="course-level-title">难度</text>
						<image v-for="starItem in item.level" class="course-level-star" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlFJREFUSA2dVU1LVUEYfuZeTdPyA+5O4kpUcMFbGiFEi36AVgvtmrRIilaS6xaB4V/QTdFeCP0BBS2Cyo8igoI+NlJguFDMrEVp9+2ZOdfDnDtHZ+4dGM7M+z7P887HO+8Bamgyhz55jP4aKMiEgmUeI8QukrHAQOOhPBUClAdoQQ5viC0YvGAVv3FG3cCGjx+2gxxKsbhWVOhCK276xCOoB8UzP8xjWaJoMQEVfMUf9Knr2EzYqyb+HWQw5IhrEYU8mjBWpedMD7wDrv5QZfW9DlMbBCsocxclbKX6aYwDyH1KHedVNqObowLJRX7PEXNxP3LFvkzsa44/8PuJnBWmwJqa4AGyKZnFMTTiHsdn2fMMmdN29vqa4CfZqwz2ngKTDRSfomGsPrUUlkIbrW3U1Cnd7L/kFI1gk6Cc4SVNcTvvgknhwI/UvpthBuhMGGSQV+FcL/It/mGA2p/NEXGgn/5lBnnipfoAgpf4i0tm4cTGd2Dqyhau0jbHLj6dVL/gKRd6RY3i+57fSUc+riPImhTr3gMFftd5LEWufM3GxzuwjO0cd1jz0OFRnofDcwNkcarOAE1MlqicW0tyAwhOW/7ahlmX6wYA0gtbSChdv6paIgAvOEt/TxUmmgrzA3jEPs0c2696FkwFtgQSAbBj6kje8uuE/WWEyzivhnCbfQK7/PELZlICddHXafOTARpNJXxWAWxT4CEJkXDJpK5xqWv4ooZxJw4E/IgceI6G5B/OfQf6B9+JCyR800+9EuzAD4/lBKvnSS7vhbqFbRv8HzgBjfYGEr3GAAAAAElFTkSuQmCC" mode="aspectFill"></image>
					</view>
					<!-- 讲师 -->
					<view class="teacher">
						<view class="teacher-left">
							<image class="teacher-avatar" :src="`${baseURL}${item.avatar}`" mode="aspectFill"></image>
							<text class="teacher-name">{{ item.teacherName }}</text>
						</view>
						<text class="course-collection">共{{ item.childNum }}讲</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { baseURL } from '@/config'
	export default {
		components: { parser, uniLoadMore },
		data() {
			return {
				teacherId: null,
				teacherDetail: {},
				tabSelect: false, // 当前选中的是
				pageNum: 0, // 当前页码
				pageSize: 9999, // 每页数量
				hasFlag: true,
				courseList: [], // 课程列表
				course_type_list: [],
				baseURL: baseURL
			};
		},
		methods: {
			async getTeacherInfo () {
				let res = await this.$fetch(this.$api.getTeacherInfo, { teacherId: this.teacherId })
				this.teacherDetail = res.data
			},
			// 获取老师下面的课程列表
			async getCourseList () {
				// if (!this.hasFlag) return // 说明已经没有更多啦
				++this.pageNum
				let res = await this.$fetch(this.$api.getCourseList, { teacherId: this.teacherId, pageNum: this.pageNum, pageSize: this.pageSize })
				res.rows.forEach(item => {
					this.course_type_list.forEach(courseItem => {
						if (item.courseTypeId === courseItem.id) item.courseName = courseItem.name
					})
				})
				this.courseList = res.rows
			},
			// 前往课程详情页
			handleOpenCourseDetail (courseId) {
				uni.navigateTo({ url: '/pages/course-detail/course-detail?courseId='+courseId }) 
			},
		},
		onLoad(options) {
			this.teacherId = options.teacherId
			this.course_type_list = uni.getStorageSync('course_type_list')
			this.getTeacherInfo()
			this.getCourseList()
		}
	}
</script>

<style lang="less">
.container {
	
	.header {
		width: calc(100vw - 60rpx);
		height: 470rpx;
		background: #8987DF;
		padding-left: 30rpx;
		padding-right: 30rpx;
		position: relative;
		z-index: -1;
		display: flex;
		
		.teacherPic {
			margin-top: 84rpx;
			width: 300rpx;
			height: 386rpx;
			margin-right: 60rpx;
		}
		
		.info {
			margin-top: 140rpx;
			color: #FFFFFF;
			
			.name {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 10rpx;
			}
			
			.type {
				opacity: 0.7;
				font-size: 14px;
			}
			
			.labels {
				width: 300rpx;
				display: flex;
				flex-wrap: wrap;
				
				text {
					margin-top: 20rpx;
					padding: 0rpx 25rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: rgba(255, 255, 255, .4);
					margin-right: 20rpx;
					border-radius: 20px;
				}
			}
		}
	}

	.teacher-tabs {
		background: #FFFFFF;
		border-radius: 20px 20px 0 0;
		display: flex;
		height: 90rpx;
		margin-top: -45rpx;
		
		view {
			flex: 375rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #9B9B9B;
			position: relative;
			
			&::before {
				content: "";
				width: 0rpx;
				height: 6rpx;
				position: absolute;
				transition: all .2s;
				background: #8987DF;
				bottom: 0;
			}
			
			&.select {
				font-size: 17px;
				color: #8987DF;
				font-weight: bold;
				
				&::before {
					width: 40rpx;
				}
			}
		}
	}
}

.course-list {
		padding: 30rpx;
		padding-bottom: 0;
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
</style>
