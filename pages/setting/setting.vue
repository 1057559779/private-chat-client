<template>
	<view class="setting-page">
		<view class="setting-list">
			<view class="setting-item">
				<view class="setting-item-box">
					<view>账号</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>新消息通知</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>隐私</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view class="setting-item">
				<view class="setting-item-box">
					<view>通用</view>
					<view>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			
			<u-button :disabled="nowVersion == true" @click="updateVersion">
				当前版本:
				<text v-if="nowVersion">
					{{nowVersion.version}}
				</text>
			</u-button>
		</view>
	</view>
</template>

<script>
	import versionApi from "@/api/version/version.js"
	export default {
		data() {
			return {
				nowVersion: null
			}
		},
		methods: {
			checkVersion() {
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					this.nowVersion = wgtinfo
				})
			},
			async updateVersion() {
					const versionInfo = await versionApi.getLatestVersion()
					//若最新版本不大于当前版本，则不执行
					if(parseInt(versionInfo.versionCode) < parseInt(this.nowVersion.versionCode) ) {
						uni.showToast({
							title: "当前版本已经是最新版本",
							position: 'bottom',
							icon: 'none'
						})
						return;
					}
					let wgtUrl = versionInfo.wgtUrl
				
					// #ifdef APP-PLUS
					const dtask = plus.downloader.createDownload(wgtUrl, {
						force: true
					}, function(d, status) {
						if (status == 200) { // 下载成功    
							let path = (d.filename);
							plus.runtime.install(path, {}, function() {
								plus.nativeUI.closeWaiting();
								console.log("安装wgt文件成功！");
								plus.nativeUI.alert("应用资源更新完成！", function() {
									plus.runtime.restart();
								});
							}, function(e) {
								plus.nativeUI.closeWaiting();
								console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
								plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
							});
						} else { //下载失败    
							alert("Download failed: " + status);
						}
					})
					uni.showModal({
						title: '版本更新',
						content: versionInfo.version,
						confirmText: '下载',
						success: (res) => {
							if (res.confirm) {
								dtask.start();
								let prg = 0;
								let showLoading = plus.nativeUI.showWaiting("正在下载");
								dtask.addEventListener('statechanged', function(task, status) {
									// 给下载任务设置一个监听 并根据状态  做操作  
									switch (task.state) {
										case 1:
											showLoading.setTitle("正在下载");
											break;
										case 3:
											prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(
												task.totalSize)) * 100);
											showLoading.setTitle("  正在下载" + prg + "%  ");
											break;
										case 4:
											plus.nativeUI.closeWaiting();
											//下载完成  
											break;
									}
								})
							}
						}
					})
					// #endif
				
			}
		},
		onLoad() {
			this.checkVersion()
			
		}
	}
</script>



<style lang="scss">
	page {
		background-color: #ffffff;
	}	
</style>
<style scoped lang="scss">
	.setting-page {
		.setting-list {
			padding: 0 35rpx;
			.setting-item {
				padding: 30rpx 20rpx;
				border-bottom: 1px solid #f5f5f5;
				.setting-item-box {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
</style>
