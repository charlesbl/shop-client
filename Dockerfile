FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "./"]
RUN npm install
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "--inspect=0.0.0.0:9229", "run", "start"]
