import { Reviewer } from './reviewer.js'
import { context } from '@actions/github'

context.payload.pull_request = {
    number: 4,
}

const reviewer = new Reviewer()
await reviewer.start()