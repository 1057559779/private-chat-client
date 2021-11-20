/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import ToastUtil from "@/common/js/util/toast-util.js"
import wsClient from "@/common/js/util/ws-client.js"
import configInfo from "@/config/base/config-info.js"
import store from "@/store/index.js"
export default {
	config: {
		timeout: 5000,
		baseUrl: configInfo.baseUrl,
		header: {
			'Content-Type': 'application/json',
			"charset": "utf8"
		},
		method: "GET",
		dataType: "json",
		responseType: "text"
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		
		let obj = {};

		//如果当前接口带有/res/路径 则添加token
		if (options.url.indexOf(configInfo.authorityPrefix) > -1) {
			// 非登录接口增加token传参校验
			let token = store.getters['user/getToken']
			obj['Authorization'] = "Bearer " + token
		}
		
		options.dataType = options.type || this.config.dataType
		options.responseType = options.responseType || this.config.responseType
		options.url = this.config.baseUrl + options.url
		options.data = options.data || {}
		options.timeout = options.timeout || this.config.timeout
		options.method = options.method || this.config.method
		options.header = Object.assign({}, options.header, obj)
		
	
		// 非登录接口增加token传参校验 end
		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				//ToastUtil.hideLoading()
				
				let statusCode = response.statusCode
				response.config = _config
			
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				//通过配置来判断是否打印日志
				if (configInfo.openLog) {
					resultLog(response)
				}

				if (!statusCode) {
					reject(commonErr(response))
				}
				switch (statusCode) {
					case 200: //成功	
						let {
							data
						} = response;
						const errorCode = data.statusCode;
						if (typeof errorCode === "undefined") {
							resolve(response);
						} else {
							let message = ''
							if (data.hasOwnProperty("info")) {
								message = data.info
							}
							//自定义返回的错误
							switch (errorCode) {
								case 200:
									resolve(data.content);
									break;
								case 500:
									ToastUtil.show(message ?? "服务器异常")
									reject(message)
									break;
								default:
									ToastUtil.show(message ?? "未知错误，请稍后再试")
									reject(message)
									break;
							}
						}
						break;
						//error
					case 401:
						console.log(options.url)
						ToastUtil.show('请重新登录')
						ToastUtil.hideLoading()
						//无权限就401 触发手动关闭ws
						wsClient.close()
						store.commit('user/REMOVE_USER_INFO')
						store.commit('user/REMOVE_TOKEN')
						uni.reLaunch({
							url: "/pages/login/login"
						})
						break;
					case 404:
						ToastUtil.show('接口路径不存在')
						break;
				}

			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}

/**
 * 响应接口日志记录
 */
function resultLog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 请求地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
}

/**
 * 接口错误统一错误处理
 * @param {Object} result
 */
function commonErr(result) {
	let err_msg = "未知错误，请稍后再试"
	if (result.hasOwnProperty("statusCode")) {
		let statusCode = result.statusCode;
		if (statusCode == 401) {
			err_msg = "登录失效，请重新登录"
		} else if (result.data.hasOwnProperty("Message")) {
			const message = result.data.Message;
			if (message && message[0]) {
				err_msg = message[0]
			}
		}
	} else if (result.hasOwnProperty("errMsg")) {
		err_msg = result.errMsg
	} else if (result.hasOwnProperty("Message")) {
		err_msg = result.Message
	}
	ToastUtil.show(err_msg)
	return err_msg
}
