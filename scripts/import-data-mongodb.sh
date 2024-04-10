#!/bin/bash
mongoimport --uri mongodb://localhost:27017/tse --collection socks --file sock-data.json --jsonArray --drop