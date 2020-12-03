require('dotenv').config();
const http = require('http');
const { app } = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened', err);
    return;
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});
