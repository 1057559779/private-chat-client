<!-- 我的中心 -->
<template>
	<scroll-view :scroll-y="true" class="my-center">
		<view class="my-center-page">
			<!-- 用户信息 -->
			<view class="user-info-box">
				<view class="user-info">
					<view class="avatar"></view>
					<view class="nick">
						{{userInfo.showName}}
					</view>
					<view class="account">
						账号: {{userInfo.userName}}
					</view>
				</view>
			</view>
			<view class="action-list-box">
				<MyCenterList class="action-list">
					
					<MyCenterListItem title="个人信息" 
						@click="goPages(`/pages/self-info/self-info`)" icon="calendar" iconColor="#379afe">
					</MyCenterListItem>
					
					<MyCenterListItem title="测试"
						@click="goPages(`/pages/test/test`)" icon="setting"  iconColor="#6b6b6b">
					</MyCenterListItem>
					
					<MyCenterListItem title="设置"
						@click="goPages(`/pages/setting/setting`)" icon="setting"  iconColor="#6b6b6b">
					</MyCenterListItem>
											  
					<MyCenterListItem title="登出" 
						@click="logOut()"  icon="close" iconColor="#b4b4b4">
					</MyCenterListItem>
				</MyCenterList>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {mapMutations,mapGetters} from "vuex"
	import MyCenterList from "@/pages/tabs/my-center/my-center-list.vue"
	import MyCenterListItem from "@/pages/tabs/my-center/my-center-list-item.vue"
	import wsServer from "@/config/ws/index.js"
	import authApi from "@/api/login/auth.js"
	
	export default {
		components: {
			//MyTabbar,
			MyCenterList,
			MyCenterListItem
		},
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters({
				userInfo: "user/getUserInfo"
			})
		},
		methods: {
			...mapMutations({
			    removeUserInfo(commit) {
			      commit("user/REMOVE_USER_INFO")
			    },
				removeToken(commit) {
			      commit("user/REMOVE_TOKEN")
			    },
			}),
			logOut(){
				//调用远程接口，删除token 如果在登出前token已经失效也会触发http拦截器中的401退出
				authApi.logout(()=>{
					// 删除一些用户标识
					this.removeUserInfo()
					this.removeToken()
					//退出当时候顺便关闭webscoket
					wsServer.close()
					uni.reLaunch({
						url: "/pages/login/login"
					})
				})
			},
			goPages(url) {
				uni.navigateTo({
				    url: url,
				})
			},	
		}
	}
</script>

<style scoped lang="scss">
	.my-center {
		height: 100%;	
		.my-center-page {
			
			padding-top: 200rpx;
			.user-info-box {
				padding: 0 35rpx;
				.user-info {
					border-radius: 15rpx;
					background-color: #ffffff;
					box-shadow:0px 1px 5px #ebeef8;
					height: 240rpx;
					margin-bottom: 35rpx;
					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 100%;
						background-color: #ebeef8;
						transform: translateY(-60rpx);
						margin: 0 auto;
					}
					.nick {
						font-size: 32rpx;
						text-align: center;
					}
					.account {
						color: #9a9a9a;
						text-align: center;
					}
				}
			}
			.action-list-box {
				padding: 0 35rpx;
				.action-list {
					border-radius: 15rpx;
					background-color: #ffffff;
					box-shadow:0px 1px 5px #ebeef8;
					margin-bottom: 35rpx;
					.action-item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 25rpx;
						.left {
							display: flex;
							
							.left-icon {
								padding-right: 15rpx;
							}
						}
						.right {
							display: flex;
						
							.right-text {
								font-size: 24rpx;
								color: #b1b1b1;
							}
							.right-icon {
								padding-left: 15rpx;
							}
						}
					}
				}
			}
		}
	}

</style>
