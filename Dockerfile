FROM node:18-alpine as build
WORKDIR /frontend
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist/pizza /usr/share/nginx/html
EXPOSE 9090
