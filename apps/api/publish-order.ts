import { Kafka } from 'kafkajs';

async function main() {
  const kafka = new Kafka({
    clientId: 'api',
    brokers: ['localhost:29092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  const payload = {
    event: 'OrderCreated',
    version: 1,
    orderId: 'demo-' + Date.now(),
    userId: 'u1',
    amount: 99.9,
    occurredAt: new Date().toISOString(),
  };

  await producer.send({
    topic: 'orders.created.v1',
    messages: [{ key: payload.orderId, value: JSON.stringify(payload) }],
  });

  console.log('Sent:', payload);
  await producer.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
