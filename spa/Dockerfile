FROM nginx:1.15.2-alpine
WORKDIR /code
RUN apk add --update nodejs nodejs-npm
COPY . .
RUN npm install
RUN npm run build
RUN mv ./build /var/www
RUN rm /code -rf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
