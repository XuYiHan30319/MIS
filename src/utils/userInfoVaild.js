const passwordValid = () => ({
	validator(_, value) {
		if (
			value &&
			value.length >= 8 &&
			value.length <= 16 &&
			/[a-z]/.test(value) &&
			/[A-Z]/.test(value) &&
			/\d/.test(value)
		) {
			return Promise.resolve();
		}
		if (!value) {
			return Promise.resolve();
		}
		return Promise.reject(
			'密码8~16位数，且包含大小写字母和数字！'
		);
	},
});

const emailValid = () => ({
	validator(_, value) {
		if (value && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
			return Promise.resolve();
		}
		if (!value) {
			return Promise.resolve();
		}
		return Promise.reject('邮箱格式错误！');
	},
});

export { passwordValid, emailValid };