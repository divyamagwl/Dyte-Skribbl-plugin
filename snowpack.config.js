/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
      public: { url: '/', static: true },
      src: { url: '/dist' },
    },
    plugins: [
      '@snowpack/plugin-react-refresh',
      '@snowpack/plugin-dotenv',
      '@snowpack/plugin-typescript',
    ],
    routes: [
      {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        "bundle": true,
        "minify": true,
        "target": 'es2018'
    },
    packageOptions: {
      source: "local",
      polyfillNode: true,
    },
    devOptions: {
        port: 5000,
    },
    buildOptions: {
      /* ... */
    },
  };