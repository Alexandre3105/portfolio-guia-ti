import { createServer } from 'node:http'

import next from 'next'

const hostname = process.env.E2E_SERVER_HOST
const port = Number(process.env.E2E_SERVER_PORT)
const shutdownPath = process.env.E2E_SHUTDOWN_PATH

if (!hostname || !Number.isInteger(port) || !shutdownPath) {
  throw new Error('Configuração do servidor E2E ausente ou inválida')
}

const app = next({ dev: true, hostname, port })
const handle = app.getRequestHandler()

await app.prepare()

let shuttingDown = false

const server = createServer((request, response) => {
  if (request.method === 'POST' && request.url === shutdownPath) {
    response.writeHead(204)
    response.end(() => void shutdown())
    return
  }

  void handle(request, response)
})

async function shutdown() {
  if (shuttingDown) return
  shuttingDown = true

  const forceExit = setTimeout(() => process.exit(0), 5_000)
  forceExit.unref()

  server.close()
  server.closeAllConnections()
  await app.close()
  clearTimeout(forceExit)
  process.exit(0)
}

process.once('SIGINT', () => void shutdown())
process.once('SIGTERM', () => void shutdown())

server.listen(port, hostname)
