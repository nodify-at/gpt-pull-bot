import { GitService } from './git/index.js'
import { GptClient } from './api/index.js'
import { prepareQuestion, templates } from './templates/template.js'
import { gptOptions } from './options.js'
import { Logger } from './util/logger.js'

export class Reviewer {
    private readonly gitService: GitService = GitService.fromConfig({ token: gptOptions.githubToken })

    async start() {
        Logger.info(`Starting review with focus ${gptOptions.reviewFocus}`)

        const changes = await this.gitService.getChanges()

        Logger.info(`Found ${changes.length} changes`)

        for (const file of changes) {
            Logger.info(`Reviewing file ${file.fileName}`)
            const question = prepareQuestion(templates, gptOptions.reviewFocus)
            if (!question) {
                throw new Error(`Could not prepare question for file ${file.fileName}`)
            }

            const questions = [
                `Source: ${file.source.length > 2048 ? file.source.substring(0, 2048) : file.source}`,
                `patch: ${file.diff.length > 2048 ? file.diff.substring(0, 2048) : file.diff}}`,
                question
            ]

            Logger.info(`Asking question: ${questions}`);

            const response = await GptClient.ask(questions)
            Logger.info(`Received response from GPT-3: ${JSON.stringify(response.choices?.[0]?.message)}`)

            for (const choice of response.choices) {
                const message = choice.message.content
                if (message) {
                    await this.gitService.comment(message)
                }
            }
        }

        Logger.info(`Finished review`)
    }
}
