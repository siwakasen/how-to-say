# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

ARG BUILD_VAR_VITE_API_URL
RUN mv .env.example .env.production
RUN echo "VITE_API_URL=${BUILD_VAR_VITE_API_URL}" > .env.production

# Build the React app
RUN npm run build

# Expose the port that the server will listen on
EXPOSE 4173

# Start the application
CMD [ "npm", "run", "preview"]
