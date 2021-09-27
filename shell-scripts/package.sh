#!/bin/bash

# use in linux/unix system
# not properly work in git bash 
echo 'You should run package.sh from parent folder. eg. ./scripts/package.sh'

mkdir free-package

rsync -aP  ./ ./free-package/ --exclude=node_modules --exclude=vendor --exclude=yarn.lock --exclude=composer.lock --exclude=public/images --exclude=public/js --exclude=shell-scripts --exclude=.git --exclude=free-package    

echo 'folders are compressing...'

# add zip in linux/unix system before use it.
# https://stackoverflow.com/questions/38782928/how-to-add-man-and-zip-to-git-bash-installation-on-windows

zip -r ./free-package.zip ./free-package/

echo 'Zip Completed!'

rm -d -r ./free-package

echo 'Task Completed!'