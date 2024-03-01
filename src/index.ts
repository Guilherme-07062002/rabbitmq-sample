import { Channel } from 'amqplib';
import { connectWithRabbitMQ, sendMessage } from './messenger';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.use(express.json());

let channel: Channel;

server.listen(3000, async () => {
  console.log('\nListening on 3000...');
  channel = await connectWithRabbitMQ();
});

app.post('/send-message', async (req, res) => {
  sendMessage(channel);
  res.send({
    message: 'The message was sent to the consumer!',
  });
});
