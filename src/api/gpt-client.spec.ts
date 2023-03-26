import { GptClient } from './gpt-client.js'
import got, { CancelableRequest } from 'got'
import type { ChatCompletionResponse } from './types.js'

describe('GPTClient', () => {
    const json = jest.fn()

    const spy = jest.spyOn(got, 'post').mockReturnValue({ json } as never as CancelableRequest)

    it('should ask a question', async () => {
        const mock: ChatCompletionResponse = {
            id: 'test',
            choices: [{ finish_reason: '', index: 0, message: { content: '', role: '' } }],
            created: 0,
            model: '',
            object: '',
        }
        json.mockResolvedValueOnce(mock)

        const response = await GptClient.ask('Hello, how are you?')
        expect(response).toEqual(mock)
        expect(spy).toHaveBeenCalled()
    })
})
