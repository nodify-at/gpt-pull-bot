import { ChangedFiles } from '@gpt/git/types.js'
import { context, getOctokit } from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { Logger } from '@gpt/util/logger.js'

type GitServiceConfig = {
    token: string
}

export class GitService {

    /**
     * Create a new instance of the GitService, using the provided token.
     * @param token The GitHub token to use for authentication.
     */
    static fromConfig = ({ token }: GitServiceConfig) => new GitService(token)

    constructor(private readonly token: string) {}

    async getChanges(): Promise<ChangedFiles> {
        const client = this.client
        const pullRequestNumber = context.payload.pull_request?.number

        if (!pullRequestNumber) {
            throw new Error('Could not get pull request number from context, exiting')
        }

        const files = await this.getChangedFiles(client, pullRequestNumber)
        return this.getDifferences(client, pullRequestNumber, files)
    }

    async comment(message: string) {
        const { owner, repo } = context.repo;
        const number = context.payload.pull_request?.number

        if (!number) {
            throw new Error('Could not get pull request number from context, exiting')
        }

        await this.client.rest.issues.createComment({
            owner,
            repo,
            issue_number: number,
            body: message,
        })
    }

    private async getDifferences(
        { request }: ReturnType<typeof getOctokit>,
        pullRequestNumber: number,
        files: RestEndpointMethodTypes['pulls']['listFiles']['response']['data']
    ): Promise<ChangedFiles> {
        const changedFiles: ChangedFiles = []

        for (const file of files) {
            const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/pull/${pullRequestNumber}/files#${file.filename}`
            const diffResponse = await request(`GET ${diffUrl}`, {
                headers: {
                    Accept: 'application/vnd.github.diff',
                },
            })

            const rawContent = await request(`GET ${file.raw_url}`)

            changedFiles.push({
                fileName: file.filename,
                source: rawContent.data,
                diff: diffResponse.data,
            })
        }
        return changedFiles
    }

    private async getChangedFiles({ rest }: ReturnType<typeof getOctokit>, pullRequestNumber: number) {
        // Get the list of files changed in the pull request
        const response = await rest.pulls.listFiles({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: pullRequestNumber,
        })
        return response.data
    }

    private get client() {
        if (!this.token) {
            throw new Error('No GitHub token provided, exiting')
        }

        Logger.info(this.token.split(' ').join(',,'))

        return getOctokit(this.token, {
            log: Logger,
        })
    }
}
