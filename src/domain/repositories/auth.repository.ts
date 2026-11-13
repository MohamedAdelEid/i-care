import type { AuthSession } from '@/domain/entities'

export interface LoginInput {
  email: string
  password: string
}

export interface IAuthRepository {
  login(input: LoginInput): Promise<AuthSession>
  logout(): Promise<void>
  getSession(): Promise<AuthSession | null>
}
