import * as core from '@actions/core'
import dotenv from 'dotenv'

dotenv.config()

export type ReviewFocus =  'performance' | 'security' | 'syntax'

class GptOptions {
    static fromActionInputs(): GptOptions {
        // environment variables take precedence over action inputs and helpful for integration tests
        const apiKey = process.env.GPT_API_KEY || this.readOption('api-key')
        const githubToken = process.env.GITHUB_TOKEN || this.readOption('github-token')
        const reviewFocus = process.env.REVIEW_FOCUS || this.readOption('review-focus', 'syntax')
        const model = process.env.REVIEW_MODEL || this.readOption('model', 'gpt-3.5-turbo')
        return new GptOptions(model, apiKey, reviewFocus as never, githubToken)
    }

    private static readOption(option: string, defaultValue = ''): string {
        const required = typeof defaultValue === 'undefined' || defaultValue === ''
        return core.getInput(option, { trimWhitespace: true, required }) || defaultValue
    }
    
    protected constructor(
        readonly model: string,
        readonly apiKey: string,
        readonly reviewFocus: ReviewFocus,
        readonly githubToken: string
    ) {}
}

export const gptOptions = GptOptions.fromActionInputs()
