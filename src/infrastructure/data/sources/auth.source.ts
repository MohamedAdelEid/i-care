import type { AuthSession } from '@/domain/entities'
import type { LoginInput } from '@/domain/repositories/auth.repository'
import { delay } from '@/infrastructure/data/utils/source.utils'
import { localStorageClient } from '@/infrastructure/storage/local-storage'
import { STORAGE_KEYS } from '@/infrastructure/storage/storage.keys'

const SUPERVISOR_SESSION: AuthSession = {
  user: {
    id: 'user-supervisor',
    name: 'Aisha Supervisor',
    email: 'supervisor@icare.local',
    role: 'supervisor',
  },
  tokens: { accessToken: 'dummy-access-token' },
  permissions: ['inbox.read', 'inbox.takeover', 'agents.write', 'settings.write'],
}

export const authSource = {
  async login(input: LoginInput): Promise<AuthSession> {
    await delay()
    const session: AuthSession = {
      ...SUPERVISOR_SESSION,
      user: { ...SUPERVISOR_SESSION.user, email: input.email },
    }
    localStorageClient.set(STORAGE_KEYS.authToken, session.tokens.accessToken)
    localStorageClient.set(STORAGE_KEYS.authState, session)
    return session
  },

  async logout(): Promise<void> {
    await delay(150)
    localStorageClient.remove(STORAGE_KEYS.authToken)
    localStorageClient.remove(STORAGE_KEYS.authState)
  },

  async getSession(): Promise<AuthSession | null> {
    await delay(100)
    return localStorageClient.get<AuthSession>(STORAGE_KEYS.authState)
  },
}
