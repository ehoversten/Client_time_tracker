# Pull from a base image
# FROM node:12-alpine
FROM node:alpine

# Use usr/app/ as the working directory
WORKDIR /usr/app

# Copy the package.json from the current directory to app/
COPY ./package.json ./

# Install dependencies (npm ci is similar to npm i, but for automated builds)
# RUN npm install
RUN yarn install

# Copy the files from the current directory to app/
COPY ./ ./

# Listen on the specified port
# EXPOSE 5000

# Set Node server
# ENTRYPOINT npm run start

# CMD ["npm", "start"]
CMD ["yarn", "start"]