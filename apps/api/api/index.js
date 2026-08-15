// Handler serverless de Vercel. Deliberadamente JS plano (no TS): requiere el build
// ya compilado por tsc (`pnpm build`), evitando que el bundler de Vercel tenga que
// procesar los decoradores de NestJS (emitDecoratorMetadata no es seguro bajo esbuild).
const { createServer } = require("../dist/bootstrap");

let cachedHandlerPromise;

module.exports = async function handler(req, res) {
  if (!cachedHandlerPromise) {
    cachedHandlerPromise = createServer();
  }
  const expressHandler = await cachedHandlerPromise;
  return expressHandler(req, res);
};
