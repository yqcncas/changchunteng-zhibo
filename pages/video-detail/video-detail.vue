<template>
	<view class="container">
		
		<video id="video" style="width: 100vw;height: 100vh;" :src="src" :autoplay="true" :loop="true"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			};
		},
		methods: {
			
		},
		onLoad(options) {
			this.src = options.src
		},
		onReady() {
			// this.videoContext = uni.createVideoContext('video') 
			// this.videoContext.requestFullScreen() 
		}
	}
</script>

<style lang="less">
page {
	background: #000000;
}
.container {
	
}
</style>
