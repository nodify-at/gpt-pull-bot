import * as yaml from 'yaml'
import { ChangedFile } from '@gpt/git/index.js'

type Template = {
    question: string
    type: 'performance' | 'security' | 'syntax'
}

export const templates: Template[] = yaml.parse('./templates.yaml')

export const prepareQuestion = (templates: Template[], changedFile: ChangedFile, templateType: 'performance' | 'security' | 'syntax') => {
    const template = templates.find(template => template.type === templateType)
    return template?.question?.replace('{diff}', changedFile.diff).replace('{source}', changedFile.source)
}