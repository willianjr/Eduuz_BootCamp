module.exports = {
  env: {
    browser: true,
		es2021: true,
		node: true
  },
	extends: [
		'plugin:jest/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
