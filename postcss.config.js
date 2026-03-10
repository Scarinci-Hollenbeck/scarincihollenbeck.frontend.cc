const productionPlugins = process.env.NODE_ENV === 'production'
  ? [
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.js',
          './components/**/*.js',
          './styles/**/*.js',
          './utils/**/*.js',
          './layouts/**/*.js',
          './node_modules/react-bootstrap/cjs/**/*.js',
        ],
        safelist: {
          standard: [/^#?nprogress/],
        },
      },
    ],
  ]
  : [];

module.exports = {
  plugins: [...productionPlugins],
};
