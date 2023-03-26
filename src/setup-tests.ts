import dotenv from 'dotenv'

dotenv.config()

jest.mock('@actions/core', () => ({
    getInput: jest.fn(),
}))
