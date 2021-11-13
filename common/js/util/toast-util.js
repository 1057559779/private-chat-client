export default class ToastUtil {

	static show = (title) => {
		uni.showToast({
			title: title,
			position: 'bottom',
			icon: 'none'
		})
	};

	static showLong = (message) => {

	};

	static showLoading = (msg) => {
		uni.showLoading({
			title: msg ? msg : "",
			mask: true
		});
	};

	static hideLoading = () => {
		uni.hideLoading();
	};
}
