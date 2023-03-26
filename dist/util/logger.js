import * as action from '@actions/core';
export class Logger {
    static log(message) {
        action.info(JSON.stringify(message));
    }
    static error(message) {
        action.error(message);
    }
    static warn(message) {
        action.warning(message);
    }
    static info(message) {
        action.info(message);
    }
    static debug(message) {
        action.debug(message);
    }
}
