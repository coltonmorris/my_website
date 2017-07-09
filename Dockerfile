From node:boron

#create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./package.json /app
COPY ./server.js /app

COPY ./public /app/public
COPY ./src /app/src

# RUN npm run build
COPY ./build /app/build

# RUN npm i
COPY ./node_modules /app/node_modules

EXPOSE 8080

CMD [ "node", "server.js" ]
