export const packageTemplate = {
	ts: {
		scripts: {
			start: 'ts-node src/index.ts',
			build: 'tsc',
			dev: 'nodemon src/index.ts',
			test: 'jest --coverage',
			lint: 'eslint . --ext .ts',
		},
	},
	js: {
		type: 'module',
		scripts: {
			start: 'node src/index.js',
			dev: 'node --watch src/index.js',
		},
	},
}

export const dependencies = {
	ts: {
		dev: [
			'typescript',
			'ts-node',
			'nodemon',
			'@types/node',
			'eslint',
			'@typescript-eslint/eslint-plugin',
			'@typescript-eslint/parser',
			'eslint-config-prettier',
			'prettier',
			'jest',
			'@types/jest',
			'ts-jest',
		],
		main: [],
	},
	js: {
		dev: ['@types/node', 'eslint', 'eslint-config-prettier', 'prettier'],
		main: [],
	},
}
