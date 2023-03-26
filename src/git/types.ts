export type ChangedFile = {
    source: string
    diff: string
    fileName: string
}

export type ChangedFiles = ChangedFile[]