# Use the Node.js 18 image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Rebuild bcrypt to ensure compatibility with the container's architecture
RUN npm rebuild bcrypt --build-from-source

# Copy all the backend files
COPY . .

# Expose the port the backend listens on
EXPOSE 8081

# Run the backend server
CMD ["npm", "run", "dev"]
