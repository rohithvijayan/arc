/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images:{
    unoptimized:true
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: /node_modules/,
    };
    config.output.chunkLoadingGlobal = "chunkLoadingGlobal";
    return config;
  },
};

export default nextConfig;
