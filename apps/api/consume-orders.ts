import { Kafka } from 'kafkajs';

async function main() {
  const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:29092'],
  });

  const consumer = kafka.consumer({ groupId: 'api-orders-consumer' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders.created.v1', fromBeginning: true });

  console.log('Listening orders.created.v1 ...');
  await consumer.run({
    eachMessage: async ({ message, partition }) => {
      console.log('------------------------');
      console.log(
        'partition:',
        partition,
        'key:',
        message.key?.toString(),
        'value:',
        message.value?.toString(),
      );
      console.log('------------------------');
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
