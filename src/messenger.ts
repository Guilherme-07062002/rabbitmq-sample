import client, { Channel, Connection, ConsumeMessage } from "amqplib";

export const sendMessage = (channel: Channel) => {
  channel.sendToQueue('queue', Buffer.from('Hello, RabbitMQ! I am the producer!'));
}

export const receiveMessage = (channel: Channel) => (msg: ConsumeMessage | null): void => {
  if (msg) {
    console.log(`I heard: ${msg.content.toString()}`);
    console.log(`I say: Hello, producer! I am the consumer!`);
    channel.ack(msg);
  }
}

export const connectWithRabbitMQ = async (): Promise<Channel> => {
  const connection: Connection = await client.connect('amqp://username:password@localhost:5672');
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue('queue');

  channel.consume('queue', receiveMessage(channel));
  console.log('Connected to RabbitMQ\n');

  return channel;
}