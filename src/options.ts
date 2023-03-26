import * as core from '@actions/core'

class GptOptions {
    static fromActionInputs(): GptOptions {
        const apiKey = core.getInput('api-key', { required: true })
        const reviewFocus = core.getInput('review-focus', { trimWhitespace: true }) as 'performance' | 'security' | 'syntax'
        const model = core.getInput('model', { trimWhitespace: true })

        return new GptOptions(model, apiKey, reviewFocus)
    }

    protected constructor(readonly model: string = 'gpt-3.5-turbo', readonly apiKey: string, readonly reviewFocus: 'performance' | 'security' | 'syntax') {}
}

export const gptOptions = GptOptions.fromActionInputs()
