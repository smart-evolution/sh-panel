#!/bin/sh

main() {
  mongod --repair && \
  mongod
}

main

