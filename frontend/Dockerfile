
FROM node:8-alpine

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
# RUN $(npm bin)/ng build --aot --build-optimizer true --output-hashing all --extract-css true --named-chunks false --sourcemaps false --environment prod
RUN $(npm bin)/ng build

EXPOSE 3000

CMD ["node", "server.js"]
