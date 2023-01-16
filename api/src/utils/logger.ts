import { join } from 'path'
import { createLogger, format, transports } from 'winston'
import { name } from '../../package.json'
import { rootPath } from './path'

const path = join(rootPath, 'logs')
const { combine, colorize, label, timestamp, splat, simple, ms, prettyPrint, printf } = format
const defaultFormat = combine(label({ label: name }), timestamp(), simple(), splat(), ms(), prettyPrint())
const consoleFormat = printf(({ level, message, label: title, timestamp: date, ms: elapsed }) => `${date} [${title}] ${level}: ${message} (${elapsed})`)

export const logger = createLogger({
  level: 'debug',
  format: defaultFormat,
  transports: [
    new transports.File({ filename: join(path, 'combined.log') }),
    new transports.File({ level: 'warn', filename: join(path, 'warning.log') }),
    new transports.File({ level: 'error', filename: join(path, 'error.log') }),
    new transports.Console({ format: combine(colorize(), consoleFormat) }),
  ],
})

export const logcatch = (error: unknown, message: string): void => {
  let errorMessage
  if (error instanceof Error) errorMessage = error.message
  else errorMessage = String(error)
  logger.error(`${message}, %s`, errorMessage, { error })
}
