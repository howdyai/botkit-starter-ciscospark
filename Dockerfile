FROM library/node:argon-slim

COPY . /app

RUN cd /app \
  && npm install --production

WORKDIR /app

CMD ["node", "bot.js"]
