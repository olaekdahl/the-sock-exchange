#!/bin/bash

# Copies files from server folder (node.js app) and sock-data.json to docker folder.
cp sock-data.json ../docker/
cp ../server/package*.json ../docker/
cp ../server/server.js ../docker/