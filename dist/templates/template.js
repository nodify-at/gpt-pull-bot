import * as yaml from 'yaml';
export const templates = yaml.parse('./templates.yaml');
export const prepareQuestion = (templates, changedFile, templateType) => {
    const template = templates.find(template => template.type === templateType);
    return template?.question?.replace('{diff}', changedFile.diff).replace('{source}', changedFile.source);
};
