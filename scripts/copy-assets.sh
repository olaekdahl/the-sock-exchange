#!/bin/bash

# Copies files from server folder (node.js app) and sock-data.json to docker folder.
cp -f sock-data.json ../docker/
cp -f import-data-mongodb.sh ../docker/
cp -f ../server/package*.json ../docker/
cp -f ../server/server.js ../docker/