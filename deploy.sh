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

## 2019
pushd interactivos2019
git pull origin master
jekyll build --destination _site/2019
popd

## update submodules
git add interactivos2016 interactivos2018 interactivos2019
git commit -m "update submodules to their latest commit"
git push origin master
git checkout -- .

## create new branch and push
mv interactivos2016/_site/2016 .
mv interactivos2018/_site/2018 .
mv interactivos2019/_site/2019 .
rm -f interactivos2016 interactivos2018 interactivos2019
git checkout --orphan gh-pages

git rm --cached -r .
git add CNAME index.html js
git add 2016
git add 2018
git add 2019
git commit -m "updates sites"
git push origin :gh-pages
git push -u origin gh-pages

## clean up local
git checkout -f master
git branch -D gh-pages
