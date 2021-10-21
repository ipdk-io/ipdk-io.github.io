#!/usr/bin/env bash

set -ex

src=$(readlink -f $(dirname $0))
dst=.

jekyll build --source "$src" --destination "$dst"/_site
