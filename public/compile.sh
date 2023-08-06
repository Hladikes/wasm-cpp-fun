#!/bin/bash
docker run \
  --rm \
  -v $(pwd):/src \
  -u $(id -u):$(id -g) \
  emscripten/emsdk \
  em++ main.cpp -o main.wasm \
  -std=c++17 \
  --no-entry \
  -O3 \
  -s EXPORTED_FUNCTIONS='["_alloc", "_analyse"]' \
  -s ERROR_ON_UNDEFINED_SYMBOLS=0