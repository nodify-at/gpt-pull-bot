import got, { Headers, HTTPError } from 'got'
import { gptOptions } from '../options.js'
import { ChatCompletionMessage, ChatCompletionRequest, ChatCompletionResponse } from './types.js'
import { Logger } from '../util/logger.js'

/**
 * A client for the OpenAI GPT-3 API (https://beta.openai.com/docs/api-reference/completions/create). This client is
 * used to ask questions to the GPT-3 model.
 *
 * @see https://beta.openai.com/docs/api-reference/completions/create
 * @see https://beta.openai.com/docs/introduction/faq
 * @see https://beta.openai.com/docs/introduction/overview
 */
export class GptClient {
    private static GPT_API_URL = 'https://api.openai.com'
    private static readonly CHAT_PATH = '/v1/chat/completions'

    /**
     * Ask a question to the GPT-3 model.
     * @param questions The questions to ask the model.
     */
    static async ask(questions: string[]): Promise<ChatCompletionResponse> {

        const messages: ChatCompletionMessage[] = questions.map(q => ({ role: 'user', content: q }))

        const request: ChatCompletionRequest = {
            model: gptOptions.model,
            messages: [
                { role: 'system', content: 'You are a great and helpful reviewer on GitHub! You can analyse the source code if exists but if it is incomplete ignore it.'},
                { role: 'system', content: 'Please provide your feedback as a comment on the GitHub review and embed the relevant code snippets using GitHub syntax highlighting.' },
                ...messages,
            ],
        }

        try {
            return await got
                .post<ChatCompletionResponse>(`${GptClient.GPT_API_URL}${GptClient.CHAT_PATH}`, {
                    headers: this.headers,
                    json: request,
                })
                .json()
        } catch(e) {
            if (e instanceof HTTPError) {
                Logger.error(`Could not ask question to GPT-3, ${e.response.body}}`)
            }
            return Promise.reject(new Error(`Could not ask question to GPT-3`))
        }

    }

    private static get headers(): Headers {
        return {
            Authorization: `Bearer ${gptOptions.apiKey}`,
        }
    }
}
