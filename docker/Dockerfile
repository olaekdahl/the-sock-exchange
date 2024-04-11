# Use the official Node.js image as the base image
FROM node:14

# Install MongoDB
RUN apt-get update && apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && apt-get install -y mongodb-org \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a MongoDB data directory
RUN mkdir -p /data/db

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and server.js into the container
COPY package*.json ./
COPY server.js .

# Install any needed packages specified in package.json
RUN npm install

# Copy the JSON data file and init script into the container
COPY sock-data.json .
COPY init-data.sh .
RUN chmod +x ./init-data.sh

# Expose the port the app runs on
EXPOSE 3000

# Expose the default MongoDB port
EXPOSE 27017

# Node environment variables
ENV MONGO_DB_URL=mongodb://localhost:27017
ENV MONGO_DB=tse
ENV MONGO_DB_COLLECTION=socks

# Start MongoDB and Node app
CMD mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db --bind_ip 127.0.0.1 && ./init-data.sh && \
    node server.js