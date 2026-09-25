export function getServerSideURL() {
  const value = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return value.replace(/\/$/, '')
}
