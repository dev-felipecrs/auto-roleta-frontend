/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    staticPageGenerationTimeout: 180,
  },
}

module.exports = nextConfig
