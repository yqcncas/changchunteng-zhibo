<template>
	<view class="container">
		<view class="list">
			<!-- 此处渲染 -->
			<view v-for="item in gradeTree" :key="item.id">
				<view class="title">{{ item.name }}</view>
				<view class="items">
					<view :class="childItem.id === selectGrade ? 'select' : ''"  @click="handleChooseGrade(childItem.id)" v-for="childItem in item.child" :key="childItem.id">{{ childItem.name }}</view>
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<view class="confirm" @click="handleConfirmGrade">确认</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gradeTree: [],
				selectGrade: null
			};
		},
		methods: {
			// 选择年级
			handleChooseGrade (id) {
				this.selectGrade = id
			},
			// 确定修改年级
			async handleConfirmGrade () {
				let res = await this.$fetch(this.$api.editUserInfo, { classTypeId: this.selectGrade }, 'POST')
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				let userInfo = uni.getStorageSync('user_info')
				userInfo.classTypeId = this.selectGrade
				uni.setStorageSync('user_info', userInfo)
				uni.reLaunch({ url: '/pages/index/index' })
			} 
		},
		onLoad() {
			this.gradeTree = uni.getStorageSync('grade_list')
			this.selectGrade = uni.getStorageSync('user_info').classTypeId || 7
			console.log(this.selectGrade)
		}
	}
</script>

<style lang="less">
.container {
	border-top: 1px solid #F0F0F0;
	
	.list {
		padding: 30rpx;
		margin-bottom: 90rpx;
		
		& > view {
			margin-bottom: 10rpx;
			
			.title {
				font-size: 17px;
				color: #333333;
				font-weight: bold;
				padding-bottom: 30rpx;
			}
			
			.items {
				display: flex;
				flex-wrap: wrap;
				
				& > view {
					width: 150rpx;
					height: 60rpx;
					margin-right: 30rpx;
					border-radius: 4rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #F6F6F6;
					color: #A6A6A6;
					margin-bottom: 30rpx;
					
					&.select {
						background: #8987DF;
						color: #FFFFFF;
					}
					
					&:nth-child(4n) {
						margin-right: 0;
					}
				}
			}
		}
	}

	.confirm {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 90rpx;
		background: #8987DF;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		
		&:active {
			opacity: .8;
		}
	}
}
</style>
