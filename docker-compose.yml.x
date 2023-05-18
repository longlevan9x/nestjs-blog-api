version: '3.8'

services:
#  app:
#    container_name: nestjs_api_dev
#    build:
#      context: ./
#      dockerfile: ./Dockerfile
#      target: development
#    command: npm run start:dev
#    volumes:
#      - .:/app
#      - /app/node_modules
#    ports:
#      - '3000:3000'
#    environment:
#      NODE_ENV: development
#    depends_on:
#      - mongo

  mongo:
    image: mongo
    environment:
      - MONGODB_DATABASE="test"
    ports:
      - '27017:27017'