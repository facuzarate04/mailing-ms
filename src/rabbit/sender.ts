import * as amqp from 'amqplib';
import config from '@/server/config';

let channel: amqp.Channel;

interface IMessage {
    message: string;
    moduleName: string;
    templateName: string;
    sent: boolean;
    referenceId?: string;
}

async function connect(data: IMessage) {
    const connection = await amqp.connect(config.rabbitUrl);
    channel = await connection.createChannel();
    await channel.assertExchange(`email-${data.moduleName}`, 'direct', {
        durable: false
    });
}

export async function send(data: IMessage) {
    if(!channel) {
        await connect(data);
    }
    channel.publish(`email-${data.moduleName}`, '', Buffer.from(JSON.stringify(data)));
    console.log({
        message: data.message,
        data: data
    })
    channel.on("close", function () {
        console.error("RabbitMQ conexión cerrada, intentado reconecta en 10'");
    });
}
