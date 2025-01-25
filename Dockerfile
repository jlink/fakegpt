FROM node:23
WORKDIR /app
ADD package*.json server.js ./
ADD public ./public
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

