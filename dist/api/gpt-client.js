import got from 'got';
import { gptOptions } from '../options.js';
export class GptClient {
    static GPT_API_URL = 'https://api.openai.com';
    static CHAT_PATH = '/v1/chat/completions';
    static ask(question) {
        const request = {
            model: gptOptions.model,
            messages: [{ role: 'user', content: question }],
        };
        return got
            .post(`${GptClient.GPT_API_URL}${GptClient.CHAT_PATH}`, {
            headers: this.headers,
            json: request,
        })
            .json();
    }
    static get headers() {
        return {
            Authorization: `Bearer ${gptOptions.apiKey}`,
        };
    }
}
