#!/usr/bin/env bash

set -e

git fetch
git reset --hard
git reset --hard origin/$1
