FROM node:boron
LABEL maintainer "gustavo.mtborges@gmail.com"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app

ENV MONGODB_URL mongodb://172.17.0.1/nogueira-nobre

EXPOSE 8080
CMD [ "npm", "start" ]