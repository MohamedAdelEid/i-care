import type { EyeCareServiceId } from '@/domain/entities'

export const serviceI18nKey = (id: EyeCareServiceId | undefined): string => {
  switch (id) {
    case 'retina':
      return 'serviceRetina'
    case 'lasik':
      return 'serviceLasik'
    case 'pediatric':
      return 'servicePediatric'
    case 'optics':
      return 'serviceOptics'
    case 'cataract':
      return 'serviceCataract'
    default:
      return 'serviceRetina'
  }
}
