# Stage 1: Compile and Build angular codebase
# Use official node image as the base image
FROM node:18.12-alpine as build
# Set the working directory
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN npm install
RUN npm update
RUN npm audit fix --force
# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:alpine
# if you created your own nginx.conf file uncomment the below line
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/energy-marketplace-ui /usr/share/nginx/html

# Expose port 80
EXPOSE 80