/**
 * The request to the GPT-3 API. This request contains the model to use and the messages to use as context.
 *
 * @see https://beta.openai.com/docs/api-reference/completions/create
 */
export type ChatCompletionRequest = {
    model: string,
    messages: {
        role: 'user',
        content: string
    }[]
}

/**
 * The response from the GPT-3 API. This response contains the generated response from the model.
 * @see https://beta.openai.com/docs/api-reference/completions/create
 */
export type ChatCompletionResponse = {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: {
        index: number,
        finish_reason: string,
        message: {
            role: string,
            content: string,
        }
    }[]
}