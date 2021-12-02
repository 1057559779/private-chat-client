<!-- 登录页 主色调背景采用css 色调上的图案背景采用 标签绝对定位 -->
<template>
	<view class="page-login" @touchmove.stop.prevent>
		<view class="login-content">
			
			<view class="page-title">
				<view class="title">Qiu的聊天</view>
			</view>
			<view class="input-area">
				<view class="form-item">
					<input class="login-input" v-model="form.userName" placeholder-style="color:#aaa" placeholder="请输入账号" />
				</view>
				<view class="form-item">
					<input type="password" class="login-input" v-model="form.password" placeholder-style="color:#aaa" placeholder="请输入密码" />
				</view>
				
				<view class="btn-area">
					<view class="login-btn" @click="login">
						<u-icon name="arrow-right" color="#ffffff" size="75"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginApi from "@/api/login/auth.js"
	import {mapMutations,mapGetters} from "vuex"
	import configInfo from "@/config/base/config-info.js"
	import CryptoJS from 'crypto-js';
	import wsClient from "@/common/js/util/ws-client.js"
	import ToastUtil from "@/common/js/util/toast-util.js"
	
	export default {
		data() {
			return {
				form: {
					userName: "",
					password: ""
				}
			}
		},
		methods: {
			...mapMutations({
			    setUserInfo(commit, info) {
			      commit("user/SET_USER_INFO", info)
			    },
				setToken(commit, info) {
				  commit("user/SET_TOKEN", info)
				},
			}),
			//请求登录接口
			async login(){
				ToastUtil.showLoading("正在登录")
			
				//this.encrypt(this.form.userName, this.form.password)
				let obj = {
					username : this.form.userName,
					password : this.form.password
				}
				//登录 获取token
				let res = await loginApi.login(obj)
				if (res.access_token) {
					this.setToken(res.access_token)
					await this.getUserInfo()
					//开启ws服务
					wsClient.open()
					ToastUtil.hideLoading()
					uni.reLaunch({
						url: "/pages/tabs/single/single"
					})
					
				} else {
					this.commonError('登录失败')
				}
			},
			async getUserInfo() {
				let res = await loginApi.getUserInfo()
				//vuex 添加用户信息
				this.setUserInfo(res)
			},
			commonError(msg) {
				ToastUtil.hideLoading()
				uni.showToast({
					title: msg??"未知错误",
					icon: 'none'
				})
			},
			//加密
			encrypt(key, str) {
			            // 使用用户名进行MD5，32位，作为key
			            var key_str = CryptoJS.MD5(key)
			                .toString()
			                .substring(8, 24);
			            var key = CryptoJS.enc.Utf8.parse(key_str);
			            var iv = key;
			            // 对password进行AES加密
			            var AESPass = CryptoJS.AES.encrypt(str, key, {
			                iv: iv,
			                mode: CryptoJS.mode.CBC, //补齐方式 CBC,ECB,etc.
			                padding: CryptoJS.pad.ZeroPadding // 偏移规则设定  pack5，pkcs7，nopadding,etc.
			            });
			            // CryptoJS 的 encrypt函数不会直接返回字符串，需要toString或者Crypto-JS进行转码才能得到真实的结果。
			            var pass = AESPass.toString();
			            return pass;
			        }
		}
	}
</script>
<style scoped lang="scss">
	.page-login {
		position: relative;
		z-index: 20;
		height: 100vh;
	
		.login-content {
			position: relative;
			z-index: 30;
			padding: 330rpx 80rpx 0;
		
			.page-title {
				font-size: 44rpx;
				font-weight: bold;
				color: $global-primary;
				text-align: center;	
			}
			.input-area {
				margin-top: 70rpx;
				.form-item {
					background-color: #d8e0e6;
					border-radius: 50rpx;
					padding: 30rpx 0;
					text-align: center;
					//border-bottom: 1px solid $global-minor;
					margin-bottom: 20rpx;
					.login-input {
						color: $global-primary;
					}
				}
			
				.btn-area {
	
					.login-btn {
						margin: 50rpx auto;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 130rpx;
						height: 130rpx;
						font-weight: bold;
						background-color: $global-primary;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
