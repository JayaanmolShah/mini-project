# Stage 1 - Serve Angular build output with Nginx
FROM nginx:alpine

# Copy Angular build output (Angular 21 outputs to /browser directly)
COPY browser/ /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
