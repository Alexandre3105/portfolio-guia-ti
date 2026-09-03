export default async function shutdownTestServer() {
  const hostname = process.env.E2E_SERVER_HOST
  const port = process.env.E2E_SERVER_PORT
  const shutdownPath = process.env.E2E_SHUTDOWN_PATH

  if (!hostname || !port || !shutdownPath) {
    throw new Error('Configuração do encerramento E2E ausente')
  }

  const response = await fetch(`http://${hostname}:${port}${shutdownPath}`, {
    method: 'POST',
    signal: AbortSignal.timeout(5_000),
  })

  if (!response.ok) {
    throw new Error(`Servidor E2E não encerrou corretamente: HTTP ${response.status}`)
  }
}
