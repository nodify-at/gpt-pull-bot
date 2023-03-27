import { gptOptions } from './options.js'

describe('Options', () => {

    it('should return default options', () => {
        expect(gptOptions.model).toBe('gpt-3.5-turbo')
        expect(gptOptions.reviewFocus).toBe('syntax')
    })
})