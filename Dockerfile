# Use to run api inside docker container
FROM node:18.7 AS base
WORKDIR /app
COPY [".", "./"]
EXPOSE 8080/tcp

FROM base AS npminstall
RUN npm install
RUN npm run build

FROM npminstall AS final
CMD npm run run:api