import { GitService } from './git.service.js'
import * as github from '@actions/github'

const listFiles = jest.fn().mockResolvedValue({ data: [] })
jest.mock<typeof github['default']>('@actions/github', () => ({
    context: {
        repo: {
            owner: 'nodify-at',
            repo: 'nodify.at',
        } as typeof github['context']['repo'],
        payload: {
            pull_request: {
                number: 4,
            }
        },
    } as typeof github['context'],
    getOctokit: jest.fn().mockReturnValue({
        rest: {
            pulls: {
                listFiles: jest.fn().mockImplementation(() => listFiles()),
            },
        },
        request: jest.fn().mockResolvedValue({ data: { content: Buffer.from('test').toString('base64') }})
    }) as typeof github['getOctokit'],
} as typeof github['default']))

describe('GitService', () => {

    const gitService = new GitService('token')

    it('should return an empty array', async () => {
        await gitService.getChanges()
        expect(listFiles).toHaveBeenCalled()
    })

    it('should return a list of files', async () => {
        listFiles.mockResolvedValueOnce({ data: [{ filename: 'test', patch: 'test-123' }] })

        const files = await gitService.getChanges()
        expect(files).toHaveLength(1)
        expect(files[0].fileName).toBe('test')
        expect(files[0].source).toBe('test')
        expect(files[0].diff).toBe('test-123')
    })

    it('should do', async () => {
        const gitService = new GitService('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')
        await gitService.getChanges()
    })
})
