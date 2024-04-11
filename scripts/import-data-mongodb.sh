#!/bin/bash

# Load data into local mongodb instance
mongoimport --uri mongodb://localhost:27017/tse --collection socks --file sock-data.json --jsonArray --drop