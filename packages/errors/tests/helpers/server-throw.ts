// create a basic koa server here for testing purpose
import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import { JsonqlServerError } from '../../src'
// const { JsonqlServerError, getErrorByStatus } = errors

const thrower = function() {
  // basically just throw error here
  return async function(ctx: any, next: Function) {
    // console.log('start running thrower')

    // throw new errors[getErrorByStatus(500)]('I throw something off');
    ctx.throw(500, 'Throw an error with custom payload', {error: {msg: 'This is custom'}})

    await next()
  }
}
// @TODO
const throwerWithExtra = function() {
  return async function(_: any, next: Function) {
    // ctx.throw(500, 'Throw an error with custom payload', {error: {msg: 'This is custom'}});
    await next()
    // console.log('start running with throwerWithExtra')
    throw new JsonqlServerError(500, 'Na na na')
  }
}

const customHandler = function() {
  return async (ctx: any, next: Function) => {
    // console.info('You should able to see me here')
    return await next().catch((err: any) => {

      // console.error('Catch the error here', err)

      // ctx.assert(err instanceof JsonqlServerError, 404 , 'Checking of this is what throw earlier');
      const { statusCode, message } = err
      ctx.type = 'json';
      ctx.status = statusCode || 500
      ctx.body = {
        status: 'error',
        type: 'customErrorHandler',
        message
      }
      // ctx.app.emit('error', err, ctx);
    })
  }
}

const middleMiddleware = function(index: string | number) {
  return async (_: any, next: Function) => {
    // console.info(`(${index}) Passing through middleMiddleware`)
    await next()
  }
}

// export
export default function(extra = false) {
  const app = new Koa()
  app.use(bodyparser())

  if (extra) {
    app.use(throwerWithExtra())
    app.use(middleMiddleware(3))
  } else {

    app.use(thrower())
    app.use(middleMiddleware(1))
    app.use(middleMiddleware(2))
    app.use(customHandler())
  }
  return app
}
