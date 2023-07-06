FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install 

COPY . .


ENV PORT=2000
ENV MONGO_URI=mongodb+srv://jacquemar:o85pxev28Rl0qapG@products.mht5fkp.mongodb.net/?retryWrites=true&writeConcern=majority

EXPOSE 2000

CMD ["node", "index.js"]
