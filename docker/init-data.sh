#!/bin/bash
# Wait for MongoDB to boot
sleep 10

# MongoDB import command
mongoimport --host localhost --port 27017  --db tse --collection socks --type json --file /data/sock-data.json --jsonArray

# Keep the container running after import
# tail -f /dev/null
