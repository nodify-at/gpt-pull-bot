import { GitService } from '@gpt/git/index.js'
import { GptClient } from '@gpt/api/index.js'
import { prepareQuestion, templates } from '@gpt/templates/template.js'
import { gptOptions } from '@gpt/options.js'
import { Logger } from '@gpt/util/logger.js'

export class Reviewer {
    private readonly gitService: GitService = GitService.fromConfig({ token: process.env.GITHUB_TOKEN ?? '' })

    async start() {
        const changes = await this.gitService.getChanges()

        for (const file of changes) {
            const question = prepareQuestion(templates, file, gptOptions.reviewFocus)
            if (!question) {
                throw new Error(`Could not prepare question for file ${file.fileName}`)
            }
            const response = await GptClient.ask(question)
            Logger.log(response)

            for (const choice of response.choices) {
                const message = choice.message.content
                if (message) {
                    await this.gitService.comment(message)
                }
            }
        }
    }
}
