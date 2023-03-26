import * as core from '@actions/core';
class GptOptions {
    model;
    apiKey;
    reviewFocus;
    githubToken;
    static fromActionInputs() {
        const apiKey = core.getInput('api-key', { required: true });
        const githubToken = core.getInput('github-token', { required: true });
        const reviewFocus = core.getInput('review-focus', { trimWhitespace: true });
        const model = core.getInput('model', { trimWhitespace: true });
        return new GptOptions(model, apiKey, reviewFocus, githubToken);
    }
    constructor(model = 'gpt-3.5-turbo', apiKey, reviewFocus, githubToken) {
        this.model = model;
        this.apiKey = apiKey;
        this.reviewFocus = reviewFocus;
        this.githubToken = githubToken;
    }
}
export const gptOptions = GptOptions.fromActionInputs();
