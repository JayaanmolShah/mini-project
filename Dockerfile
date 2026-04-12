FROM node:24.13.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install express cors

COPY . .
RUN mkdir -p /app/data
EXPOSE 4200 3000
CMD ["sh", "-c", "node server.js & npx ng serve --host 0.0.0.0 --poll 500"]

# RUN npm run build -- --configuration production


# # Stage 2: Serve with Nginx
# FROM nginx:alpine

# COPY --from=build /app/dist/mini_project/browser /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
