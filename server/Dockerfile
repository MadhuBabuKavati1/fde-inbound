FROM node:18

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json from server folder
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server folder
COPY server/ .

# Expose port
EXPOSE 5050

# Start the server
CMD ["npm", "start"]
