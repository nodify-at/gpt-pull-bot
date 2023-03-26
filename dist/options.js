import * as core from '@actions/core';
class GptOptions {
    model;
    apiKey;
    reviewFocus;
    static fromActionInputs() {
        const apiKey = core.getInput('api-key', { required: true });
        const reviewFocus = core.getInput('review-focus', { trimWhitespace: true });
        const model = core.getInput('model', { trimWhitespace: true });
        return new GptOptions(model, apiKey, reviewFocus);
    }
    constructor(model = 'gpt-3.5-turbo', apiKey, reviewFocus) {
        this.model = model;
        this.apiKey = apiKey;
        this.reviewFocus = reviewFocus;
    }
}
export const gptOptions = GptOptions.fromActionInputs();
