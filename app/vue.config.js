module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://165.22.250.168/:8080',
                ws: true,
                changeOrigin: true
            }
        }
    },
}