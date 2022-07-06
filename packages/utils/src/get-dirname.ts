import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/* the url has to be import.meta.url, for use in esm env */
export function getDirname (url: string) {
  return dirname(fileURLToPath(url))
}
