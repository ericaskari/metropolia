FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# If you are building your code for production
COPY . .
RUN npm run build

# Bundle app source
EXPOSE 8080
CMD [ "node", "dist/bundle.js" ]
