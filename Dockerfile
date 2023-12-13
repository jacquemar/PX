
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV CLOUD_NAME=dkabiav4s
ENV API_KEY=118975981983254
ENV API_SECRET=X23wpNY4NZ6ilo_wUUIWFFjdAC0
ENV CLOUDINARY_URL=cloudinary://118975981983254:X23wpNY4NZ6ilo_wUUIWFFjdAC0@dkabiav4s
EXPOSE 8000
CMD npm run preview