export const STORAGE_KEYS = {
  authToken: 'bublz.auth.token',
  authState: 'bublz.auth.state',
  theme: 'bublz.theme',
  language: 'bublz.language',
  settings: 'bublz.settings',
  formDraft: (key: string) => `bublz.draft.${key}`,
} as const

export type StorageKey =
  | (typeof STORAGE_KEYS)[Exclude<keyof typeof STORAGE_KEYS, 'formDraft'>]
  | ReturnType<(typeof STORAGE_KEYS)['formDraft']>
