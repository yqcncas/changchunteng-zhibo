<script>
	import { checkVerion } from '@/libs/index.js'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary') //锁定竖屏
			// #endif
			// 获取老师列表
			this.$fetch(this.$api.getUserDict, { userType: '03' }).then(res => {
				if (res.code) throw res.msg
				uni.setStorageSync('teacher_list', res.data)
			})
			
			// 获取年级列表
			this.$fetch(this.$api.getClassType).then(res => {
				if (res.code) throw res.msg
				uni.setStorageSync('grade_list', res.data)
			})
			
			// 检查版本更新
			this.$fetch(this.$api.update, { type: plus.os.name === 'Android' ? 1 : 2 }).then(res => {
				if (res.code || !res.data.length) return
				checkVerion(res.data[0])
			})
			
			// 获取截止时间
			this.$fetch(this.$api.getTime).then(res => {
				console.log(res.data)
				uni.setStorageSync('end_time', res.data)  
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	page {
		font-size: 14px;
		color: #333333; 
	}
	
	.line-30 {
		height: 30rpx;
		background-color: #f7f7f7;
	}
	
	.right-arrow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.right-arrow::after {
		content: "";
		width: 15upx;
		height: 15upx;
		border-top: 4upx solid #ccc;
		border-right: 4upx solid #ccc;
		transform: rotate(45deg);
	}
	
	/* #endif */
</style>
