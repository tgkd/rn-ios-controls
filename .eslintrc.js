module.exports = {
    extends: 'airbnb',
    env: {
        es6: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        'react/jsx-filename-extension': 'off',
        'import/no-unresolved': [0, { commonjs: true, amd: true }],
        quotes: ['error', 'single'],
    },
};
