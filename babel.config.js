module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.js', '.ios.js', '.android.js', '.tsx', '.ts'],
                alias: {
                    components: './src/components',
                    screens: './src/screens',
                    navigation: './src/navigation/index.ts',
                    styles: './src/styles/index.ts',
                },
            },
        ],
    ],
    env: {
        test: {
            presets: ['react-native', ['@babel/preset-env']],
        },
    },
};
