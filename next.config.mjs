/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    webpack: (config) => {
        config.output.chunkLoadingGlobal = 'chunkLoadingGlobal';
        return config;
      },
};

export default nextConfig;
