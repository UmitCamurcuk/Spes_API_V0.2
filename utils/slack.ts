import axios from 'axios';
import os from 'os';

export const sendSlackMessage = async (message: string) => {
    try {
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!slackWebhookUrl) {
            throw new Error('SLACK_WEBHOOK_URL is not defined in .env file');
        }

        const interfaces = os.networkInterfaces();
        let ipAddress = '';

        // İlk geçerli IPv4 adresini alır
        for (const iface of Object.values(interfaces)) {
            if (iface) {
                for (const alias of iface) {
                    if (alias.family === 'IPv4' && !alias.internal) {
                        ipAddress = alias.address;
                        break;
                    }
                }
            }
            if (ipAddress) break;
        }

        const payload = {
            text: `${message}\nIP Address: ${ipAddress}`,
        };

       // await axios.post(slackWebhookUrl, payload);
        console.log('Slack message sent successfully');
    } catch (error) {
        console.error('Error sending Slack message:', error);
    }
};
