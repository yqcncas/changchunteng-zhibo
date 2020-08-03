<template>
	<view class="container">
		<view class="search-container">
			<view>
				<image src="/static/icon/27.png"></image>
				<input v-model="name" type="text" placeholder="请输入关键字" />
			</view>
		</view>
		
		<view class="course-list">
			<view class="course-item" v-for="item in list" :key="item.courseId">
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
					<image v-for="item in item.level" class="course-level-star" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlFJREFUSA2dVU1LVUEYfuZeTdPyA+5O4kpUcMFbGiFEi36AVgvtmrRIilaS6xaB4V/QTdFeCP0BBS2Cyo8igoI+NlJguFDMrEVp9+2ZOdfDnDtHZ+4dGM7M+z7P887HO+8Bamgyhz55jP4aKMiEgmUeI8QukrHAQOOhPBUClAdoQQ5viC0YvGAVv3FG3cCGjx+2gxxKsbhWVOhCK276xCOoB8UzP8xjWaJoMQEVfMUf9Knr2EzYqyb+HWQw5IhrEYU8mjBWpedMD7wDrv5QZfW9DlMbBCsocxclbKX6aYwDyH1KHedVNqObowLJRX7PEXNxP3LFvkzsa44/8PuJnBWmwJqa4AGyKZnFMTTiHsdn2fMMmdN29vqa4CfZqwz2ngKTDRSfomGsPrUUlkIbrW3U1Cnd7L/kFI1gk6Cc4SVNcTvvgknhwI/UvpthBuhMGGSQV+FcL/It/mGA2p/NEXGgn/5lBnnipfoAgpf4i0tm4cTGd2Dqyhau0jbHLj6dVL/gKRd6RY3i+57fSUc+riPImhTr3gMFftd5LEWufM3GxzuwjO0cd1jz0OFRnofDcwNkcarOAE1MlqicW0tyAwhOW/7ahlmX6wYA0gtbSChdv6paIgAvOEt/TxUmmgrzA3jEPs0c2696FkwFtgQSAbBj6kje8uuE/WWEyzivhnCbfQK7/PELZlICddHXafOTARpNJXxWAWxT4CEJkXDJpK5xqWv4ooZxJw4E/IgceI6G5B/OfQf6B9+JCyR800+9EuzAD4/lBKvnSS7vhbqFbRv8HzgBjfYGEr3GAAAAAElFTkSuQmCC" mode="aspectFill"></image>
				</view>
				<!-- 讲师 -->
				<view class="teacher">
					<view class="teacher-left">
						<image class="teacher-avatar" :src="baseURL + item.avatar" mode="aspectFill"></image>
						<text class="teacher-name">{{ item.teacherName }}</text>
					</view>
					<text class="course-collection">共{{ item.childNum }}讲</text>
				</view>
			</view>
		</view>
		<uni-load-more :content-text="contentText" :showIcon="!firstSearch" :status="hasFlag ? 'loading' : 'noMore'" ></uni-load-more>
	</view>
</template> 

<script>
	import { baseURL } from '@/config'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components:{ uniLoadMore },
		data() {
			return {
				firstSearch: true, // 是否初次搜索
				baseURL: baseURL,
				name: '',
				timer: null,
				list: [],
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				course_type_list: [],
				contentText: {
					contentrefresh: '请在搜索框中输入要搜索的课程~',
					contentnomore: '没有更多数据了~'
				}
			};
		},
		watch: {
			'name': function (newVal) {
				if (newVal.trim().length === 0) return
				clearTimeout(this.timer)
				setTimeout(() => {  
					this.firstSearch = false
					this.contentText.contentrefresh = '正在加载...'
					this.pageNum = 0
					this.pageSize = 10
					this.hasFlag = true
					this.list = []
					this.getSearchList()
				}, 500)
			}
		},
		methods: {
			// 获取搜索结果
			async getSearchList () {
				if (!this.hasFlag) return
				this.pageNum++
				let res = await this.$fetch(this.$api.getCourseList, { name: this.name, pageSize: this.pageSize, pageNum: this.pageNum })
				res.rows.forEach(item => {
					this.course_type_list.forEach(courseItem => {
						if (item.courseTypeId === courseItem.id) item.courseName = courseItem.name
					})
				})
				this.list = res.rows
				this.hasFlag = this.pageSize * this.pageNum < res.total
			}
		},
		onLoad() {
			this.course_type_list = uni.getStorageSync('course_type_list')  
		} 
	}
</script>

<style lang="less">
page {
	background: #F7F7F7;
}
.container {
	
	& > .search-container {
		box-shadow: 0 0 0 0 rgba(0,0,0,0.05);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 96rpx;
		background: #FFFFFF;
		z-index: 99;
		display: flex;
		justify-content: center;
		
		& > view {
			display: flex;
			align-items: center;
			width: 690rpx;
			height: 72rpx;
			background: #F7F7F7;
			border-radius: 36rpx;
			
			image {
				width: 28rpx;
				height: 28rpx;
				margin: 0 30rpx;
				margin-right: 20rpx;
			}
			
			input {
				flex: 1; 
			}
		}
	}
	
	.course-list {
		padding: 30rpx;
		padding-bottom: 0;
		margin-top: 96rpx;
		background: #F7F7F7; 
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
}
</style>
