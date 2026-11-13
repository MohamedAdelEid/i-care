import { AgentRepository } from '@/infrastructure/repositories/agent.repository.impl'
import { AnalyticsRepository } from '@/infrastructure/repositories/analytics.repository.impl'
import { AuthRepository } from '@/infrastructure/repositories/auth.repository.impl'
import { BookingRepository } from '@/infrastructure/repositories/booking.repository.impl'
import { ClinicRepository } from '@/infrastructure/repositories/clinic.repository.impl'
import { ChannelRepository } from '@/infrastructure/repositories/channel.repository.impl'
import { ConversationRepository } from '@/infrastructure/repositories/conversation.repository.impl'
import { CustomerRepository } from '@/infrastructure/repositories/customer.repository.impl'
import { EscalationRepository } from '@/infrastructure/repositories/escalation.repository.impl'
import { MessageRepository } from '@/infrastructure/repositories/message.repository.impl'
import { SettingsRepository } from '@/infrastructure/repositories/settings.repository.impl'

export const repositories = {
  auth: new AuthRepository(),
  conversations: new ConversationRepository(),
  messages: new MessageRepository(),
  escalations: new EscalationRepository(),
  bookings: new BookingRepository(),
  clinic: new ClinicRepository(),
  customers: new CustomerRepository(),
  agents: new AgentRepository(),
  channels: new ChannelRepository(),
  analytics: new AnalyticsRepository(),
  settings: new SettingsRepository(),
}
