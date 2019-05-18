#!/usr/bin/env bash

set -e

git fetch
git reset --hard
git reset --hard origin/master

LOCATION="$(pwd)/.."

make -f $LOCATION/gc_core/Makefile -C $LOCATION/gc_core