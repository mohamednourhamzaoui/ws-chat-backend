import chalk from "chalk";

const warning = chalk.yellow;
const debugColor = chalk.blue;
const info = chalk.green;

const level: number = 0;

export function log(message: string) {
    if (level >= 1) console.log(`[${debugColor((new Date()).toISOString())}][${info("INFO")}]: ${message}`)
}

export function error(message: string) {
    if (level <= 3) console.log(`[${debugColor((new Date()).toISOString())}][${chalk.red("ERROR")}]: ${chalk.red(message)}`)
}

export function warn(message: string) {
    if (level >= 2) console.log(`[${debugColor((new Date()).toISOString())}][${warning("ERROR")}]: ${message}`)
}

export function debug(message: string) {
    if (level == 0) console.log(`[${debugColor((new Date()).toISOString())}][${debugColor("DEBUG")}]: ${message}`)
}