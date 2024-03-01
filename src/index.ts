import client, { Connection, Channel, ConsumeMessage } from 'amqplib';
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

function sendMessages(channel: Channel): void {
  for (let i = 0; i < 100; i++) {
    channel.sendToQueue('queue', Buffer.from('Hello, World!'));
  }
}

const consumer = (channel: Channel) => (msg: ConsumeMessage | null): void => {
  if (msg) {
    console.log(msg.content.toString());
    channel.ack(msg);
  }
}

const go = async () => {
  const connection: Connection = await client.connect('amqp://username:password@localhost:5672');
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue('queue');
  sendMessages(channel);
  channel.consume('queue', consumer(channel));
}

go();