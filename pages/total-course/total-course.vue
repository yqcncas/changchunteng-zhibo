<template>
	<view class="container">
		<view class="item" v-for="item in chapterList" :key="item.chapterId">
			<view>
				<text>第{{ item.chapterCount }}节</text>
				<text>{{ item.name }}</text>
			</view>
			<!-- 如果用户购买了课程，则显示下方按钮 -->
			<view class="vip-handle" v-if="handleExist">
				<view class="recorded" v-if="item.video && item.status == 2" @click="handleVideoPlay(item.video)">听课</view>
				<view class="live" v-if="type == 1 && item.status == 1" @click="handleEnterRoom">正在直播</view>
				<view class="not-started" v-if="type == 1 && item.status == 0 && !(item.video)">暂未开播</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseId: null, // 课程ID
				type: null, // 课程类型
				teacherId: null, // 老师ID
				chapterList: [], // 章节列表
				robot: 0, // 机器人数量
				handleExist: false
			};
		},
		methods: {
			// 查看全部课程
			async getChapterList () {
				let res = await this.$fetch(this.$api.getChapterList, { courseId: this.courseId, pageSize: 9999, pageNum: 1 })
				res.rows.forEach((item, index) => {
					item.chapterCount = this.$numberToChinese(index + 1)
				})
				this.chapterList = res.rows
			},
			// 录播视频播放
			handleVideoPlay (src) { 
				uni.navigateTo({ url: '/pages/video-detail/video-detail?src='+src })
			},
			// 进入直播间
			handleEnterRoom () { 
				uni.navigateTo({ url: '/pages/live-detail/live-detail?courseId='+this.courseId + '&robot=' + this.robot })
			}
		},
		onLoad(options) {
			this.robot = parseInt(options.robot)
			this.courseId = options.courseId
			this.type = options.type
			this.teacherId = options.teacherId
			this.getChapterList()
			// 判断是否显示 视频 handle
			this.handleExist = Date.now() > Date.parse(uni.getStorageSync('end_time')) ? true : false
		}
	}
</script>

<style lang="less">
.container {
	.item {
		padding: 30rpx;
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
}
</style>
