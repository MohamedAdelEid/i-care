import type { User } from './user.entity'

export interface AuthTokens {
  accessToken: string
}

export interface AuthSession {
  user: User
  tokens: AuthTokens
  permissions: string[]
}
