# Use the official Node.js image as the base image
FROM node

# Install MongoDB
RUN apt-get update && apt-get install -y gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor && \
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && apt-get install -y mongodb-org

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Install CURL for ECS Helth Checks
RUN apt-get update && apt-get install -y --no-install-recommends curl

# Delete cached packages 
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Create a MongoDB data directory
RUN mkdir -p /data/db

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and server.js into the container
COPY package*.json ./
COPY server.js .
COPY middleware/ ./middleware
COPY routes/ ./routes
COPY utils/ ./utils

# Install any needed packages specified in package.json
RUN npm install

# Copy the JSON data file and init script into the container
COPY sock-data.json .
COPY import-data-mongodb.sh .
RUN chmod +x ./import-data-mongodb.sh

# Expose the port the app runs on
EXPOSE 3000

# Expose the default MongoDB and PostgreSQL ports
EXPOSE 27017
EXPOSE 5432

# Node environment variables
ENV MONGO_DB_URL="mongodb://localhost:27017"
ENV MONGO_DB="tse"
ENV MONGO_DB_COLLECTION="socks"

# Start MongoDB, PostgreSQL and Node app
CMD service postgresql start && mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db --bind_ip 127.0.0.1 && ./import-data-mongodb.sh && \
    node server.js