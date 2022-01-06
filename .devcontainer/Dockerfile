FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
