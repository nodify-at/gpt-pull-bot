import * as core from '@actions/core'
import dotenv from 'dotenv'

dotenv.config()

export type ReviewFocus =  'performance' | 'security' | 'syntax'

class GptOptions {
    static fromActionInputs(): GptOptions {
        // environment variables take precedence over action inputs and helpful for integration tests
        const apiKey = process.env.GPT_API_KEY ?? core.getInput('api-key', { required: true })
        const githubToken = process.env.GITHUB_TOKEN ?? core.getInput('github-token', { required: true })
        const reviewFocus = process.env.REVIEW_FOCUS ?? core.getInput('review-focus', { trimWhitespace: true })
        const model = process.env.REVIEW_MODEL ?? core.getInput('model', { trimWhitespace: true })

        return new GptOptions(model, apiKey, reviewFocus as never, githubToken)
    }

    protected constructor(
        readonly model: string = 'gpt-3.5-turbo',
        readonly apiKey: string,
        readonly reviewFocus: ReviewFocus = 'syntax',
        readonly githubToken: string
    ) {}
}

export const gptOptions = GptOptions.fromActionInputs()
