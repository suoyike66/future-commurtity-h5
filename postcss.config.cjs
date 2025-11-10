module.exports = {
    plugins: {
        'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 375, // 设计稿宽度
            exclude: /(\\)(node_modules)(\\)/, // 排除 node_modules
            selectorBlackList: ['.ignore', '.hairlines'] // 不转换的类名
        }
    }
}