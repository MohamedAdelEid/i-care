import type { UploadedFile } from './uploaded-file.type'

export interface FormDraft<T> {
  key: string
  values: T
  updatedAt: string
  savedAt: number
  uploadedFiles?: Record<string, UploadedFile>
}
