import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    message: "Hello, World!"
  })
});

server.listen(3000, () => {
  console.log('\nlistening on 3000');
});