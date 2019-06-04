#!/bin/sh
set -e # exit on errors

VERSION=$(node -pe "require('./package.json').version")
FILE="fatso83-mini-mocha-$VERSION.tgz"


# create the distribution tarball
npm pack

# unpack the tarball
tar xf $FILE

# test that it runs - will fail on missing files
cd package
node -e "require('./index.js').install()"

# cleanup
npm run clean
