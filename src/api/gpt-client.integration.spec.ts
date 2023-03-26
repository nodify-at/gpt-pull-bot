import { gptOptions } from '../options.js'
import { GptClient } from './gpt-client.js'

const optional = process.env.GPT_API_KEY ? describe : describe.skip

optional('GptClient Integration', () => {
    it('should ask a question', async () => {
        ;(gptOptions as unknown as Record<string, unknown>).apiKey = process.env.GPT_API_KEY
        const response = await GptClient.ask('Hello, how are you?')
        expect(response.choices.length).toBeGreaterThan(0)
        expect(response.choices[0].message.content).toBeDefined()
    })

    it('should throw an error if api key is invalid', async () => {
        ;(gptOptions as unknown as Record<string, unknown>).apiKey = 'invalid'
        const response = GptClient.ask('Hello, how are you?')
        await expect(response).rejects.toThrow()
    })
})
