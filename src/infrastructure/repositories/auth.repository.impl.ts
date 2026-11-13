import type { IAuthRepository, LoginInput } from '@/domain/repositories/auth.repository'
import { authSource } from '@/infrastructure/data/sources/auth.source'

export class AuthRepository implements IAuthRepository {
  login(input: LoginInput) {
    return authSource.login(input)
  }

  logout() {
    return authSource.logout()
  }

  getSession() {
    return authSource.getSession()
  }
}
