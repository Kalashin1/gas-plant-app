# Choose which image to build from
FROM node:14

# Create app directory
WORKDIR /dist/app

# Copy package.json file
COPY package*.json ./

# Install npm dependencies
RUN npm install

## Bunlde source file

copy . .

# Expose your port
EXPOSE 8080

# cmds to run
CMD ["node", "index.js"]
