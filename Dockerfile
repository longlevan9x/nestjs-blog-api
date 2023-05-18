# Dockerfile
# ! Important
# Since we rely in our code to environment variables for e.g. db connection
# this can only be run successfully with docker-compose file

# Specify node version and choose image
# also name our image as development (can be anything)
FROM node:16 AS development

# Specify our working directory, this is in our container/in our image
WORKDIR /app

RUN npm install -g nodemon
RUN npm install -g @nestjs/cli

# Copy the package.jsons from host to container
COPY package*.json ./

# Here we install all the deps
RUN npm install

# Bundle app source / copy all other files
COPY . .

# Build the app to the /dist folder
RUN npm run build

## PRODUCTION ##
# Build another image named production
FROM node:16 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /app

# Copy all from development stage
COPY --from=development /app/ .

EXPOSE 3000

# Run app
CMD [ "node", "dist/main" ]

