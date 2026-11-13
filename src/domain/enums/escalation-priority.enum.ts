export const EscalationPriority = {
  Low: 'low',
  Normal: 'normal',
  High: 'high',
} as const

export type EscalationPriority = (typeof EscalationPriority)[keyof typeof EscalationPriority]
