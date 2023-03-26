import * as yaml from 'yaml'
import * as fs from 'fs'
import { join } from 'path'
import { ReviewFocus } from '../options.js'

const base = process.cwd()

type Template = {
    question: string
    type: 'performance' | 'security' | 'syntax'
}

type TemplateConfiguration = {
    questions: Template[],
    description: string
}

export const templates: TemplateConfiguration = yaml.parse(fs.readFileSync(join(base, 'template.yaml'), 'utf8'))

export const prepareQuestion = (templateConfiguration: TemplateConfiguration, reviewFocus: ReviewFocus) => {
    const template = templateConfiguration.questions.find(template => template.type === reviewFocus)
    return template?.question
}
