const path = require('path');

module.exports = async ({ config, mode }) => {
    config.module.rules = config.module.rules.filter(
        rule => !(rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
    );
    config.module.rules.push(
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            include: path.resolve(__dirname, '../'),
        },
        {
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
                sourceType: 'unambiguous',
                presets: [['react-app', { flow: false, typescript: true }]],
            },
        }
    );

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
