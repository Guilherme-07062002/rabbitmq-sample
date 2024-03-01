# RabbitMQ Sample

This is a sample project to demonstrate how to use RabbitMQ with Express and TypeScript.

## Introduction

RabbitMQ is a messaging software that enables communication between different applications. It is widely used for communication between microservices, but it can also be used for other purposes.

Asynchronous processes are commonly used in situations where an immediate response is not necessary for the user.

In the example of this code, the `sendMessage()` function is sending a message to a queue, allowing it to be processed asynchronously in the background.

This approach is useful for operations that may take some time to complete, such as image processing, sending emails, communicating with external services, etc.

By using asynchronous processing, the user experience is improved, as they do not need to wait for these longer operations to complete.

## How to run

Clone the repository

```bash
git clone https://github.com/Guilherme-07062002/rabbitmq-sample.git
```

Install the dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

## How to use

Up the docker container

```bash
docker-compose up -d
```

With the server running, make a POST request to the following endpoint:

```bash
http://localhost:3000/send-message
```

The response body should be:

```json
{
  "message": "The message was sent to the consumer!"
}
```

The consumer will log the message in the console.
