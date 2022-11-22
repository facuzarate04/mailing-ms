import * as amqp from 'amqplib';
import config from '@/server/config';
import { sendEmail }from '@/email/emailController';

let channel: amqp.Channel;

async function connect() {
    const connection = await amqp.connect(config.rabbitUrl);
    channel = await connection.createChannel();

    channel.on("close", function () {
        console.error("RabbitMQ conexión cerrada, intentado reconecta en 10'");
        setTimeout(() => init(), 10000);
    });

    console.log("RabbitMQ conectado");
    await channel.assertQueue('email');

}

export async function init() {
    if(!channel) {
        await connect();
    }
    await channel.consume('email', (msg) => {
        if(msg) {
            const data = JSON.parse(msg.content.toString());
            sendEmail(data);
        }
    });
}