# Use the official MongoDB image as the base image
FROM mongo

# Set the working directory inside the container
WORKDIR /data

# Copy the JSON data file into the container
COPY sock-data.json .

COPY init-data.sh /docker-entrypoint-initdb.d
RUN chmod +x /docker-entrypoint-initdb.d/init-data.sh