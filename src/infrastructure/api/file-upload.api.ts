import type { UploadedFile } from '@/domain/types'
import { ResultStatus, type ApiResult } from '@/domain/types/api-result.type'

const emptyFailure = <T>(): ApiResult<T> => ({
  data: null,
  error: { code: 'unavailable', message: 'Upload unavailable' },
  status: ResultStatus.Error,
  statusCode: 501,
  hasValue: false,
  message: 'Upload unavailable',
})

export const fileUploadApi = {
  async upload(_file: File, _scope: string): Promise<ApiResult<UploadedFile>> {
    return emptyFailure()
  },
  async delete(_path: string): Promise<ApiResult<null>> {
    return {
      data: null,
      error: null,
      status: ResultStatus.Success,
      statusCode: 200,
      hasValue: true,
      message: '',
    }
  },
  download(_path: string): ApiResult<Blob> | null {
    return null
  },
}
