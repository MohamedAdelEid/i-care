import { common } from './common'
import { auth } from './auth'
import { navigation } from './navigation'
import { overview } from './overview'
import { inbox } from './inbox'
import { escalations } from './escalations'
import { handoffs } from './handoffs'
import { bookings } from './bookings'
import { clinic } from './clinic'
import { customers } from './customers'
import { agents } from './agents'
import { knowledgeBase } from './knowledgeBase'
import { workflows } from './workflows'
import { tools } from './tools'
import { playground } from './playground'
import { channels } from './channels'
import { analytics } from './analytics'
import { settings } from './settings'
import { notifications } from './notifications'
import { validation } from './validation'
import { kit } from './kit'

import type { Namespace } from '@/infrastructure/libs/i18n/namespaces'

export const en: Partial<Record<Namespace, Record<string, string>>> = {
  common,
  auth,
  navigation,
  overview,
  inbox,
  escalations,
  handoffs,
  bookings,
  clinic,
  customers,
  agents,
  knowledgeBase,
  workflows,
  tools,
  playground,
  channels,
  analytics,
  settings,
  notifications,
  validation,
  kit,
}
