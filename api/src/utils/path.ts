import { join } from 'path'

export const rootPath = join(__dirname, '..', '..', '..')

export const fromRootPath = (path: string) => {
  return rootPath === '/' ? path : path.replace(rootPath, '')
}
