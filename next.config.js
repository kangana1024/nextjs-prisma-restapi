const configs = {
    image: {
        domains: ['*'],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 450],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack: (config) => {
        return config
    }
}
module.exports = {
    future: {
        webpack5: true,
    },
    ...configs
}