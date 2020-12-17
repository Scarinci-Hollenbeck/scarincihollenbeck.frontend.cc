const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')(['next-ga']);

module.exports = withTM(
  withFonts(
    withCss(
      withSass(
        {
          webpack(config) {
            config.module.rules.push({
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 100000,
                },
              },
            });

            return config;
          },
        },
      ),
    ),
  ),
);
