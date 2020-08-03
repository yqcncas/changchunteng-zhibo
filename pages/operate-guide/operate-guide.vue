<template>
	<view style="padding: 30rpx;">
		<parser :html="content" show-with-animation lazy-load>加载中...</parser>
		<!-- 底部申请加盟按钮 -->
		<view style="height: 90rpx;" v-if="type == 4"></view>
		<view v-if="type == 4" class="handle-apply-uni" @click="handleApplyUni">我要加盟</view>
	</view>
</template>

<script>
	import parser from "@/components/jyf-Parser/index"
	export default {
		data() {
			return {
				type: null,
				title: '',
				content: ''
			};
		},
		components: {
			parser
		},
		methods: {
			// 获取 富文本信息
			async getAchaoBook () {
				let res = await this.$fetch(this.$api.getAchaoBook, { type: this.type })
				console.log(res)
				if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
				this.content = res.data.content
				uni.setNavigationBarTitle({ title: res.data.title })
			},
			// 点击我要加盟时
			async handleApplyUni () {
				let userInfo = uni.getStorageSync('user_info')
				let obj = {}
				obj.name = userInfo.userName
				obj.mobile = userInfo.phonenumber
				uni.showModal({
				    title: '提示',
				    content: '您确定要申请加盟吗？',
				    success: (res) => {
				        if (res.confirm) {
				            this.$fetch(this.$api.joinUs, obj).then(res => {
								if (res.code) return uni.showToast({ title: res.msg, icon: 'none' })
								uni.showToast({ title: '我们已经收到您的加盟请求，工作人员会尽快联系您哦！', icon: 'none' })
							})
				        }
				    }
				});
			}
		},
		onLoad(options) {
			this.type = options.type
			this.getAchaoBook() 
		}
	}
</script>

<style lang="less">
.handle-apply-uni {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 750rpx;
	height: 90rpx;
	background: #8987DF;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #FFFFFF;
}
</style>
