FROM node:18

WORKDIR app/

COPY package.jason ./

RUN npm install

COPY . .

CMD ["npm","start"]
