#!/bin/bash

git submodule init
git submodule update

## 2016
pushd interactivos2016
git pull origin master
jekyll build --destination _site/2016
popd

## 2018
pushd interactivos2018
git pull origin master
jekyll build --destination _site/2018
popd

## update submodules
git add interactivos2016 interactivos2018
git commit -m "update submodules to their latest commit"
git push origin master
git checkout -- .

## create new branch and push
git checkout --orphan gh-pages
mv interactivos2016/_site/2016 .
mv interactivos2018/_site/2018 .

git rm --cached -r .
git add CNAME index.html js
git add 2016
git add 2018
git commit -m "updates sites"
git push origin :gh-pages
git push -u origin gh-pages

## clean up local
git checkout -f master
git branch -D gh-pages
