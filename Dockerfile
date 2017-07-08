From node:boron

#create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./package.json /app
COPY ./server.js /app

COPY ./node_modules /app/node_modules
COPY ./public /app/public
COPY ./src /app/src
COPY ./build /app/build

EXPOSE 8080

CMD [ "node", "server.js" ]
