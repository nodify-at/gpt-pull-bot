import got, { Headers } from 'got'
import { gptOptions } from '@gpt/options.js'
import { ChatCompletionRequest, ChatCompletionResponse } from './types.js'

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
     * @param question The question to ask. This question will be used as the context for the model to generate a response.
     */
    static ask(question: string): Promise<ChatCompletionResponse> {
        const request: ChatCompletionRequest = {
            model: gptOptions.model,
            messages: [{ role: 'user', content: question }],
        }
        return got
            .post<ChatCompletionResponse>(`${GptClient.GPT_API_URL}${GptClient.CHAT_PATH}`, {
                headers: this.headers,
                json: request,
            })
            .json()
    }

    private static get headers(): Headers {
        return {
            Authorization: `Bearer ${gptOptions.apiKey}`,
        }
    }
}
