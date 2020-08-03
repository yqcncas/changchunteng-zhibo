export const checkVerion = (data) => {
	// 检测是大版本更新还是小版本更新
	plus.runtime.getProperty(plus.runtime.appid, (info) => {
		// 比较当前版本和线上版本
		if (parseInt(info.version.split('.').join('')) === parseInt(data.version.split('.').join(''))) return
		console.log('测试: ',data)  
		// 查看是大版本更新还是小版本更新
		if (data.mustupdate === 1) {
			// 大版本更新
			uni.showModal({
				title: '更新提示', 
				content: data.content,
				success: (showResult) => {
					if (showResult.confirm) {  
						plus.runtime.openURL(data.file)
					} else {
						plus.runtime.quit()
					}
				}
			})
		} else {
			console.log(data)
			// 小版本更新
			plus.nativeUI.showWaiting("正在更新最新数据...")
			uni.downloadFile({
				url: data.file,
				success: (downloadResult) => {  
					console.log(downloadResult)
					if (downloadResult.statusCode === 200) {  
						plus.runtime.install(downloadResult.tempFilePath, {  
							force: true  
						}, function() { 
							console.log('install success...');
							plus.nativeUI.closeWaiting()
							uni.showToast({ title: '更新成功！', duration: 1000 }) 
							setTimeout(() => { plus.runtime.restart()  }, 1500) 
						}, function(e) {  
							console.error('install fail...');  
						});  
					}  
				}  
			})
		}
	})
}