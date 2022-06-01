// the core stuff to id if it's calling with jsonql
export const DATA_KEY = 'data'
export const ERROR_KEY = 'error'
export const META_KEY = 'meta'

export const JSONQL_NAME = 'jsonql'
export const REST_NAME = 'rest'

export const AVAILABLE_FORMATS = [JSONQL_NAME, REST_NAME]

// contract file names
export const DEFAULT_CONTRACT_FILE_NAME = 'contract.json'
export const PUBLIC_CONTRACT_FILE_NAME = 'public-contract.json'

export const CONTENT_TYPE = 'application/vnd.api+json'
export const CHARSET = 'charset=utf-8'
export const DEFAULT_HEADER = {
  'Accept': CONTENT_TYPE,
  'Content-Type': [ CONTENT_TYPE, CHARSET ].join('')
}

export const CONTRACT_REQUEST_METHODS = 'GET'
