export const EscalationStatus = {
  Open: 'open',
  Assigned: 'assigned',
  Resolved: 'resolved',
} as const

export type EscalationStatus = (typeof EscalationStatus)[keyof typeof EscalationStatus]
