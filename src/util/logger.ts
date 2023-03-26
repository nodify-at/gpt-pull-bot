import * as action from '@actions/core'

export class Logger {
    static log(message: string | unknown) {
        action.info(JSON.stringify(message))
    }

    static error(message: string) {
        action.error(message)
    }

    static warn(message: string) {
        action.warning(message)
    }

    static info(message: string) {
        action.info(message)
    }

    static debug(message: string) {
        action.debug(message)
    }
}