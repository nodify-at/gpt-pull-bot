import { ChangedFiles } from './types.js'
import { context, getOctokit } from '@actions/github'
import { RestEndpointMethodTypes } from '@octokit/rest'
import { Logger } from '../util/logger.js'

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
        return this.getDifferences(client, files)
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
        files: RestEndpointMethodTypes['pulls']['listFiles']['response']['data']
    ): Promise<ChangedFiles> {
        const changedFiles: ChangedFiles = []

        for (const file of files) {
            const rawContent = await request(`GET ${file.contents_url}`)
            const source = Buffer.from(rawContent.data.content, 'base64').toString('utf-8')
            changedFiles.push({
                fileName: file.filename,
                source,
                diff: file.patch ?? '',
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
        return getOctokit(this.token, {
            log: Logger
        })
    }
}
