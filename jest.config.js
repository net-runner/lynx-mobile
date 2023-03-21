module.exports = {
	preset: 'react-native',
	cacheDirectory: './jest/cache',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	coverageThreshold: {
		global: {
			statements: 80,
		},
	},
	coverageDirectory: './jest/coverage',
	setupFiles: ['<rootDir>/jest/jest.setup.ts'],
	transformIgnorePatterns: [
		'node_modules/(?!(' +
			'@react-native|' +
			'react-native|' +
			'@react-navigation|' +
			'react-native-mmkv-flipper-plugin|' +
			'react-native-flipper|' +
			'mobx-react-lite)/)',
	],
	moduleNameMapper: {
		'react-dom': 'react-native',
	},
};
