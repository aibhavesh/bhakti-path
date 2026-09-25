import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const adminsOnly: Access = ({ req }) => {
  const user = req.user as { role?: string } | null
  return user?.role === 'admin'
}

export const adminFieldOnly: FieldAccess = ({ req }) => {
  const user = req.user as { role?: string } | null
  return user?.role === 'admin'
}
