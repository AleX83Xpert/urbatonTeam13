#!/usr/bin/env bash

git fetch
git reset --hard
git reset origin master --hard

LOCATION="$(pwd)/.."

make -f $LOCATION/gc_core/Makefile -C $LOCATION/gc_core