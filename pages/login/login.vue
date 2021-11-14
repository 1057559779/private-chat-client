<!-- 登录页 主色调背景采用css 色调上的图案背景采用 标签绝对定位 -->
<template>
	<view class="page-login">
		<image class="login-bk" mode="widthFix" src="/static/login/login-bk02.png" ></image>
		<view class="login-content">
			<view class="logo-area">
				<image src="/static/login/loongair.png" class="image-box"></image>
			</view>
			<view class="page-title">
				<view class="title">智慧运行平台</view>
				<view class="version">V1.0</view>
			</view>
			<view class="input-area">
				<view class="form-item">
					<view class="form-head">
						<text class="title">账号</text>
						<text class="warning"></text>
					</view>
					<input class="login-input" v-model="form.userName" placeholder-style="color:rgba(255,255,255,0.37)" placeholder="请输入账号" />
				</view>
				<view class="form-item">
					<view class="form-head">
						<text class="title">密码</text>
						<text class="warning"></text>
					</view>
					<input type="password" class="login-input" v-model="form.password" placeholder-style="color:rgba(255,255,255,0.37)" placeholder="请输入密码" />
				</view>
				
				<view class="hint">请使用OA账号登录系统</view>
				<view class="btn-area">
					<view class="login-btn" @click="login">登录</view>
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
	import wsServer from "@/config/ws/index.js"
	
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
					wsServer.open()
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
		background-image: url(/static/login/login-bk01.jpg);
		.login-bk {
			position: absolute;
			width: 100%;
			bottom: 0;
			opacity: 0.7;
			//background-image: url(/static/login/login-bk02.png);
		}
		.login-content {
			position: relative;
			z-index: 30;
			padding: 200rpx 57rpx;
			.logo-area {
				color: #ffffff;
				font-weight: bold;
				width: 185rpx;
				height: 85rpx;
				.image-box {
					width: 185rpx;
					height: 85rpx;
				}
			}
			.page-title {
				display: flex;
				font-size: 44rpx;
				font-weight: bold;
				color: #ffffff;
				.title {
					margin-right: 35rpx;
				}
			}
			.input-area {
				margin-top: 150rpx;
				.form-item {
					padding-bottom: 20rpx;
					border-bottom: 1px solid #5fc2fe;
					margin-bottom: 20rpx;
					.form-head {
						.title {
							color: #ffffff;
						}
						.warning {
							margin-left: 15rpx;
							color: red;
						}	
					}
					.login-input {
						color: #ffffff;
					}
				}
				.hint {
					margin:20rpx 0;
					color: #b2c7ef;
				}
				.btn-area {
					.login-btn {
						font-weight: bold;
						font-size: 32rpx;
						color: #ffffff;
						padding: 17rpx 0;
						background-color: #1578ff;
						margin: 52rpx 0;
						text-align: center;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>
