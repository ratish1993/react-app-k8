# Use the official Node.js image for building the application
FROM node:20-alpine3.18 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Build your React.js application
RUN npm run build

# ---------------------------

# Use a lighter image for production
FROM node:20-alpine3.18

# Install serve globally to serve the React build
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build folder from the builder stage
COPY --from=builder /app/build ./build

# Expose port 9000
EXPOSE 9000

# Start serving the React build folder, listening on all interfaces (0.0.0.0)
CMD ["serve", "-s", "build", "-l", "9000"]
