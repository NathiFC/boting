
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');

// Crie um cliente
const client = new Client();

// Quando o QR Code for gerado
client.on('qr', (qr) => {
    console.log('Gerando o QR Code...');
    qrcode.toFile('./qrcode.png', qr, function (err) {
        if (err) throw err;
        console.log('QR Code gerado e salvo como qrcode.png');
    });
});

// Quando o cliente for autenticado
client.on('ready', () => {
    console.log('O cliente está pronto!');
});

// Inicie o cliente
client.initialize();


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

client.on('message', message => {
    const msg = message.body.toLowerCase();
    if (msg.includes('oi') || msg.includes('olá') || msg.includes('ola')) {
        message.reply(`Olá, tudo bem?
Seja bem-vindo à Kalanchoe Flores!

Responderemos assim que possível. Para solicitação de orçamentos, por gentileza nos informe:

- Data do evento (dia, mês e ano)
- Local do evento

E o tipo de decoração:
- cerimônia religiosa
- buquê de noiva
- arranjos em geral

Atenciosamente,
Kalanchoe Flores`);
    }
});

client.initialize();
