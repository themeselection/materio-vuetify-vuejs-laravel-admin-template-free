#!/bin/bash
# run on git bash
# env make production
sed -i "s/APP_ENV=local/APP_ENV=production/g" ./.env

cp -r public public.bak

cp -r ./shell-scripts/index.php ./public/index.php

mv webpack.mix.js webpack.mix.js.bak

cp -r ./shell-scripts/webpack.mix.js .

# set your base path inside the
sed -i "s/base: process.env.BASE_URL/base: '\/demo\/materio-vuetify-vuejs-laravel-admin-template-free\/demo\/'/g" ./resources/js/src/router/index.js

yarn prod

sed -i "s/base: '\/demo\/materio-vuetify-vuejs-laravel-admin-template-free\/demo\/'/base: process.env.BASE_URL/g" ./resources/js/src/router/index.js

cp -r ./public ./demo

rm -rf public
rm -rf webpack.mix.js

# restore publi and webpack file
mv public.bak public
mv webpack.mix.js.bak webpack.mix.js

# revert to local
sed -i "s/APP_ENV=production/APP_ENV=local/g" ./.env

zip -r demo.zip demo

rm -rf demo