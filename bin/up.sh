#!/usr/bin/env bash

set -e

LOCATION="$(pwd)/.."

make -f $LOCATION/gc_core/Makefile -C $LOCATION/gc_core