const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.ts("resources/js/index.tsx", "public/js").react();
mix.js('resources/js/laravel_app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
mix.webpackConfig({
    output: {
        filename:'[name].js',
        chunkFilename: 'chunk/[name].js',
    },
});
// mix.options({ runtimeChunkPath: '.' });
mix.babelConfig({
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  });
 mix.extract();