import { context, getOctokit } from '@actions/github';
import { Logger } from '../util/logger.js';
export class GitService {
    token;
    static fromConfig = ({ token }) => new GitService(token);
    constructor(token) {
        this.token = token;
    }
    async getChanges() {
        const client = this.client;
        const pullRequestNumber = context.payload.pull_request?.number;
        if (!pullRequestNumber) {
            throw new Error('Could not get pull request number from context, exiting');
        }
        const files = await this.getChangedFiles(client, pullRequestNumber);
        return this.getDifferences(client, pullRequestNumber, files);
    }
    async comment(message) {
        const { owner, repo } = context.repo;
        const number = context.payload.pull_request?.number;
        if (!number) {
            throw new Error('Could not get pull request number from context, exiting');
        }
        await this.client.rest.issues.createComment({
            owner,
            repo,
            issue_number: number,
            body: message,
        });
    }
    async getDifferences({ request }, pullRequestNumber, files) {
        const changedFiles = [];
        for (const file of files) {
            const diffUrl = `https://github.com/${context.repo.owner}/${context.repo.repo}/pull/${pullRequestNumber}/files#${file.filename}`;
            const diffResponse = await request(`GET ${diffUrl}`, {
                headers: {
                    Accept: 'application/vnd.github.diff',
                },
            });
            const rawContent = await request(`GET ${file.raw_url}`);
            changedFiles.push({
                fileName: file.filename,
                source: rawContent.data,
                diff: diffResponse.data,
            });
        }
        return changedFiles;
    }
    async getChangedFiles({ rest }, pullRequestNumber) {
        const response = await rest.pulls.listFiles({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: pullRequestNumber,
        });
        return response.data;
    }
    get client() {
        return getOctokit(this.token, {
            log: Logger,
        });
    }
}
