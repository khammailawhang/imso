module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://165.22.250.168/:5000',
                ws: true,
                changeOrigin: true
            }
        }
    },
}