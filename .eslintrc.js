module.exports = {
	'env': {
		'browser': true,
		'es6': true,
	},
	'extends': [
		'google',
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly',
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		"sourceType": "module",
	},
	'rules': {
		'indent': ["error", "tab", { "SwitchCase": 1 }],
		'require-jsdoc': 0,
		'no-tabs': 0,
		'quotes': ["error", "double"],
		'object-curly-spacing': 0,
		'operator-linebreak': ["error", "after", { "overrides": { "?": "ignore", ":": "ignore" } }]
	},
};
