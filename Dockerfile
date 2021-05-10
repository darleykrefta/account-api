FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "npm", "run", "dev" ]


# docker build . -t b2b-accounts/api
# docker run -p 3001:3001 -d b2b-accounts/api