#!/bin/bash

mkdir -p build
cp src/index.html build/index.html
lasso ./src/browser.json --inject-into build/index.html --config lasso-config.json --name app