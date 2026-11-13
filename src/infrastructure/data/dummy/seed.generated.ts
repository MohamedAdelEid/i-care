/* eslint-disable -- generated seed */
import type { Agent, AgentTool, ChannelConnection, Customer, Escalation, KnowledgeArticle, Workflow, BookingDraft, AiInsight, Booking, Doctor, ClinicService, ClinicDepartment, ClinicSchedule } from '@/domain/entities'
import type { Conversation } from '@/domain/entities/conversation.entity'
import type { Message } from '@/domain/entities/message.entity'
import type { PerformanceSnapshot, CsatSummary, UnansweredTopic, InsightPoint } from '@/domain/entities/analytics.entity'
import type { TeamMember, Role, BusinessHours, NotificationPreference, ApiKeySummary, GeneralSettings, WebhookEndpoint } from '@/domain/entities/settings.entity'

export const SEED_CUSTOMERS: Customer[] = [
  {
    "id": "cust-001",
    "displayName": "Layla Hassan",
    "phone": "+201010000000",
    "email": "user1@example.com",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care",
      "new",
      "insurance",
      "flagged",
      "follow-up"
    ],
    "createdAt": "2025-09-01T00:00:00.000Z",
    "lastSeenAt": "2025-11-01T00:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-1"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-1"
      }
    ],
    "status": "blocked",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-1-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-1-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-01T00:00:00.000Z"
      },
      {
        "id": "cact-1-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-01T00:00:00.000Z"
      },
      {
        "id": "cact-1-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-002",
    "displayName": "عمر الفارسي",
    "phone": "+201110000001",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-10-02T00:00:00.000Z",
    "lastSeenAt": "2025-11-02T01:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-2"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-2-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-2-2",
        "body": "Internal note 2 for cust-002.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-2-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-2-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-02T01:00:00.000Z"
      },
      {
        "id": "cact-2-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-003",
    "displayName": "Sara Ahmed",
    "phone": "+201210000002",
    "preferredLanguage": "en",
    "tags": [],
    "createdAt": "2025-11-03T00:00:00.000Z",
    "lastSeenAt": "2025-11-03T02:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-3"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-3-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-3-2",
        "body": "Internal note 2 for cust-003.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-3-3",
        "body": "Internal note 3 for cust-003.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-3-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-3-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-3-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-03T02:00:00.000Z"
      },
      {
        "id": "cact-3-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-01T00:00:00.000Z"
      },
      {
        "id": "cact-3-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-004",
    "displayName": "يوسف كريم",
    "phone": "+201510000003",
    "email": "user4@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-04T00:00:00.000Z",
    "lastSeenAt": "2025-11-04T03:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-4"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-4-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-4-2",
        "body": "Internal note 2 for cust-004.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-4-3",
        "body": "Internal note 3 for cust-004.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-4-4",
        "body": "Internal note 4 for cust-004.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-4-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-4-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-4-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-4-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-04T03:00:00.000Z"
      },
      {
        "id": "cact-4-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-005",
    "displayName": "Nour Eid",
    "phone": "+201010000004",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-10-05T00:00:00.000Z",
    "lastSeenAt": "2025-11-05T04:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-5"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": true,
    "lastServiceId": "cataract",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-5-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-5-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-5-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-5-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-5-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-5-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-05T04:00:00.000Z"
      },
      {
        "id": "cact-5-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cact-5-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-006",
    "displayName": "هناء مالك",
    "phone": "+201110000005",
    "preferredLanguage": "ar",
    "tags": [
      "vip",
      "eye-care"
    ],
    "createdAt": "2025-11-06T00:00:00.000Z",
    "lastSeenAt": "2025-11-06T05:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-6"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-6"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": false,
    "lastServiceId": "retina",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-6-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-6-2",
        "body": "Internal note 2 for cust-006.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-6-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-6-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-6-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-6-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-6-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-6-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-06T05:00:00.000Z"
      },
      {
        "id": "cact-6-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-03T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-007",
    "displayName": "Tariq Salim",
    "phone": "+201210000006",
    "email": "user7@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-07T00:00:00.000Z",
    "lastSeenAt": "2025-11-07T06:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-7"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": true,
    "lastServiceId": "lasik",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-7-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-7-2",
        "body": "Internal note 2 for cust-007.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-7-3",
        "body": "Internal note 3 for cust-007.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-7-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-07T06:00:00.000Z"
      },
      {
        "id": "cact-7-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cact-7-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-008",
    "displayName": "مايا جوزيف",
    "phone": "+201510000007",
    "preferredLanguage": "ar",
    "tags": [
      "new"
    ],
    "createdAt": "2025-10-08T00:00:00.000Z",
    "lastSeenAt": "2025-11-08T07:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-8"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-8-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-8-2",
        "body": "Internal note 2 for cust-008.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-8-3",
        "body": "Internal note 3 for cust-008.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-8-4",
        "body": "Internal note 4 for cust-008.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-8-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-8-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-08T07:00:00.000Z"
      },
      {
        "id": "cact-8-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-05T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-009",
    "displayName": "Adel Farouk",
    "phone": "+201010000008",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-11-09T00:00:00.000Z",
    "lastSeenAt": "2025-11-09T08:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-9"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-9-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-9-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-9-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-9-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-09T08:00:00.000Z"
      },
      {
        "id": "cact-9-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-06T00:00:00.000Z"
      },
      {
        "id": "cact-9-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-010",
    "displayName": "رانيا صالح",
    "phone": "+201110000009",
    "email": "user10@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance",
      "follow-up"
    ],
    "createdAt": "2025-09-10T00:00:00.000Z",
    "lastSeenAt": "2025-11-10T09:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-10"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": true,
    "lastServiceId": "cataract",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-10-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-10-2",
        "body": "Internal note 2 for cust-010.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-10-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-10-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-10-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-10-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-10T09:00:00.000Z"
      },
      {
        "id": "cact-10-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-07T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-011",
    "displayName": "Ibrahim Nasser",
    "phone": "+201210000010",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care"
    ],
    "createdAt": "2025-10-11T00:00:00.000Z",
    "lastSeenAt": "2025-11-11T10:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-11"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-11"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": false,
    "lastServiceId": "retina",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-11-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-11-2",
        "body": "Internal note 2 for cust-011.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-11-3",
        "body": "Internal note 3 for cust-011.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-11-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-11-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-11-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-11-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-11-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-11T10:00:00.000Z"
      },
      {
        "id": "cact-11-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-08T00:00:00.000Z"
      },
      {
        "id": "cact-11-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-012",
    "displayName": "دينا سمير",
    "phone": "+201510000011",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-12T00:00:00.000Z",
    "lastSeenAt": "2025-11-12T11:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-12"
      }
    ],
    "status": "inactive",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 2,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-12-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-12-2",
        "body": "Internal note 2 for cust-012.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-12-3",
        "body": "Internal note 3 for cust-012.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-12-4",
        "body": "Internal note 4 for cust-012.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-12-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-12-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-12-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-12-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-12-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-12-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-12T11:00:00.000Z"
      },
      {
        "id": "cact-12-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-09T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-013",
    "displayName": "Khalid Mansour",
    "phone": "+201010000012",
    "email": "user13@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-13T00:00:00.000Z",
    "lastSeenAt": "2025-11-13T12:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-13"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": true,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-13-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-13-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-13T12:00:00.000Z"
      },
      {
        "id": "cact-13-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-10T00:00:00.000Z"
      },
      {
        "id": "cact-13-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-014",
    "displayName": "ليلى حداد",
    "phone": "+201110000013",
    "preferredLanguage": "ar",
    "tags": [
      "flagged"
    ],
    "createdAt": "2025-10-14T00:00:00.000Z",
    "lastSeenAt": "2025-11-14T13:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-14"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": false,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-14-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-14-2",
        "body": "Internal note 2 for cust-014.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-14-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-14-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-14T13:00:00.000Z"
      },
      {
        "id": "cact-14-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-11T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-015",
    "displayName": "Fadi Kanaan",
    "phone": "+201210000014",
    "preferredLanguage": "en",
    "tags": [
      "new"
    ],
    "createdAt": "2025-11-15T00:00:00.000Z",
    "lastSeenAt": "2025-11-15T14:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-15"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": false,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-15-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-15-2",
        "body": "Internal note 2 for cust-015.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-15-3",
        "body": "Internal note 3 for cust-015.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-15-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-15-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-15-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-15T14:00:00.000Z"
      },
      {
        "id": "cact-15-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-12T00:00:00.000Z"
      },
      {
        "id": "cact-15-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-016",
    "displayName": "نور علمي",
    "phone": "+201510000015",
    "email": "user16@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "vip",
      "eye-care",
      "insurance"
    ],
    "createdAt": "2025-09-16T00:00:00.000Z",
    "lastSeenAt": "2025-11-16T15:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-16"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-16"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-16-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-16-2",
        "body": "Internal note 2 for cust-016.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-16-3",
        "body": "Internal note 3 for cust-016.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-16-4",
        "body": "Internal note 4 for cust-016.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-16-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-16-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-16-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-16-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-16T15:00:00.000Z"
      },
      {
        "id": "cact-16-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-13T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-017",
    "displayName": "Samir Qasim",
    "phone": "+201010000016",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-10-17T00:00:00.000Z",
    "lastSeenAt": "2025-11-17T16:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-17"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": true,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-17-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-17-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-17-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-17-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-17-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-17-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-17T16:00:00.000Z"
      },
      {
        "id": "cact-17-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-14T00:00:00.000Z"
      },
      {
        "id": "cact-17-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-018",
    "displayName": "هدى فارس",
    "phone": "+201110000017",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-18T00:00:00.000Z",
    "lastSeenAt": "2025-11-18T17:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-18"
      }
    ],
    "status": "blocked",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-18-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-18-2",
        "body": "Internal note 2 for cust-018.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-18-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-18-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-18-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-18-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-18-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-18-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-18T17:00:00.000Z"
      },
      {
        "id": "cact-18-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-15T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-019",
    "displayName": "Ziad Rahman",
    "phone": "+201210000018",
    "email": "user19@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance",
      "follow-up"
    ],
    "createdAt": "2025-09-19T00:00:00.000Z",
    "lastSeenAt": "2025-11-19T18:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-19"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-19-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-19-2",
        "body": "Internal note 2 for cust-019.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-19-3",
        "body": "Internal note 3 for cust-019.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-19-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-19T18:00:00.000Z"
      },
      {
        "id": "cact-19-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-16T00:00:00.000Z"
      },
      {
        "id": "cact-19-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-020",
    "displayName": "مايا حداد",
    "phone": "+201510000019",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-10-20T00:00:00.000Z",
    "lastSeenAt": "2025-11-20T19:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-20"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": false,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-20-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-20-2",
        "body": "Internal note 2 for cust-020.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-20-3",
        "body": "Internal note 3 for cust-020.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-20-4",
        "body": "Internal note 4 for cust-020.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-20-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-20-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-20T19:00:00.000Z"
      },
      {
        "id": "cact-20-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-17T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-021",
    "displayName": "Layla Hassan",
    "phone": "+201010000020",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care",
      "insurance"
    ],
    "createdAt": "2025-11-21T00:00:00.000Z",
    "lastSeenAt": "2025-11-21T00:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-21"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-21"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-21-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-21-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-21-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-21-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-21T00:00:00.000Z"
      },
      {
        "id": "cact-21-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-18T00:00:00.000Z"
      },
      {
        "id": "cact-21-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-022",
    "displayName": "عمر الفارسي",
    "phone": "+201110000021",
    "email": "user22@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "new",
      "insurance"
    ],
    "createdAt": "2025-09-22T00:00:00.000Z",
    "lastSeenAt": "2025-11-22T01:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-22"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": true,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-22-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-22-2",
        "body": "Internal note 2 for cust-022.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-22-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-22-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-22-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-22-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-22T01:00:00.000Z"
      },
      {
        "id": "cact-22-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-19T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-023",
    "displayName": "Sara Ahmed",
    "phone": "+201210000022",
    "preferredLanguage": "en",
    "tags": [],
    "createdAt": "2025-10-23T00:00:00.000Z",
    "lastSeenAt": "2025-11-23T02:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-23"
      }
    ],
    "status": "inactive",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-23-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-23-2",
        "body": "Internal note 2 for cust-023.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-23-3",
        "body": "Internal note 3 for cust-023.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-23-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-23-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-23-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-23-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-23-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-23T02:00:00.000Z"
      },
      {
        "id": "cact-23-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-20T00:00:00.000Z"
      },
      {
        "id": "cact-23-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-024",
    "displayName": "يوسف كريم",
    "phone": "+201510000023",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-24T00:00:00.000Z",
    "lastSeenAt": "2025-11-24T03:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-24"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": false,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-24-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-24-2",
        "body": "Internal note 2 for cust-024.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-24-3",
        "body": "Internal note 3 for cust-024.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-24-4",
        "body": "Internal note 4 for cust-024.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-24-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-24-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-24-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-24-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-24-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-24-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-24T03:00:00.000Z"
      },
      {
        "id": "cact-24-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-21T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-025",
    "displayName": "Nour Eid",
    "phone": "+201010000024",
    "email": "user25@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-25T00:00:00.000Z",
    "lastSeenAt": "2025-11-25T04:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-25"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": true,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-25-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-25-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-25T04:00:00.000Z"
      },
      {
        "id": "cact-25-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-22T00:00:00.000Z"
      },
      {
        "id": "cact-25-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-026",
    "displayName": "هناء مالك",
    "phone": "+201110000025",
    "preferredLanguage": "ar",
    "tags": [
      "vip",
      "eye-care"
    ],
    "createdAt": "2025-10-26T00:00:00.000Z",
    "lastSeenAt": "2025-11-26T05:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-26"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-26"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": false,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-26-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-26-2",
        "body": "Internal note 2 for cust-026.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-26-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-26-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-26T05:00:00.000Z"
      },
      {
        "id": "cact-26-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-23T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-027",
    "displayName": "Tariq Salim",
    "phone": "+201210000026",
    "preferredLanguage": "en",
    "tags": [
      "flagged"
    ],
    "createdAt": "2025-11-27T00:00:00.000Z",
    "lastSeenAt": "2025-11-27T06:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-27"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-27-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-27-2",
        "body": "Internal note 2 for cust-027.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-27-3",
        "body": "Internal note 3 for cust-027.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-27-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-27-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-27-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-27T06:00:00.000Z"
      },
      {
        "id": "cact-27-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-24T00:00:00.000Z"
      },
      {
        "id": "cact-27-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-028",
    "displayName": "مايا جوزيف",
    "phone": "+201510000027",
    "email": "user28@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance",
      "follow-up"
    ],
    "createdAt": "2025-09-28T00:00:00.000Z",
    "lastSeenAt": "2025-11-28T07:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-28"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": true,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-28-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-28-2",
        "body": "Internal note 2 for cust-028.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-28-3",
        "body": "Internal note 3 for cust-028.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-28-4",
        "body": "Internal note 4 for cust-028.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-28-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-28-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-28-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-28-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-28T07:00:00.000Z"
      },
      {
        "id": "cact-28-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-25T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-029",
    "displayName": "Adel Farouk",
    "phone": "+201010000028",
    "preferredLanguage": "en",
    "tags": [
      "new",
      "insurance"
    ],
    "createdAt": "2025-10-01T00:00:00.000Z",
    "lastSeenAt": "2025-11-01T08:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-29"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-29-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-29-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-29-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-29-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-29-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-29-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-01T08:00:00.000Z"
      },
      {
        "id": "cact-29-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-01T00:00:00.000Z"
      },
      {
        "id": "cact-29-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-030",
    "displayName": "رانيا صالح",
    "phone": "+201110000029",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-02T00:00:00.000Z",
    "lastSeenAt": "2025-11-02T09:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-30"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": false,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-30-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-30-2",
        "body": "Internal note 2 for cust-030.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-30-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-30-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-30-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-30-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-30-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-30-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-02T09:00:00.000Z"
      },
      {
        "id": "cact-30-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-031",
    "displayName": "Ibrahim Nasser",
    "phone": "+201210000030",
    "email": "user31@example.com",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care",
      "insurance"
    ],
    "createdAt": "2025-09-03T00:00:00.000Z",
    "lastSeenAt": "2025-11-03T10:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-31"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-31"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-31-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-31-2",
        "body": "Internal note 2 for cust-031.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-31-3",
        "body": "Internal note 3 for cust-031.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-31-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-03T10:00:00.000Z"
      },
      {
        "id": "cact-31-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-01T00:00:00.000Z"
      },
      {
        "id": "cact-31-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-032",
    "displayName": "دينا سمير",
    "phone": "+201510000031",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-10-04T00:00:00.000Z",
    "lastSeenAt": "2025-11-04T11:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-32"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-32-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-32-2",
        "body": "Internal note 2 for cust-032.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-32-3",
        "body": "Internal note 3 for cust-032.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-32-4",
        "body": "Internal note 4 for cust-032.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-32-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-32-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-04T11:00:00.000Z"
      },
      {
        "id": "cact-32-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-033",
    "displayName": "Khalid Mansour",
    "phone": "+201010000032",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-11-05T00:00:00.000Z",
    "lastSeenAt": "2025-11-05T12:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-33"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": true,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-33-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-33-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-33-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-33-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-05T12:00:00.000Z"
      },
      {
        "id": "cact-33-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cact-33-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-034",
    "displayName": "ليلى حداد",
    "phone": "+201110000033",
    "email": "user34@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-06T00:00:00.000Z",
    "lastSeenAt": "2025-11-06T13:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-34"
      }
    ],
    "status": "inactive",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-34-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-34-2",
        "body": "Internal note 2 for cust-034.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-34-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-34-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-34-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-34-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-06T13:00:00.000Z"
      },
      {
        "id": "cact-34-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-03T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-035",
    "displayName": "Fadi Kanaan",
    "phone": "+201210000034",
    "preferredLanguage": "en",
    "tags": [],
    "createdAt": "2025-10-07T00:00:00.000Z",
    "lastSeenAt": "2025-11-07T14:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-35"
      }
    ],
    "status": "blocked",
    "satisfaction": 5,
    "hasInsurance": false,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-35-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-35-2",
        "body": "Internal note 2 for cust-035.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-35-3",
        "body": "Internal note 3 for cust-035.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-35-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-35-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-35-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-35-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-35-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-07T14:00:00.000Z"
      },
      {
        "id": "cact-35-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cact-35-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-036",
    "displayName": "نور علمي",
    "phone": "+201510000035",
    "preferredLanguage": "ar",
    "tags": [
      "vip",
      "eye-care",
      "new"
    ],
    "createdAt": "2025-11-08T00:00:00.000Z",
    "lastSeenAt": "2025-11-08T15:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-36"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-36"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": false,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-36-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-36-2",
        "body": "Internal note 2 for cust-036.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-36-3",
        "body": "Internal note 3 for cust-036.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-36-4",
        "body": "Internal note 4 for cust-036.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-36-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-36-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-36-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-36-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-36-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-36-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-08T15:00:00.000Z"
      },
      {
        "id": "cact-36-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-05T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-037",
    "displayName": "Samir Qasim",
    "phone": "+201010000036",
    "email": "user37@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance",
      "follow-up"
    ],
    "createdAt": "2025-09-09T00:00:00.000Z",
    "lastSeenAt": "2025-11-09T16:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-37"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": true,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-37-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-37-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-09T16:00:00.000Z"
      },
      {
        "id": "cact-37-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-06T00:00:00.000Z"
      },
      {
        "id": "cact-37-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-038",
    "displayName": "هدى فارس",
    "phone": "+201110000037",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-10-10T00:00:00.000Z",
    "lastSeenAt": "2025-11-10T17:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-38"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-38-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-38-2",
        "body": "Internal note 2 for cust-038.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-38-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-38-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-10T17:00:00.000Z"
      },
      {
        "id": "cact-38-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-07T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-039",
    "displayName": "Ziad Rahman",
    "phone": "+201210000038",
    "preferredLanguage": "en",
    "tags": [],
    "createdAt": "2025-11-11T00:00:00.000Z",
    "lastSeenAt": "2025-11-11T18:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-39"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": false,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-39-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-39-2",
        "body": "Internal note 2 for cust-039.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-39-3",
        "body": "Internal note 3 for cust-039.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-39-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-39-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-39-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-11T18:00:00.000Z"
      },
      {
        "id": "cact-39-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-08T00:00:00.000Z"
      },
      {
        "id": "cact-39-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-040",
    "displayName": "مايا حداد",
    "phone": "+201510000039",
    "email": "user40@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance",
      "flagged"
    ],
    "createdAt": "2025-09-12T00:00:00.000Z",
    "lastSeenAt": "2025-11-12T19:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-40"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": true,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-40-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-40-2",
        "body": "Internal note 2 for cust-040.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-40-3",
        "body": "Internal note 3 for cust-040.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-40-4",
        "body": "Internal note 4 for cust-040.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-40-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-40-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-40-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-40-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-12T19:00:00.000Z"
      },
      {
        "id": "cact-40-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-09T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-041",
    "displayName": "Layla Hassan",
    "phone": "+201010000040",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care",
      "insurance"
    ],
    "createdAt": "2025-10-13T00:00:00.000Z",
    "lastSeenAt": "2025-11-13T00:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-41"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-41"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-41-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-41-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-41-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-41-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-41-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-41-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-13T00:00:00.000Z"
      },
      {
        "id": "cact-41-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-10T00:00:00.000Z"
      },
      {
        "id": "cact-41-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-042",
    "displayName": "عمر الفارسي",
    "phone": "+201110000041",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-14T00:00:00.000Z",
    "lastSeenAt": "2025-11-14T01:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-42"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-42-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-42-2",
        "body": "Internal note 2 for cust-042.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-42-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-42-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-42-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-42-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-42-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-42-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-14T01:00:00.000Z"
      },
      {
        "id": "cact-42-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-11T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-043",
    "displayName": "Sara Ahmed",
    "phone": "+201210000042",
    "email": "user43@example.com",
    "preferredLanguage": "en",
    "tags": [
      "new",
      "insurance"
    ],
    "createdAt": "2025-09-15T00:00:00.000Z",
    "lastSeenAt": "2025-11-15T02:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-43"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": true,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-43-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-43-2",
        "body": "Internal note 2 for cust-043.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-43-3",
        "body": "Internal note 3 for cust-043.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-43-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-15T02:00:00.000Z"
      },
      {
        "id": "cact-43-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-12T00:00:00.000Z"
      },
      {
        "id": "cact-43-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-044",
    "displayName": "يوسف كريم",
    "phone": "+201510000043",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-10-16T00:00:00.000Z",
    "lastSeenAt": "2025-11-16T03:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-44"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": false,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-44-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-44-2",
        "body": "Internal note 2 for cust-044.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-44-3",
        "body": "Internal note 3 for cust-044.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-44-4",
        "body": "Internal note 4 for cust-044.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-44-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-44-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-16T03:00:00.000Z"
      },
      {
        "id": "cact-44-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-13T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-045",
    "displayName": "Nour Eid",
    "phone": "+201010000044",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-11-17T00:00:00.000Z",
    "lastSeenAt": "2025-11-17T04:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-45"
      }
    ],
    "status": "inactive",
    "satisfaction": 5,
    "hasInsurance": true,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-45-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-45-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-45-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-45-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-17T04:00:00.000Z"
      },
      {
        "id": "cact-45-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-14T00:00:00.000Z"
      },
      {
        "id": "cact-45-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-046",
    "displayName": "هناء مالك",
    "phone": "+201110000045",
    "email": "user46@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "vip",
      "eye-care",
      "insurance",
      "follow-up"
    ],
    "createdAt": "2025-09-18T00:00:00.000Z",
    "lastSeenAt": "2025-11-18T05:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-46"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-46"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": true,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-46-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-46-2",
        "body": "Internal note 2 for cust-046.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-46-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-46-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-46-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-46-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-18T05:00:00.000Z"
      },
      {
        "id": "cact-46-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-15T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-047",
    "displayName": "Tariq Salim",
    "phone": "+201210000046",
    "preferredLanguage": "en",
    "tags": [],
    "createdAt": "2025-10-19T00:00:00.000Z",
    "lastSeenAt": "2025-11-19T06:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-47"
      }
    ],
    "status": "active",
    "satisfaction": 2,
    "hasInsurance": false,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-47-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-47-2",
        "body": "Internal note 2 for cust-047.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-47-3",
        "body": "Internal note 3 for cust-047.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-47-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-47-2",
        "kind": "receipt",
        "label": "receipt-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-47-3",
        "kind": "prescription",
        "label": "prescription-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-47-4",
        "kind": "card",
        "label": "card-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-47-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-19T06:00:00.000Z"
      },
      {
        "id": "cact-47-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-16T00:00:00.000Z"
      },
      {
        "id": "cact-47-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Laila Mansour",
      "language": "en",
      "lastIntent": "insurance_check"
    }
  },
  {
    "id": "cust-048",
    "displayName": "مايا جوزيف",
    "phone": "+201510000047",
    "preferredLanguage": "ar",
    "tags": [],
    "createdAt": "2025-11-20T00:00:00.000Z",
    "lastSeenAt": "2025-11-20T07:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-48"
      }
    ],
    "status": "active",
    "satisfaction": 3,
    "hasInsurance": false,
    "lastServiceId": "pediatric",
    "totalBookings": 1,
    "totalConversations": 1,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-48-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-48-2",
        "body": "Internal note 2 for cust-048.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-48-3",
        "body": "Internal note 3 for cust-048.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-48-4",
        "body": "Internal note 4 for cust-048.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-48-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-48-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-48-3",
        "kind": "card",
        "label": "card-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      },
      {
        "id": "catt-48-4",
        "kind": "receipt",
        "label": "receipt-4",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-04T00:00:00.000Z"
      },
      {
        "id": "catt-48-5",
        "kind": "prescription",
        "label": "prescription-5",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-05T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-48-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-20T07:00:00.000Z"
      },
      {
        "id": "cact-48-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-17T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Youssef Nabil",
      "language": "ar",
      "lastIntent": "reschedule"
    }
  },
  {
    "id": "cust-049",
    "displayName": "Adel Farouk",
    "phone": "+201010000048",
    "email": "user49@example.com",
    "preferredLanguage": "en",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-21T00:00:00.000Z",
    "lastSeenAt": "2025-11-21T08:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "ext-49"
      }
    ],
    "status": "active",
    "satisfaction": 4,
    "hasInsurance": true,
    "lastServiceId": "optics",
    "totalBookings": 1,
    "totalConversations": 0,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-49-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      }
    ],
    "attachments": [],
    "activity": [
      {
        "id": "cact-49-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-21T08:00:00.000Z"
      },
      {
        "id": "cact-49-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-18T00:00:00.000Z"
      },
      {
        "id": "cact-49-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Amira Hassan",
      "language": "en",
      "lastIntent": "results_followup"
    }
  },
  {
    "id": "cust-050",
    "displayName": "رانيا صالح",
    "phone": "+201110000049",
    "preferredLanguage": "ar",
    "tags": [
      "new"
    ],
    "createdAt": "2025-10-22T00:00:00.000Z",
    "lastSeenAt": "2025-11-22T09:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-50"
      }
    ],
    "status": "active",
    "satisfaction": 5,
    "hasInsurance": false,
    "lastServiceId": "cataract",
    "totalBookings": 1,
    "totalConversations": 0,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-50-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-50-2",
        "body": "Internal note 2 for cust-050.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-50-1",
        "kind": "card",
        "label": "card-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-50-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-22T09:00:00.000Z"
      },
      {
        "id": "cact-50-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-19T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Karim Fawzy",
      "language": "ar",
      "lastIntent": "clinic_hours"
    }
  },
  {
    "id": "cust-051",
    "displayName": "Ibrahim Nasser",
    "phone": "+201210000050",
    "preferredLanguage": "en",
    "tags": [
      "vip",
      "eye-care"
    ],
    "createdAt": "2025-11-23T00:00:00.000Z",
    "lastSeenAt": "2025-11-23T10:00:00.000Z",
    "channels": [
      {
        "channelType": "whatsapp",
        "externalId": "wa-51"
      },
      {
        "channelType": "telegram",
        "externalId": "tg-51"
      }
    ],
    "status": "active",
    "satisfaction": 1,
    "hasInsurance": false,
    "lastServiceId": "retina",
    "totalBookings": 1,
    "totalConversations": 0,
    "flagged": false,
    "notes": [
      {
        "id": "cnote-51-1",
        "body": "Prefers morning WhatsApp follow-ups.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-51-2",
        "body": "Internal note 2 for cust-051.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-51-3",
        "body": "Internal note 3 for cust-051.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-51-1",
        "kind": "receipt",
        "label": "receipt-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-51-2",
        "kind": "prescription",
        "label": "prescription-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-51-1",
        "type": "conversation",
        "title": "New conversation opened",
        "at": "2025-11-23T10:00:00.000Z"
      },
      {
        "id": "cact-51-2",
        "type": "booking",
        "title": "Appointment booking",
        "at": "2025-11-20T00:00:00.000Z"
      },
      {
        "id": "cact-51-3",
        "type": "note",
        "title": "Internal note added",
        "at": "2025-11-01T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "Prefers evening slots and appointment reminders.",
      "frequentDoctorName": "Dr. Nadia Selim",
      "language": "en",
      "lastIntent": "book_appointment"
    }
  },
  {
    "id": "cust-052",
    "displayName": "دينا سمير",
    "phone": "+201510000051",
    "email": "user52@example.com",
    "preferredLanguage": "ar",
    "tags": [
      "insurance"
    ],
    "createdAt": "2025-09-24T00:00:00.000Z",
    "lastSeenAt": "2025-11-24T11:00:00.000Z",
    "channels": [
      {
        "channelType": "telegram",
        "externalId": "ext-52"
      }
    ],
    "status": "blocked",
    "satisfaction": 2,
    "hasInsurance": true,
    "lastServiceId": "lasik",
    "totalBookings": 1,
    "totalConversations": 0,
    "flagged": true,
    "notes": [
      {
        "id": "cnote-52-1",
        "body": "يفضل التواصل صباحاً عبر واتساب.",
        "pinned": true,
        "createdAt": "2025-11-01T00:00:00.000Z",
        "updatedAt": "2025-11-02T00:00:00.000Z"
      },
      {
        "id": "cnote-52-2",
        "body": "Internal note 2 for cust-052.",
        "pinned": false,
        "createdAt": "2025-11-02T00:00:00.000Z",
        "updatedAt": "2025-11-03T00:00:00.000Z"
      },
      {
        "id": "cnote-52-3",
        "body": "Internal note 3 for cust-052.",
        "pinned": false,
        "createdAt": "2025-11-03T00:00:00.000Z",
        "updatedAt": "2025-11-04T00:00:00.000Z"
      },
      {
        "id": "cnote-52-4",
        "body": "Internal note 4 for cust-052.",
        "pinned": false,
        "createdAt": "2025-11-04T00:00:00.000Z",
        "updatedAt": "2025-11-05T00:00:00.000Z"
      }
    ],
    "attachments": [
      {
        "id": "catt-52-1",
        "kind": "prescription",
        "label": "prescription-1",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-01T00:00:00.000Z"
      },
      {
        "id": "catt-52-2",
        "kind": "card",
        "label": "card-2",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-02T00:00:00.000Z"
      },
      {
        "id": "catt-52-3",
        "kind": "receipt",
        "label": "receipt-3",
        "url": "/brand/icon.png",
        "createdAt": "2025-10-03T00:00:00.000Z"
      }
    ],
    "activity": [
      {
        "id": "cact-52-1",
        "type": "conversation",
        "title": "محادثة جديدة",
        "at": "2025-11-24T11:00:00.000Z"
      },
      {
        "id": "cact-52-2",
        "type": "booking",
        "title": "حجز موعد",
        "at": "2025-11-21T00:00:00.000Z"
      }
    ],
    "aiProfile": {
      "preferences": "يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.",
      "frequentDoctorName": "Dr. Omar Farid",
      "language": "ar",
      "lastIntent": "insurance_check"
    }
  }
] as Customer[]

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    "id": "conv-001",
    "customerId": "cust-001",
    "customerName": "Layla Hassan",
    "channelType": "whatsapp",
    "status": "open",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T00:00:00.000Z",
    "unreadCount": 0,
    "escalationId": "esc-001",
    "lastMessagePreview": "Can I book a retina check this week?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "retina",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaDueAt": "2025-11-12T01:00:00.000Z",
    "slaTone": "critical",
    "isTyping": true,
    "locale": "en"
  },
  {
    "id": "conv-002",
    "customerId": "cust-002",
    "customerName": "عمر الفارسي",
    "channelType": "telegram",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T01:07:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "كم تكلفة عملية الليزك؟",
    "serviceId": "lasik",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-003",
    "customerId": "cust-003",
    "customerName": "Sara Ahmed",
    "channelType": "whatsapp",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T02:14:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Reschedule my pediatric eye exam",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-004",
    "customerId": "cust-004",
    "customerName": "يوسف كريم",
    "channelType": "telegram",
    "status": "resolved",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T03:21:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "serviceId": "optics",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-005",
    "customerId": "cust-005",
    "customerName": "Nour Eid",
    "channelType": "whatsapp",
    "status": "archived",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T04:28:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Where is the Riyadh clinic and Friday hours?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "cataract",
    "tags": [
      "follow-up"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-006",
    "customerId": "cust-006",
    "customerName": "هناء مالك",
    "channelType": "telegram",
    "status": "open",
    "handler": "unassigned",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T05:35:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "أريد موعداً لفحص الشبكية غداً",
    "serviceId": "retina",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-007",
    "customerId": "cust-007",
    "customerName": "Tariq Salim",
    "channelType": "whatsapp",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T06:42:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Need LASIK pricing and available surgeons",
    "serviceId": "lasik",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-008",
    "customerId": "cust-008",
    "customerName": "مايا جوزيف",
    "channelType": "telegram",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T07:49:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "أحتاج إعادة جدولة موعد طفلتي",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-009",
    "customerId": "cust-009",
    "customerName": "Adel Farouk",
    "channelType": "whatsapp",
    "status": "resolved",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T08:56:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Insurance card attached — please confirm coverage",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "optics",
    "tags": [
      "new"
    ],
    "slaDueAt": "2025-11-12T09:00:00.000Z",
    "slaTone": "warning",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-010",
    "customerId": "cust-010",
    "customerName": "رانيا صالح",
    "channelType": "telegram",
    "status": "archived",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T09:03:00.000Z",
    "unreadCount": 2,
    "escalationId": "esc-010",
    "lastMessagePreview": "هل العيادة مفتوحة يوم الجمعة؟",
    "serviceId": "cataract",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-011",
    "customerId": "cust-011",
    "customerName": "Ibrahim Nasser",
    "channelType": "whatsapp",
    "status": "open",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T10:10:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "Can I book a retina check this week?",
    "serviceId": "retina",
    "tags": [
      "follow-up"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-012",
    "customerId": "cust-012",
    "customerName": "دينا سمير",
    "channelType": "telegram",
    "status": "waiting_human",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T11:17:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "كم تكلفة عملية الليزك؟",
    "serviceId": "lasik",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-013",
    "customerId": "cust-013",
    "customerName": "Khalid Mansour",
    "channelType": "whatsapp",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T12:24:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Reschedule my pediatric eye exam",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-014",
    "customerId": "cust-014",
    "customerName": "ليلى حداد",
    "channelType": "telegram",
    "status": "resolved",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T13:31:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "optics",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-015",
    "customerId": "cust-015",
    "customerName": "Fadi Kanaan",
    "channelType": "whatsapp",
    "status": "archived",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T14:38:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Where is the Riyadh clinic and Friday hours?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "cataract",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-016",
    "customerId": "cust-016",
    "customerName": "نور علمي",
    "channelType": "telegram",
    "status": "open",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T15:45:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "أريد موعداً لفحص الشبكية غداً",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "retina",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-017",
    "customerId": "cust-017",
    "customerName": "Samir Qasim",
    "channelType": "whatsapp",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T16:52:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Need LASIK pricing and available surgeons",
    "serviceId": "lasik",
    "tags": [
      "follow-up"
    ],
    "slaDueAt": "2025-11-12T17:00:00.000Z",
    "slaTone": "warning",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-018",
    "customerId": "cust-018",
    "customerName": "هدى فارس",
    "channelType": "telegram",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T17:59:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "أحتاج إعادة جدولة موعد طفلتي",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "urgent"
    ],
    "slaDueAt": "2025-11-12T18:00:00.000Z",
    "slaTone": "critical",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-019",
    "customerId": "cust-019",
    "customerName": "Ziad Rahman",
    "channelType": "whatsapp",
    "status": "resolved",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T18:06:00.000Z",
    "unreadCount": 3,
    "escalationId": "esc-019",
    "lastMessagePreview": "Insurance card attached — please confirm coverage",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "optics",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-020",
    "customerId": "cust-020",
    "customerName": "مايا حداد",
    "channelType": "telegram",
    "status": "archived",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T19:13:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "هل العيادة مفتوحة يوم الجمعة؟",
    "serviceId": "cataract",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-021",
    "customerId": "cust-021",
    "customerName": "Layla Hassan",
    "channelType": "whatsapp",
    "status": "open",
    "handler": "unassigned",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T20:20:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "Can I book a retina check this week?",
    "serviceId": "retina",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-022",
    "customerId": "cust-022",
    "customerName": "عمر الفارسي",
    "channelType": "telegram",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T21:27:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "كم تكلفة عملية الليزك؟",
    "serviceId": "lasik",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-023",
    "customerId": "cust-023",
    "customerName": "Sara Ahmed",
    "channelType": "whatsapp",
    "status": "ai_active",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T22:34:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Reschedule my pediatric eye exam",
    "serviceId": "pediatric",
    "tags": [
      "follow-up"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-024",
    "customerId": "cust-024",
    "customerName": "يوسف كريم",
    "channelType": "telegram",
    "status": "resolved",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T23:41:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "serviceId": "optics",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-025",
    "customerId": "cust-025",
    "customerName": "Nour Eid",
    "channelType": "whatsapp",
    "status": "archived",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T00:48:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Where is the Riyadh clinic and Friday hours?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "cataract",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaDueAt": "2025-11-12T01:00:00.000Z",
    "slaTone": "warning",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-026",
    "customerId": "cust-026",
    "customerName": "هناء مالك",
    "channelType": "telegram",
    "status": "open",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T01:55:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "أريد موعداً لفحص الشبكية غداً",
    "serviceId": "retina",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-027",
    "customerId": "cust-027",
    "customerName": "Tariq Salim",
    "channelType": "whatsapp",
    "status": "waiting_human",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T02:02:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Need LASIK pricing and available surgeons",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "lasik",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-028",
    "customerId": "cust-028",
    "customerName": "مايا جوزيف",
    "channelType": "telegram",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T03:09:00.000Z",
    "unreadCount": 4,
    "escalationId": "esc-028",
    "lastMessagePreview": "أحتاج إعادة جدولة موعد طفلتي",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-029",
    "customerId": "cust-029",
    "customerName": "Adel Farouk",
    "channelType": "whatsapp",
    "status": "resolved",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T04:16:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Insurance card attached — please confirm coverage",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "optics",
    "tags": [
      "follow-up"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-030",
    "customerId": "cust-030",
    "customerName": "رانيا صالح",
    "channelType": "telegram",
    "status": "archived",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T05:23:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "هل العيادة مفتوحة يوم الجمعة؟",
    "serviceId": "cataract",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-031",
    "customerId": "cust-031",
    "customerName": "Ibrahim Nasser",
    "channelType": "whatsapp",
    "status": "open",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T06:30:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "Can I book a retina check this week?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "retina",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": true,
    "locale": "en"
  },
  {
    "id": "conv-032",
    "customerId": "cust-032",
    "customerName": "دينا سمير",
    "channelType": "telegram",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T07:37:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "كم تكلفة عملية الليزك؟",
    "serviceId": "lasik",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-033",
    "customerId": "cust-033",
    "customerName": "Khalid Mansour",
    "channelType": "whatsapp",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T08:44:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Reschedule my pediatric eye exam",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "new"
    ],
    "slaDueAt": "2025-11-12T09:00:00.000Z",
    "slaTone": "warning",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-034",
    "customerId": "cust-034",
    "customerName": "ليلى حداد",
    "channelType": "telegram",
    "status": "resolved",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T09:51:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "serviceId": "optics",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-035",
    "customerId": "cust-035",
    "customerName": "Fadi Kanaan",
    "channelType": "whatsapp",
    "status": "archived",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T10:58:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Where is the Riyadh clinic and Friday hours?",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "cataract",
    "tags": [
      "follow-up"
    ],
    "slaDueAt": "2025-11-12T11:00:00.000Z",
    "slaTone": "critical",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-036",
    "customerId": "cust-036",
    "customerName": "نور علمي",
    "channelType": "telegram",
    "status": "open",
    "handler": "unassigned",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T11:05:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "أريد موعداً لفحص الشبكية غداً",
    "serviceId": "retina",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-037",
    "customerId": "cust-037",
    "customerName": "Samir Qasim",
    "channelType": "whatsapp",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T12:12:00.000Z",
    "unreadCount": 1,
    "escalationId": "esc-002",
    "lastMessagePreview": "Need LASIK pricing and available surgeons",
    "serviceId": "lasik",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-038",
    "customerId": "cust-038",
    "customerName": "هدى فارس",
    "channelType": "telegram",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T13:19:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "أحتاج إعادة جدولة موعد طفلتي",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-039",
    "customerId": "cust-039",
    "customerName": "Ziad Rahman",
    "channelType": "whatsapp",
    "status": "resolved",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T14:26:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Insurance card attached — please confirm coverage",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "optics",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-040",
    "customerId": "cust-040",
    "customerName": "مايا حداد",
    "channelType": "telegram",
    "status": "archived",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T15:33:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "هل العيادة مفتوحة يوم الجمعة؟",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "cataract",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-041",
    "customerId": "cust-041",
    "customerName": "Layla Hassan",
    "channelType": "whatsapp",
    "status": "open",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T16:40:00.000Z",
    "unreadCount": 0,
    "lastMessagePreview": "Can I book a retina check this week?",
    "serviceId": "retina",
    "tags": [
      "follow-up"
    ],
    "slaDueAt": "2025-11-12T17:00:00.000Z",
    "slaTone": "warning",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-042",
    "customerId": "cust-042",
    "customerName": "عمر الفارسي",
    "channelType": "telegram",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T17:47:00.000Z",
    "unreadCount": 2,
    "lastMessagePreview": "كم تكلفة عملية الليزك؟",
    "serviceId": "lasik",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-043",
    "customerId": "cust-043",
    "customerName": "Sara Ahmed",
    "channelType": "whatsapp",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T18:54:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Reschedule my pediatric eye exam",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "vip",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-044",
    "customerId": "cust-044",
    "customerName": "يوسف كريم",
    "channelType": "telegram",
    "status": "resolved",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Reschedule",
    "lastMessageAt": "2025-11-12T19:01:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "serviceId": "optics",
    "tags": [
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-045",
    "customerId": "cust-045",
    "customerName": "Nour Eid",
    "channelType": "whatsapp",
    "status": "archived",
    "handler": "human",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "subject": "Clinic hours",
    "lastMessageAt": "2025-11-12T20:08:00.000Z",
    "unreadCount": 1,
    "lastMessagePreview": "Where is the Riyadh clinic and Friday hours?",
    "serviceId": "cataract",
    "tags": [
      "new"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-046",
    "customerId": "cust-046",
    "customerName": "هناء مالك",
    "channelType": "telegram",
    "status": "open",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "Appointment booking",
    "lastMessageAt": "2025-11-12T21:15:00.000Z",
    "unreadCount": 0,
    "escalationId": "esc-011",
    "lastMessagePreview": "أريد موعداً لفحص الشبكية غداً",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "retina",
    "tags": [
      "insurance",
      "eye-care"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  },
  {
    "id": "conv-047",
    "customerId": "cust-047",
    "customerName": "Tariq Salim",
    "channelType": "whatsapp",
    "status": "waiting_human",
    "handler": "unassigned",
    "subject": "Insurance coverage",
    "lastMessageAt": "2025-11-12T22:22:00.000Z",
    "unreadCount": 3,
    "lastMessagePreview": "Need LASIK pricing and available surgeons",
    "serviceId": "lasik",
    "tags": [
      "follow-up"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "en"
  },
  {
    "id": "conv-048",
    "customerId": "cust-048",
    "customerName": "مايا جوزيف",
    "channelType": "telegram",
    "status": "ai_active",
    "handler": "ai",
    "agentId": "agent-eye-care",
    "subject": "LASIK inquiry",
    "lastMessageAt": "2025-11-12T23:29:00.000Z",
    "unreadCount": 4,
    "lastMessagePreview": "أحتاج إعادة جدولة موعد طفلتي",
    "aiReasoning": "User intent: book_appointment. Suggested slot search via check_availability.",
    "serviceId": "pediatric",
    "tags": [
      "urgent"
    ],
    "slaTone": "ok",
    "isTyping": false,
    "locale": "ar"
  }
] as Conversation[]

export const SEED_MESSAGES: Message[] = [
  {
    "id": "msg-conv-001-0",
    "conversationId": "conv-001",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Can I book a retina check this week?",
    "sentAt": "2025-11-12T00:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-001-1",
    "conversationId": "conv-001",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T00:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-001-2",
    "conversationId": "conv-001",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for retina care",
    "sentAt": "2025-11-12T00:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-001-3",
    "conversationId": "conv-001",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T00:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-001-4",
    "conversationId": "conv-001",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T00:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-001.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-002-0",
    "conversationId": "conv-002",
    "direction": "inbound",
    "senderType": "customer",
    "body": "كم تكلفة عملية الليزك؟",
    "sentAt": "2025-11-12T01:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-002-1",
    "conversationId": "conv-002",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T01:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-002-2",
    "conversationId": "conv-002",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة lasik",
    "sentAt": "2025-11-12T01:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-002-3",
    "conversationId": "conv-002",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T01:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-002-4",
    "conversationId": "conv-002",
    "direction": "outbound",
    "senderType": "system",
    "body": "تم تحويل المحادثة إلى العقود",
    "sentAt": "2025-11-12T01:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-003-0",
    "conversationId": "conv-003",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Reschedule my pediatric eye exam",
    "sentAt": "2025-11-12T02:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-003-1",
    "conversationId": "conv-003",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T02:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-003-2",
    "conversationId": "conv-003",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for pediatric care",
    "sentAt": "2025-11-12T02:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-003-3",
    "conversationId": "conv-003",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T02:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-004-0",
    "conversationId": "conv-004",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "sentAt": "2025-11-12T03:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-004-1",
    "conversationId": "conv-004",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T03:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-004-2",
    "conversationId": "conv-004",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة optics",
    "sentAt": "2025-11-12T03:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-004-3",
    "conversationId": "conv-004",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T03:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-004-4",
    "conversationId": "conv-004",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T03:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-004.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-004-5",
    "conversationId": "conv-004",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T03:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-004-6",
    "conversationId": "conv-004",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T03:09:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-005-0",
    "conversationId": "conv-005",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Where is the Riyadh clinic and Friday hours?",
    "sentAt": "2025-11-12T04:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-005-1",
    "conversationId": "conv-005",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T04:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-005-2",
    "conversationId": "conv-005",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for cataract care",
    "sentAt": "2025-11-12T04:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-005-3",
    "conversationId": "conv-005",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T04:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-006-0",
    "conversationId": "conv-006",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أريد موعداً لفحص الشبكية غداً",
    "sentAt": "2025-11-12T05:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-006-1",
    "conversationId": "conv-006",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T05:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-006-2",
    "conversationId": "conv-006",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة retina",
    "sentAt": "2025-11-12T05:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-006-3",
    "conversationId": "conv-006",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T05:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-007-0",
    "conversationId": "conv-007",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Need LASIK pricing and available surgeons",
    "sentAt": "2025-11-12T06:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-007-1",
    "conversationId": "conv-007",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T06:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-007-2",
    "conversationId": "conv-007",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for lasik care",
    "sentAt": "2025-11-12T06:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-007-3",
    "conversationId": "conv-007",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T06:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-007-4",
    "conversationId": "conv-007",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T06:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-007.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-007-5",
    "conversationId": "conv-007",
    "direction": "outbound",
    "senderType": "system",
    "body": "AI handed off to Contracts",
    "sentAt": "2025-11-12T06:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-008-0",
    "conversationId": "conv-008",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أحتاج إعادة جدولة موعد طفلتي",
    "sentAt": "2025-11-12T07:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-008-1",
    "conversationId": "conv-008",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T07:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-008-2",
    "conversationId": "conv-008",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة pediatric",
    "sentAt": "2025-11-12T07:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-008-3",
    "conversationId": "conv-008",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T07:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-009-0",
    "conversationId": "conv-009",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Insurance card attached — please confirm coverage",
    "sentAt": "2025-11-12T08:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-009-1",
    "conversationId": "conv-009",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T08:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-009-2",
    "conversationId": "conv-009",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for optics care",
    "sentAt": "2025-11-12T08:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-009-3",
    "conversationId": "conv-009",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T08:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-010-0",
    "conversationId": "conv-010",
    "direction": "inbound",
    "senderType": "customer",
    "body": "هل العيادة مفتوحة يوم الجمعة؟",
    "sentAt": "2025-11-12T09:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-010-1",
    "conversationId": "conv-010",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T09:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-010-2",
    "conversationId": "conv-010",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة cataract",
    "sentAt": "2025-11-12T09:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-010-3",
    "conversationId": "conv-010",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T09:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-010-4",
    "conversationId": "conv-010",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T09:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-010.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-010-5",
    "conversationId": "conv-010",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T09:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-010-6",
    "conversationId": "conv-010",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T09:09:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-011-0",
    "conversationId": "conv-011",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Can I book a retina check this week?",
    "sentAt": "2025-11-12T10:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-011-1",
    "conversationId": "conv-011",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T10:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-011-2",
    "conversationId": "conv-011",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for retina care",
    "sentAt": "2025-11-12T10:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-011-3",
    "conversationId": "conv-011",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T10:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-011-4",
    "conversationId": "conv-011",
    "direction": "outbound",
    "senderType": "system",
    "body": "Ahmed took over",
    "sentAt": "2025-11-12T10:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-011-5",
    "conversationId": "conv-011",
    "direction": "outbound",
    "senderType": "agent",
    "body": "Hello, I'm Ahmed from i-care. I'll finish the booking with you.",
    "sentAt": "2025-11-12T10:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-012-0",
    "conversationId": "conv-012",
    "direction": "inbound",
    "senderType": "customer",
    "body": "كم تكلفة عملية الليزك؟",
    "sentAt": "2025-11-12T11:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-012-1",
    "conversationId": "conv-012",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T11:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-012-2",
    "conversationId": "conv-012",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة lasik",
    "sentAt": "2025-11-12T11:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-012-3",
    "conversationId": "conv-012",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T11:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-012-4",
    "conversationId": "conv-012",
    "direction": "outbound",
    "senderType": "system",
    "body": "تم تحويل المحادثة إلى العقود",
    "sentAt": "2025-11-12T11:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-012-5",
    "conversationId": "conv-012",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T11:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-013-0",
    "conversationId": "conv-013",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Reschedule my pediatric eye exam",
    "sentAt": "2025-11-12T12:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-013-1",
    "conversationId": "conv-013",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T12:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-013-2",
    "conversationId": "conv-013",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for pediatric care",
    "sentAt": "2025-11-12T12:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-013-3",
    "conversationId": "conv-013",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T12:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-013-4",
    "conversationId": "conv-013",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T12:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-013.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-014-0",
    "conversationId": "conv-014",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "sentAt": "2025-11-12T13:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-014-1",
    "conversationId": "conv-014",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T13:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-014-2",
    "conversationId": "conv-014",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة optics",
    "sentAt": "2025-11-12T13:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-014-3",
    "conversationId": "conv-014",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T13:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-015-0",
    "conversationId": "conv-015",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Where is the Riyadh clinic and Friday hours?",
    "sentAt": "2025-11-12T14:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-015-1",
    "conversationId": "conv-015",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T14:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-015-2",
    "conversationId": "conv-015",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for cataract care",
    "sentAt": "2025-11-12T14:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-015-3",
    "conversationId": "conv-015",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T14:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-016-0",
    "conversationId": "conv-016",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أريد موعداً لفحص الشبكية غداً",
    "sentAt": "2025-11-12T15:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-016-1",
    "conversationId": "conv-016",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T15:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-016-2",
    "conversationId": "conv-016",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة retina",
    "sentAt": "2025-11-12T15:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-016-3",
    "conversationId": "conv-016",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T15:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-016-4",
    "conversationId": "conv-016",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T15:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-016.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-017-0",
    "conversationId": "conv-017",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Need LASIK pricing and available surgeons",
    "sentAt": "2025-11-12T16:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-017-1",
    "conversationId": "conv-017",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T16:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-017-2",
    "conversationId": "conv-017",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for lasik care",
    "sentAt": "2025-11-12T16:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-017-3",
    "conversationId": "conv-017",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T16:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-017-4",
    "conversationId": "conv-017",
    "direction": "outbound",
    "senderType": "system",
    "body": "AI handed off to Contracts",
    "sentAt": "2025-11-12T16:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-018-0",
    "conversationId": "conv-018",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أحتاج إعادة جدولة موعد طفلتي",
    "sentAt": "2025-11-12T17:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-018-1",
    "conversationId": "conv-018",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T17:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-018-2",
    "conversationId": "conv-018",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة pediatric",
    "sentAt": "2025-11-12T17:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-018-3",
    "conversationId": "conv-018",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T17:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-019-0",
    "conversationId": "conv-019",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Insurance card attached — please confirm coverage",
    "sentAt": "2025-11-12T18:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-019-1",
    "conversationId": "conv-019",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T18:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-019-2",
    "conversationId": "conv-019",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for optics care",
    "sentAt": "2025-11-12T18:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-019-3",
    "conversationId": "conv-019",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T18:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-019-4",
    "conversationId": "conv-019",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T18:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-019.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-020-0",
    "conversationId": "conv-020",
    "direction": "inbound",
    "senderType": "customer",
    "body": "هل العيادة مفتوحة يوم الجمعة؟",
    "sentAt": "2025-11-12T19:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-020-1",
    "conversationId": "conv-020",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T19:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-020-2",
    "conversationId": "conv-020",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة cataract",
    "sentAt": "2025-11-12T19:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-020-3",
    "conversationId": "conv-020",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T19:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-020-4",
    "conversationId": "conv-020",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T19:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-020-5",
    "conversationId": "conv-020",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T19:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-021-0",
    "conversationId": "conv-021",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Can I book a retina check this week?",
    "sentAt": "2025-11-12T00:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-021-1",
    "conversationId": "conv-021",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T00:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-021-2",
    "conversationId": "conv-021",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for retina care",
    "sentAt": "2025-11-12T00:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-021-3",
    "conversationId": "conv-021",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T00:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-022-0",
    "conversationId": "conv-022",
    "direction": "inbound",
    "senderType": "customer",
    "body": "كم تكلفة عملية الليزك؟",
    "sentAt": "2025-11-12T01:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-022-1",
    "conversationId": "conv-022",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T01:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-022-2",
    "conversationId": "conv-022",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة lasik",
    "sentAt": "2025-11-12T01:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-022-3",
    "conversationId": "conv-022",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T01:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-022-4",
    "conversationId": "conv-022",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T01:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-022.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-022-5",
    "conversationId": "conv-022",
    "direction": "outbound",
    "senderType": "system",
    "body": "تم تحويل المحادثة إلى العقود",
    "sentAt": "2025-11-12T01:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-023-0",
    "conversationId": "conv-023",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Reschedule my pediatric eye exam",
    "sentAt": "2025-11-12T02:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-023-1",
    "conversationId": "conv-023",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T02:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-023-2",
    "conversationId": "conv-023",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for pediatric care",
    "sentAt": "2025-11-12T02:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-023-3",
    "conversationId": "conv-023",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T02:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-023-4",
    "conversationId": "conv-023",
    "direction": "outbound",
    "senderType": "system",
    "body": "Ahmed took over",
    "sentAt": "2025-11-12T02:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-023-5",
    "conversationId": "conv-023",
    "direction": "outbound",
    "senderType": "agent",
    "body": "Hello, I'm Ahmed from i-care. I'll finish the booking with you.",
    "sentAt": "2025-11-12T02:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-024-0",
    "conversationId": "conv-024",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "sentAt": "2025-11-12T03:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-024-1",
    "conversationId": "conv-024",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T03:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-024-2",
    "conversationId": "conv-024",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة optics",
    "sentAt": "2025-11-12T03:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-024-3",
    "conversationId": "conv-024",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T03:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-024-4",
    "conversationId": "conv-024",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T03:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-024-5",
    "conversationId": "conv-024",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T03:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-025-0",
    "conversationId": "conv-025",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Where is the Riyadh clinic and Friday hours?",
    "sentAt": "2025-11-12T04:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-025-1",
    "conversationId": "conv-025",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T04:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-025-2",
    "conversationId": "conv-025",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for cataract care",
    "sentAt": "2025-11-12T04:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-025-3",
    "conversationId": "conv-025",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T04:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-025-4",
    "conversationId": "conv-025",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T04:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-025.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-026-0",
    "conversationId": "conv-026",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أريد موعداً لفحص الشبكية غداً",
    "sentAt": "2025-11-12T05:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-026-1",
    "conversationId": "conv-026",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T05:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-026-2",
    "conversationId": "conv-026",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة retina",
    "sentAt": "2025-11-12T05:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-026-3",
    "conversationId": "conv-026",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T05:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-026-4",
    "conversationId": "conv-026",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T05:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-026-5",
    "conversationId": "conv-026",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T05:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-027-0",
    "conversationId": "conv-027",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Need LASIK pricing and available surgeons",
    "sentAt": "2025-11-12T06:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-027-1",
    "conversationId": "conv-027",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T06:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-027-2",
    "conversationId": "conv-027",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for lasik care",
    "sentAt": "2025-11-12T06:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-027-3",
    "conversationId": "conv-027",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T06:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-027-4",
    "conversationId": "conv-027",
    "direction": "outbound",
    "senderType": "system",
    "body": "AI handed off to Contracts",
    "sentAt": "2025-11-12T06:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-028-0",
    "conversationId": "conv-028",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أحتاج إعادة جدولة موعد طفلتي",
    "sentAt": "2025-11-12T07:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-028-1",
    "conversationId": "conv-028",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T07:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-028-2",
    "conversationId": "conv-028",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة pediatric",
    "sentAt": "2025-11-12T07:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-028-3",
    "conversationId": "conv-028",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T07:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-028-4",
    "conversationId": "conv-028",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T07:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-028.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-029-0",
    "conversationId": "conv-029",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Insurance card attached — please confirm coverage",
    "sentAt": "2025-11-12T08:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-029-1",
    "conversationId": "conv-029",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T08:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-029-2",
    "conversationId": "conv-029",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for optics care",
    "sentAt": "2025-11-12T08:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-029-3",
    "conversationId": "conv-029",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T08:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-030-0",
    "conversationId": "conv-030",
    "direction": "inbound",
    "senderType": "customer",
    "body": "هل العيادة مفتوحة يوم الجمعة؟",
    "sentAt": "2025-11-12T09:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-030-1",
    "conversationId": "conv-030",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T09:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-030-2",
    "conversationId": "conv-030",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة cataract",
    "sentAt": "2025-11-12T09:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-030-3",
    "conversationId": "conv-030",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T09:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-030-4",
    "conversationId": "conv-030",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T09:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-030-5",
    "conversationId": "conv-030",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T09:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-031-0",
    "conversationId": "conv-031",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Can I book a retina check this week?",
    "sentAt": "2025-11-12T10:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-031-1",
    "conversationId": "conv-031",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T10:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-031-2",
    "conversationId": "conv-031",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for retina care",
    "sentAt": "2025-11-12T10:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-031-3",
    "conversationId": "conv-031",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T10:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-031-4",
    "conversationId": "conv-031",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T10:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-031.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-032-0",
    "conversationId": "conv-032",
    "direction": "inbound",
    "senderType": "customer",
    "body": "كم تكلفة عملية الليزك؟",
    "sentAt": "2025-11-12T11:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-032-1",
    "conversationId": "conv-032",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T11:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-032-2",
    "conversationId": "conv-032",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة lasik",
    "sentAt": "2025-11-12T11:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-032-3",
    "conversationId": "conv-032",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T11:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-032-4",
    "conversationId": "conv-032",
    "direction": "outbound",
    "senderType": "system",
    "body": "تم تحويل المحادثة إلى العقود",
    "sentAt": "2025-11-12T11:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-033-0",
    "conversationId": "conv-033",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Reschedule my pediatric eye exam",
    "sentAt": "2025-11-12T12:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-033-1",
    "conversationId": "conv-033",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T12:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-033-2",
    "conversationId": "conv-033",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for pediatric care",
    "sentAt": "2025-11-12T12:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-033-3",
    "conversationId": "conv-033",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T12:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-034-0",
    "conversationId": "conv-034",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "sentAt": "2025-11-12T13:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-034-1",
    "conversationId": "conv-034",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T13:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-034-2",
    "conversationId": "conv-034",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة optics",
    "sentAt": "2025-11-12T13:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-034-3",
    "conversationId": "conv-034",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T13:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-034-4",
    "conversationId": "conv-034",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T13:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-034.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-034-5",
    "conversationId": "conv-034",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T13:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-034-6",
    "conversationId": "conv-034",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T13:09:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-035-0",
    "conversationId": "conv-035",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Where is the Riyadh clinic and Friday hours?",
    "sentAt": "2025-11-12T14:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-035-1",
    "conversationId": "conv-035",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T14:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-035-2",
    "conversationId": "conv-035",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for cataract care",
    "sentAt": "2025-11-12T14:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-035-3",
    "conversationId": "conv-035",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T14:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-036-0",
    "conversationId": "conv-036",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أريد موعداً لفحص الشبكية غداً",
    "sentAt": "2025-11-12T15:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-036-1",
    "conversationId": "conv-036",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T15:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-036-2",
    "conversationId": "conv-036",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة retina",
    "sentAt": "2025-11-12T15:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-036-3",
    "conversationId": "conv-036",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T15:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-037-0",
    "conversationId": "conv-037",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Need LASIK pricing and available surgeons",
    "sentAt": "2025-11-12T16:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-037-1",
    "conversationId": "conv-037",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T16:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-037-2",
    "conversationId": "conv-037",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for lasik care",
    "sentAt": "2025-11-12T16:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-037-3",
    "conversationId": "conv-037",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T16:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-037-4",
    "conversationId": "conv-037",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T16:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-037.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-037-5",
    "conversationId": "conv-037",
    "direction": "outbound",
    "senderType": "system",
    "body": "AI handed off to Contracts",
    "sentAt": "2025-11-12T16:07:30.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-038-0",
    "conversationId": "conv-038",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أحتاج إعادة جدولة موعد طفلتي",
    "sentAt": "2025-11-12T17:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-038-1",
    "conversationId": "conv-038",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T17:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-038-2",
    "conversationId": "conv-038",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة pediatric",
    "sentAt": "2025-11-12T17:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-038-3",
    "conversationId": "conv-038",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T17:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-039-0",
    "conversationId": "conv-039",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Insurance card attached — please confirm coverage",
    "sentAt": "2025-11-12T18:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-039-1",
    "conversationId": "conv-039",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T18:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-039-2",
    "conversationId": "conv-039",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for optics care",
    "sentAt": "2025-11-12T18:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-039-3",
    "conversationId": "conv-039",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T18:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-040-0",
    "conversationId": "conv-040",
    "direction": "inbound",
    "senderType": "customer",
    "body": "هل العيادة مفتوحة يوم الجمعة؟",
    "sentAt": "2025-11-12T19:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-040-1",
    "conversationId": "conv-040",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T19:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-040-2",
    "conversationId": "conv-040",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة cataract",
    "sentAt": "2025-11-12T19:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-040-3",
    "conversationId": "conv-040",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T19:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-040-4",
    "conversationId": "conv-040",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T19:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-040.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-041-0",
    "conversationId": "conv-041",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Can I book a retina check this week?",
    "sentAt": "2025-11-12T00:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-041-1",
    "conversationId": "conv-041",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T00:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-041-2",
    "conversationId": "conv-041",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for retina care",
    "sentAt": "2025-11-12T00:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-041-3",
    "conversationId": "conv-041",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T00:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-041-4",
    "conversationId": "conv-041",
    "direction": "outbound",
    "senderType": "system",
    "body": "Ahmed took over",
    "sentAt": "2025-11-12T00:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-041-5",
    "conversationId": "conv-041",
    "direction": "outbound",
    "senderType": "agent",
    "body": "Hello, I'm Ahmed from i-care. I'll finish the booking with you.",
    "sentAt": "2025-11-12T00:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-042-0",
    "conversationId": "conv-042",
    "direction": "inbound",
    "senderType": "customer",
    "body": "كم تكلفة عملية الليزك؟",
    "sentAt": "2025-11-12T01:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-042-1",
    "conversationId": "conv-042",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T01:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-042-2",
    "conversationId": "conv-042",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة lasik",
    "sentAt": "2025-11-12T01:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-042-3",
    "conversationId": "conv-042",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T01:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-042-4",
    "conversationId": "conv-042",
    "direction": "outbound",
    "senderType": "system",
    "body": "تم تحويل المحادثة إلى العقود",
    "sentAt": "2025-11-12T01:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-043-0",
    "conversationId": "conv-043",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Reschedule my pediatric eye exam",
    "sentAt": "2025-11-12T02:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-043-1",
    "conversationId": "conv-043",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T02:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-043-2",
    "conversationId": "conv-043",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for pediatric care",
    "sentAt": "2025-11-12T02:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-043-3",
    "conversationId": "conv-043",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T02:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-043-4",
    "conversationId": "conv-043",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Attached prescription",
    "sentAt": "2025-11-12T02:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-043.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-044-0",
    "conversationId": "conv-044",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أرسلت بطاقة التأمين — هل التغطية سارية؟",
    "sentAt": "2025-11-12T03:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-044-1",
    "conversationId": "conv-044",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T03:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-044-2",
    "conversationId": "conv-044",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة optics",
    "sentAt": "2025-11-12T03:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-044-3",
    "conversationId": "conv-044",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T03:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-044-4",
    "conversationId": "conv-044",
    "direction": "outbound",
    "senderType": "system",
    "body": "تولى أحمد المحادثة",
    "sentAt": "2025-11-12T03:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-044-5",
    "conversationId": "conv-044",
    "direction": "outbound",
    "senderType": "agent",
    "body": "مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.",
    "sentAt": "2025-11-12T03:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-045-0",
    "conversationId": "conv-045",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Where is the Riyadh clinic and Friday hours?",
    "sentAt": "2025-11-12T04:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-045-1",
    "conversationId": "conv-045",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T04:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-045-2",
    "conversationId": "conv-045",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for cataract care",
    "sentAt": "2025-11-12T04:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-045-3",
    "conversationId": "conv-045",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T04:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-045-4",
    "conversationId": "conv-045",
    "direction": "outbound",
    "senderType": "system",
    "body": "Ahmed took over",
    "sentAt": "2025-11-12T04:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-045-5",
    "conversationId": "conv-045",
    "direction": "outbound",
    "senderType": "agent",
    "body": "Hello, I'm Ahmed from i-care. I'll finish the booking with you.",
    "sentAt": "2025-11-12T04:07:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-046-0",
    "conversationId": "conv-046",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أريد موعداً لفحص الشبكية غداً",
    "sentAt": "2025-11-12T05:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-046-1",
    "conversationId": "conv-046",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T05:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-046-2",
    "conversationId": "conv-046",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة retina",
    "sentAt": "2025-11-12T05:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-046-3",
    "conversationId": "conv-046",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T05:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-046-4",
    "conversationId": "conv-046",
    "direction": "inbound",
    "senderType": "customer",
    "body": "مرفق صورة",
    "sentAt": "2025-11-12T05:06:00.000Z",
    "metadata": {
      "kind": "attachment",
      "attachmentType": "prescription",
      "url": "/brand/icon.png",
      "fileName": "prescription-conv-046.jpg",
      "mimeType": "image/jpeg"
    }
  },
  {
    "id": "msg-conv-047-0",
    "conversationId": "conv-047",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Need LASIK pricing and available surgeons",
    "sentAt": "2025-11-12T06:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-047-1",
    "conversationId": "conv-047",
    "direction": "outbound",
    "senderType": "ai",
    "body": "Hi! I can help book an appointment. Which service do you need?",
    "sentAt": "2025-11-12T06:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-047-2",
    "conversationId": "conv-047",
    "direction": "inbound",
    "senderType": "customer",
    "body": "Looking for lasik care",
    "sentAt": "2025-11-12T06:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-047-3",
    "conversationId": "conv-047",
    "direction": "outbound",
    "senderType": "ai",
    "body": "I found openings on Tuesday. Does that work?",
    "sentAt": "2025-11-12T06:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-047-4",
    "conversationId": "conv-047",
    "direction": "outbound",
    "senderType": "system",
    "body": "AI handed off to Contracts",
    "sentAt": "2025-11-12T06:06:00.000Z",
    "metadata": {
      "kind": "system"
    }
  },
  {
    "id": "msg-conv-048-0",
    "conversationId": "conv-048",
    "direction": "inbound",
    "senderType": "customer",
    "body": "أحتاج إعادة جدولة موعد طفلتي",
    "sentAt": "2025-11-12T07:00:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-048-1",
    "conversationId": "conv-048",
    "direction": "outbound",
    "senderType": "ai",
    "body": "مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟",
    "sentAt": "2025-11-12T07:01:30.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-048-2",
    "conversationId": "conv-048",
    "direction": "inbound",
    "senderType": "customer",
    "body": "خدمة pediatric",
    "sentAt": "2025-11-12T07:03:00.000Z",
    "metadata": {
      "kind": "text"
    }
  },
  {
    "id": "msg-conv-048-3",
    "conversationId": "conv-048",
    "direction": "outbound",
    "senderType": "ai",
    "body": "تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟",
    "sentAt": "2025-11-12T07:04:30.000Z",
    "metadata": {
      "kind": "text"
    }
  }
] as Message[]

export const SEED_BOOKING_DRAFTS: BookingDraft[] = [
  {
    "conversationId": "conv-001",
    "fourPartName": "Layla Hassan",
    "phone": "+201010000000",
    "serviceId": "retina",
    "attachmentCount": 1,
    "stepIndex": 3,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-003",
    "fourPartName": "Sara Ahmed",
    "phone": "+201210000002",
    "serviceId": "pediatric",
    "doctorDegree": "Specialist",
    "attachmentCount": 0,
    "stepIndex": 4,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-005",
    "fourPartName": "Nour Eid",
    "phone": "+201010000004",
    "serviceId": "cataract",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "attachmentCount": 0,
    "stepIndex": 5,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-006",
    "fourPartName": "هناء مالك",
    "phone": "+201110000005",
    "serviceId": "retina",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "attachmentCount": 1,
    "stepIndex": 6,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-007",
    "fourPartName": "Tariq Salim",
    "phone": "+201210000006",
    "serviceId": "lasik",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 0,
    "stepIndex": 7,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-009",
    "fourPartName": "Adel Farouk",
    "phone": "+201010000008",
    "serviceId": "optics",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 1,
    "stepIndex": 8,
    "stepTotal": 8,
    "confirmationState": "awaiting_confirm"
  },
  {
    "conversationId": "conv-011",
    "fourPartName": "Ibrahim Nasser",
    "phone": "+201210000010",
    "serviceId": "retina",
    "attachmentCount": 1,
    "stepIndex": 3,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-013",
    "fourPartName": "Khalid Mansour",
    "phone": "+201010000012",
    "serviceId": "pediatric",
    "doctorDegree": "Specialist",
    "attachmentCount": 0,
    "stepIndex": 4,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-015",
    "fourPartName": "Fadi Kanaan",
    "phone": "+201210000014",
    "serviceId": "cataract",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "attachmentCount": 0,
    "stepIndex": 5,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-016",
    "fourPartName": "نور علمي",
    "phone": "+201510000015",
    "serviceId": "retina",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "attachmentCount": 1,
    "stepIndex": 6,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-017",
    "fourPartName": "Samir Qasim",
    "phone": "+201010000016",
    "serviceId": "lasik",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 0,
    "stepIndex": 7,
    "stepTotal": 8,
    "confirmationState": "editing"
  },
  {
    "conversationId": "conv-019",
    "fourPartName": "Ziad Rahman",
    "phone": "+201210000018",
    "serviceId": "optics",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 1,
    "stepIndex": 8,
    "stepTotal": 8,
    "confirmationState": "awaiting_confirm"
  },
  {
    "conversationId": "conv-021",
    "fourPartName": "Layla Hassan",
    "phone": "+201010000020",
    "serviceId": "retina",
    "attachmentCount": 1,
    "stepIndex": 3,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-023",
    "fourPartName": "Sara Ahmed",
    "phone": "+201210000022",
    "serviceId": "pediatric",
    "doctorDegree": "Specialist",
    "attachmentCount": 0,
    "stepIndex": 4,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-025",
    "fourPartName": "Nour Eid",
    "phone": "+201010000024",
    "serviceId": "cataract",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "attachmentCount": 0,
    "stepIndex": 5,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-026",
    "fourPartName": "هناء مالك",
    "phone": "+201110000025",
    "serviceId": "retina",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "attachmentCount": 1,
    "stepIndex": 6,
    "stepTotal": 8,
    "confirmationState": "editing"
  },
  {
    "conversationId": "conv-027",
    "fourPartName": "Tariq Salim",
    "phone": "+201210000026",
    "serviceId": "lasik",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 0,
    "stepIndex": 7,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-029",
    "fourPartName": "Adel Farouk",
    "phone": "+201010000028",
    "serviceId": "optics",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 1,
    "stepIndex": 8,
    "stepTotal": 8,
    "confirmationState": "awaiting_confirm"
  },
  {
    "conversationId": "conv-031",
    "fourPartName": "Ibrahim Nasser",
    "phone": "+201210000030",
    "serviceId": "retina",
    "attachmentCount": 1,
    "stepIndex": 3,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-033",
    "fourPartName": "Khalid Mansour",
    "phone": "+201010000032",
    "serviceId": "pediatric",
    "doctorDegree": "Specialist",
    "attachmentCount": 0,
    "stepIndex": 4,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-035",
    "fourPartName": "Fadi Kanaan",
    "phone": "+201210000034",
    "serviceId": "cataract",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "attachmentCount": 0,
    "stepIndex": 5,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-036",
    "fourPartName": "نور علمي",
    "phone": "+201510000035",
    "serviceId": "retina",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "attachmentCount": 1,
    "stepIndex": 6,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-037",
    "fourPartName": "Samir Qasim",
    "phone": "+201010000036",
    "serviceId": "lasik",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 0,
    "stepIndex": 7,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-039",
    "fourPartName": "Ziad Rahman",
    "phone": "+201210000038",
    "serviceId": "optics",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 1,
    "stepIndex": 8,
    "stepTotal": 8,
    "confirmationState": "awaiting_confirm"
  },
  {
    "conversationId": "conv-041",
    "fourPartName": "Layla Hassan",
    "phone": "+201010000040",
    "serviceId": "retina",
    "attachmentCount": 1,
    "stepIndex": 3,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-043",
    "fourPartName": "Sara Ahmed",
    "phone": "+201210000042",
    "serviceId": "pediatric",
    "doctorDegree": "Specialist",
    "attachmentCount": 0,
    "stepIndex": 4,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-045",
    "fourPartName": "Nour Eid",
    "phone": "+201010000044",
    "serviceId": "cataract",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "attachmentCount": 0,
    "stepIndex": 5,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-046",
    "fourPartName": "هناء مالك",
    "phone": "+201110000045",
    "serviceId": "retina",
    "doctorDegree": "Specialist",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "attachmentCount": 1,
    "stepIndex": 6,
    "stepTotal": 8,
    "confirmationState": "collecting"
  },
  {
    "conversationId": "conv-047",
    "fourPartName": "Tariq Salim",
    "phone": "+201210000046",
    "serviceId": "lasik",
    "doctorDegree": "Consultant",
    "day": "Tuesday",
    "timeSlot": "10:00–11:00",
    "estimatedCost": "SAR 450",
    "attachmentCount": 0,
    "stepIndex": 7,
    "stepTotal": 8,
    "confirmationState": "collecting"
  }
] as BookingDraft[]

export const SEED_AI_INSIGHTS: AiInsight[] = [
  {
    "conversationId": "conv-001",
    "intent": "book_appointment",
    "confidence": 0.62,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-002",
    "intent": "check_insurance",
    "confidence": 0.63,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "results"
  },
  {
    "conversationId": "conv-003",
    "intent": "general_inquiry",
    "confidence": 0.64,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-005",
    "intent": "general_inquiry",
    "confidence": 0.65,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-007",
    "intent": "check_insurance",
    "confidence": 0.66,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "results"
  },
  {
    "conversationId": "conv-008",
    "intent": "general_inquiry",
    "confidence": 0.67,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-009",
    "intent": "reschedule_appointment",
    "confidence": 0.68,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-012",
    "intent": "check_insurance",
    "confidence": 0.69,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "results"
  },
  {
    "conversationId": "conv-013",
    "intent": "general_inquiry",
    "confidence": 0.7,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-014",
    "intent": "reschedule_appointment",
    "confidence": 0.71,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-015",
    "intent": "general_inquiry",
    "confidence": 0.72,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-016",
    "intent": "book_appointment",
    "confidence": 0.73,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-017",
    "intent": "check_insurance",
    "confidence": 0.74,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "call_center"
  },
  {
    "conversationId": "conv-018",
    "intent": "general_inquiry",
    "confidence": 0.75,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-019",
    "intent": "reschedule_appointment",
    "confidence": 0.76,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-022",
    "intent": "check_insurance",
    "confidence": 0.77,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "call_center"
  },
  {
    "conversationId": "conv-023",
    "intent": "general_inquiry",
    "confidence": 0.78,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-025",
    "intent": "general_inquiry",
    "confidence": 0.79,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-027",
    "intent": "check_insurance",
    "confidence": 0.8,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "call_center"
  },
  {
    "conversationId": "conv-028",
    "intent": "general_inquiry",
    "confidence": 0.81,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-029",
    "intent": "reschedule_appointment",
    "confidence": 0.82,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-031",
    "intent": "book_appointment",
    "confidence": 0.83,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-032",
    "intent": "check_insurance",
    "confidence": 0.84,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "results"
  },
  {
    "conversationId": "conv-033",
    "intent": "general_inquiry",
    "confidence": 0.85,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-035",
    "intent": "general_inquiry",
    "confidence": 0.86,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-037",
    "intent": "check_insurance",
    "confidence": 0.87,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "results"
  },
  {
    "conversationId": "conv-038",
    "intent": "general_inquiry",
    "confidence": 0.88,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-039",
    "intent": "reschedule_appointment",
    "confidence": 0.89,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-040",
    "intent": "general_inquiry",
    "confidence": 0.9,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-042",
    "intent": "check_insurance",
    "confidence": 0.91,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "contracts"
  },
  {
    "conversationId": "conv-043",
    "intent": "general_inquiry",
    "confidence": 0.62,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ]
  },
  {
    "conversationId": "conv-046",
    "intent": "book_appointment",
    "confidence": 0.63,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  },
  {
    "conversationId": "conv-047",
    "intent": "check_insurance",
    "confidence": 0.64,
    "reasoningSummary": "Patient is scheduling eye-care service. Service captured; confirming slot and cost.",
    "toolsUsed": [
      "check_availability",
      "book_slot"
    ],
    "handoffReason": "Patient requested human / insurance complexity",
    "handoffDepartment": "contracts"
  },
  {
    "conversationId": "conv-048",
    "intent": "general_inquiry",
    "confidence": 0.65,
    "reasoningSummary": "المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.",
    "toolsUsed": [
      "fetch_insurance",
      "escalate_to_human"
    ]
  }
] as AiInsight[]

export const SEED_ESCALATIONS: Escalation[] = [
  {
    "id": "esc-001",
    "conversationId": "conv-001",
    "customerName": "Layla Hassan",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T00:00:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "call_center",
    "serviceId": "retina",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected retina; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T01:00:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000000",
    "doctorName": "Prof. Amira Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "09-12",
    "estimatedCost": "SAR 450",
    "timeline": [
      {
        "id": "tl-0-1",
        "at": "2025-11-10T00:00:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-0-2",
        "at": "2025-11-10T00:10:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-0",
        "at": "2025-11-10T00:00:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-002",
    "conversationId": "conv-002",
    "customerName": "عمر الفارسي",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T01:03:00.000Z",
    "department": "results",
    "serviceId": "lasik",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T05:03:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000001",
    "timeline": [
      {
        "id": "tl-1-1",
        "at": "2025-11-10T01:03:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-1-2",
        "at": "2025-11-10T01:13:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-003",
    "conversationId": "conv-003",
    "customerName": "Sara Ahmed",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T02:06:00.000Z",
    "resolvedAt": "2025-11-10T06:06:00.000Z",
    "department": "contracts",
    "serviceId": "pediatric",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T06:06:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000002",
    "timeline": [
      {
        "id": "tl-2-1",
        "at": "2025-11-10T02:06:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-2-2",
        "at": "2025-11-10T02:16:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-004",
    "conversationId": "conv-004",
    "customerName": "يوسف كريم",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T03:09:00.000Z",
    "department": "call_center",
    "serviceId": "optics",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected optics; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T07:09:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000003",
    "doctorName": "Prof. Karim Adel",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "18-21",
    "estimatedCost": "SAR 600",
    "timeline": [
      {
        "id": "tl-3-1",
        "at": "2025-11-10T03:09:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-3-2",
        "at": "2025-11-10T03:19:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-005",
    "conversationId": "conv-005",
    "customerName": "Nour Eid",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T04:12:00.000Z",
    "department": "results",
    "serviceId": "cataract",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T08:12:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000004",
    "timeline": [
      {
        "id": "tl-4-1",
        "at": "2025-11-10T04:12:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-4-2",
        "at": "2025-11-10T04:22:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-4",
        "at": "2025-11-10T04:12:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-006",
    "conversationId": "conv-006",
    "customerName": "هناء مالك",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T05:15:00.000Z",
    "resolvedAt": "2025-11-10T07:15:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "contracts",
    "serviceId": "retina",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T09:15:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000005",
    "timeline": [
      {
        "id": "tl-5-1",
        "at": "2025-11-10T05:15:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-5-2",
        "at": "2025-11-10T05:25:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-007",
    "conversationId": "conv-007",
    "customerName": "Tariq Salim",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T06:18:00.000Z",
    "department": "call_center",
    "serviceId": "lasik",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected lasik; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T10:18:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000006",
    "doctorName": "Prof. Nadia Selim",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "15-18",
    "estimatedCost": "SAR 750",
    "timeline": [
      {
        "id": "tl-6-1",
        "at": "2025-11-10T06:18:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-6-2",
        "at": "2025-11-10T06:28:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-008",
    "conversationId": "conv-008",
    "customerName": "مايا جوزيف",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T07:21:00.000Z",
    "department": "results",
    "serviceId": "pediatric",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T08:21:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000007",
    "timeline": [
      {
        "id": "tl-7-1",
        "at": "2025-11-10T07:21:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-7-2",
        "at": "2025-11-10T07:31:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-009",
    "conversationId": "conv-009",
    "customerName": "Adel Farouk",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T08:24:00.000Z",
    "resolvedAt": "2025-11-10T13:24:00.000Z",
    "department": "contracts",
    "serviceId": "optics",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T12:24:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000008",
    "timeline": [
      {
        "id": "tl-8-1",
        "at": "2025-11-10T08:24:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-8-2",
        "at": "2025-11-10T08:34:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-8",
        "at": "2025-11-10T08:24:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-010",
    "conversationId": "conv-010",
    "customerName": "رانيا صالح",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T09:27:00.000Z",
    "department": "call_center",
    "serviceId": "cataract",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected cataract; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T13:27:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000009",
    "doctorName": "Prof. Youssef Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "12-15",
    "estimatedCost": "SAR 500",
    "timeline": [
      {
        "id": "tl-9-1",
        "at": "2025-11-10T09:27:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-9-2",
        "at": "2025-11-10T09:37:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-011",
    "conversationId": "conv-011",
    "customerName": "Ibrahim Nasser",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T10:30:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "results",
    "serviceId": "retina",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T14:30:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000010",
    "timeline": [
      {
        "id": "tl-10-1",
        "at": "2025-11-10T10:30:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-10-2",
        "at": "2025-11-10T10:40:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-012",
    "conversationId": "conv-012",
    "customerName": "دينا سمير",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T11:33:00.000Z",
    "resolvedAt": "2025-11-10T14:33:00.000Z",
    "department": "contracts",
    "serviceId": "lasik",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T15:33:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000011",
    "timeline": [
      {
        "id": "tl-11-1",
        "at": "2025-11-10T11:33:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-11-2",
        "at": "2025-11-10T11:43:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-013",
    "conversationId": "conv-013",
    "customerName": "Khalid Mansour",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T12:36:00.000Z",
    "department": "call_center",
    "serviceId": "pediatric",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected pediatric; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T16:36:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000012",
    "doctorName": "Prof. Amira Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "09-12",
    "estimatedCost": "SAR 650",
    "timeline": [
      {
        "id": "tl-12-1",
        "at": "2025-11-10T12:36:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-12-2",
        "at": "2025-11-10T12:46:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-12",
        "at": "2025-11-10T12:36:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-014",
    "conversationId": "conv-014",
    "customerName": "ليلى حداد",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T13:39:00.000Z",
    "department": "results",
    "serviceId": "optics",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T17:39:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000013",
    "timeline": [
      {
        "id": "tl-13-1",
        "at": "2025-11-10T13:39:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-13-2",
        "at": "2025-11-10T13:49:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-015",
    "conversationId": "conv-015",
    "customerName": "Fadi Kanaan",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T14:42:00.000Z",
    "resolvedAt": "2025-11-10T20:42:00.000Z",
    "department": "contracts",
    "serviceId": "cataract",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T15:42:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000014",
    "timeline": [
      {
        "id": "tl-14-1",
        "at": "2025-11-10T14:42:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-14-2",
        "at": "2025-11-10T14:52:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-016",
    "conversationId": "conv-016",
    "customerName": "نور علمي",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T15:45:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "call_center",
    "serviceId": "retina",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected retina; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T19:45:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000015",
    "doctorName": "Prof. Karim Adel",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "18-21",
    "estimatedCost": "SAR 800",
    "timeline": [
      {
        "id": "tl-15-1",
        "at": "2025-11-10T15:45:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-15-2",
        "at": "2025-11-10T15:55:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-017",
    "conversationId": "conv-017",
    "customerName": "Samir Qasim",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T16:48:00.000Z",
    "department": "results",
    "serviceId": "lasik",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T20:48:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000016",
    "timeline": [
      {
        "id": "tl-16-1",
        "at": "2025-11-10T16:48:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-16-2",
        "at": "2025-11-10T16:58:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-16",
        "at": "2025-11-10T16:48:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-018",
    "conversationId": "conv-018",
    "customerName": "هدى فارس",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T17:51:00.000Z",
    "resolvedAt": "2025-11-10T21:51:00.000Z",
    "department": "contracts",
    "serviceId": "pediatric",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T21:51:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000017",
    "timeline": [
      {
        "id": "tl-17-1",
        "at": "2025-11-10T17:51:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-17-2",
        "at": "2025-11-10T18:01:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-019",
    "conversationId": "conv-019",
    "customerName": "Ziad Rahman",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T18:54:00.000Z",
    "department": "call_center",
    "serviceId": "optics",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected optics; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T22:54:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000018",
    "doctorName": "Prof. Nadia Selim",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "15-18",
    "estimatedCost": "SAR 550",
    "timeline": [
      {
        "id": "tl-18-1",
        "at": "2025-11-10T18:54:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-18-2",
        "at": "2025-11-10T19:04:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-020",
    "conversationId": "conv-020",
    "customerName": "مايا حداد",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T19:57:00.000Z",
    "department": "results",
    "serviceId": "cataract",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T23:57:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000019",
    "timeline": [
      {
        "id": "tl-19-1",
        "at": "2025-11-10T19:57:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-19-2",
        "at": "2025-11-10T20:07:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-021",
    "conversationId": "conv-021",
    "customerName": "Layla Hassan",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T00:00:00.000Z",
    "resolvedAt": "2025-11-10T02:00:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "contracts",
    "serviceId": "retina",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T04:00:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000020",
    "timeline": [
      {
        "id": "tl-20-1",
        "at": "2025-11-10T00:00:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-20-2",
        "at": "2025-11-10T00:10:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-20",
        "at": "2025-11-10T00:00:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-022",
    "conversationId": "conv-022",
    "customerName": "عمر الفارسي",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T01:03:00.000Z",
    "department": "call_center",
    "serviceId": "lasik",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected lasik; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T02:03:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000021",
    "doctorName": "Prof. Youssef Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "12-15",
    "estimatedCost": "SAR 700",
    "timeline": [
      {
        "id": "tl-21-1",
        "at": "2025-11-10T01:03:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-21-2",
        "at": "2025-11-10T01:13:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-023",
    "conversationId": "conv-023",
    "customerName": "Sara Ahmed",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T02:06:00.000Z",
    "department": "results",
    "serviceId": "pediatric",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T06:06:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000022",
    "timeline": [
      {
        "id": "tl-22-1",
        "at": "2025-11-10T02:06:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-22-2",
        "at": "2025-11-10T02:16:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-024",
    "conversationId": "conv-024",
    "customerName": "يوسف كريم",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T03:09:00.000Z",
    "resolvedAt": "2025-11-10T08:09:00.000Z",
    "department": "contracts",
    "serviceId": "optics",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T07:09:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000023",
    "timeline": [
      {
        "id": "tl-23-1",
        "at": "2025-11-10T03:09:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-23-2",
        "at": "2025-11-10T03:19:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-025",
    "conversationId": "conv-025",
    "customerName": "Nour Eid",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T04:12:00.000Z",
    "department": "call_center",
    "serviceId": "cataract",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected cataract; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T08:12:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000024",
    "doctorName": "Prof. Amira Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "09-12",
    "estimatedCost": "SAR 450",
    "timeline": [
      {
        "id": "tl-24-1",
        "at": "2025-11-10T04:12:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-24-2",
        "at": "2025-11-10T04:22:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-24",
        "at": "2025-11-10T04:12:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-026",
    "conversationId": "conv-026",
    "customerName": "هناء مالك",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T05:15:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "results",
    "serviceId": "retina",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T09:15:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000025",
    "timeline": [
      {
        "id": "tl-25-1",
        "at": "2025-11-10T05:15:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-25-2",
        "at": "2025-11-10T05:25:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-027",
    "conversationId": "conv-027",
    "customerName": "Tariq Salim",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T06:18:00.000Z",
    "resolvedAt": "2025-11-10T09:18:00.000Z",
    "department": "contracts",
    "serviceId": "lasik",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T10:18:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000026",
    "timeline": [
      {
        "id": "tl-26-1",
        "at": "2025-11-10T06:18:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-26-2",
        "at": "2025-11-10T06:28:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-028",
    "conversationId": "conv-028",
    "customerName": "مايا جوزيف",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T07:21:00.000Z",
    "department": "call_center",
    "serviceId": "pediatric",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected pediatric; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T11:21:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000027",
    "doctorName": "Prof. Karim Adel",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "18-21",
    "estimatedCost": "SAR 600",
    "timeline": [
      {
        "id": "tl-27-1",
        "at": "2025-11-10T07:21:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-27-2",
        "at": "2025-11-10T07:31:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-029",
    "conversationId": "conv-029",
    "customerName": "Adel Farouk",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T08:24:00.000Z",
    "department": "results",
    "serviceId": "optics",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T09:24:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000028",
    "timeline": [
      {
        "id": "tl-28-1",
        "at": "2025-11-10T08:24:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-28-2",
        "at": "2025-11-10T08:34:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-28",
        "at": "2025-11-10T08:24:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-030",
    "conversationId": "conv-030",
    "customerName": "رانيا صالح",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T09:27:00.000Z",
    "resolvedAt": "2025-11-10T15:27:00.000Z",
    "department": "contracts",
    "serviceId": "cataract",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T13:27:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000029",
    "timeline": [
      {
        "id": "tl-29-1",
        "at": "2025-11-10T09:27:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-29-2",
        "at": "2025-11-10T09:37:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-031",
    "conversationId": "conv-031",
    "customerName": "Ibrahim Nasser",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T10:30:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "call_center",
    "serviceId": "retina",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected retina; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T14:30:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000030",
    "doctorName": "Prof. Nadia Selim",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "15-18",
    "estimatedCost": "SAR 750",
    "timeline": [
      {
        "id": "tl-30-1",
        "at": "2025-11-10T10:30:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-30-2",
        "at": "2025-11-10T10:40:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-032",
    "conversationId": "conv-032",
    "customerName": "دينا سمير",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T11:33:00.000Z",
    "department": "results",
    "serviceId": "lasik",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T15:33:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000031",
    "timeline": [
      {
        "id": "tl-31-1",
        "at": "2025-11-10T11:33:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-31-2",
        "at": "2025-11-10T11:43:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-033",
    "conversationId": "conv-033",
    "customerName": "Khalid Mansour",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T12:36:00.000Z",
    "resolvedAt": "2025-11-10T16:36:00.000Z",
    "department": "contracts",
    "serviceId": "pediatric",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T16:36:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000032",
    "timeline": [
      {
        "id": "tl-32-1",
        "at": "2025-11-10T12:36:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-32-2",
        "at": "2025-11-10T12:46:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-32",
        "at": "2025-11-10T12:36:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-034",
    "conversationId": "conv-034",
    "customerName": "ليلى حداد",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T13:39:00.000Z",
    "department": "call_center",
    "serviceId": "optics",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected optics; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T17:39:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000033",
    "doctorName": "Prof. Youssef Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "12-15",
    "estimatedCost": "SAR 500",
    "timeline": [
      {
        "id": "tl-33-1",
        "at": "2025-11-10T13:39:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-33-2",
        "at": "2025-11-10T13:49:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-035",
    "conversationId": "conv-035",
    "customerName": "Fadi Kanaan",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T14:42:00.000Z",
    "department": "results",
    "serviceId": "cataract",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T18:42:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000034",
    "timeline": [
      {
        "id": "tl-34-1",
        "at": "2025-11-10T14:42:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-34-2",
        "at": "2025-11-10T14:52:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-036",
    "conversationId": "conv-036",
    "customerName": "نور علمي",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T15:45:00.000Z",
    "resolvedAt": "2025-11-10T17:45:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "contracts",
    "serviceId": "retina",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T16:45:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000035",
    "timeline": [
      {
        "id": "tl-35-1",
        "at": "2025-11-10T15:45:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-35-2",
        "at": "2025-11-10T15:55:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  }
] as Escalation[]

export const SEED_DOCTORS: Doctor[] = [
  {
    "id": "doc-1",
    "name": "Prof. Amira Nabil",
    "degree": "professor",
    "services": [
      "retina",
      "cataract"
    ],
    "availableDays": [
      0,
      1,
      2,
      3,
      4
    ],
    "specialty": "Retina",
    "status": "active",
    "consultationPrice": 1200,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 9
  },
  {
    "id": "doc-2",
    "name": "Dr. Hassan Farouk",
    "degree": "consultant",
    "services": [
      "lasik",
      "optics"
    ],
    "availableDays": [
      0,
      1,
      2,
      3
    ],
    "specialty": "Refractive",
    "status": "active",
    "consultationPrice": 1400,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [],
      "5": [],
      "6": []
    },
    "bookingsCount": 9
  },
  {
    "id": "doc-3",
    "name": "Dr. Mona Said",
    "degree": "specialist",
    "services": [
      "pediatric",
      "optics"
    ],
    "availableDays": [
      1,
      2,
      3,
      4
    ],
    "specialty": "Pediatric",
    "status": "active",
    "consultationPrice": 450,
    "slotGrid": {
      "0": [],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 9
  },
  {
    "id": "doc-4",
    "name": "Prof. Karim Adel",
    "degree": "professor",
    "services": [
      "lasik",
      "retina"
    ],
    "availableDays": [
      0,
      2,
      3,
      4
    ],
    "specialty": "Cornea",
    "status": "active",
    "consultationPrice": 1800,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 4
  },
  {
    "id": "doc-5",
    "name": "Dr. Huda Fathy",
    "degree": "consultant",
    "services": [
      "cataract",
      "pediatric"
    ],
    "availableDays": [
      0,
      1,
      3,
      4
    ],
    "specialty": "Cataract",
    "status": "active",
    "consultationPrice": 1100,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 8
  },
  {
    "id": "doc-6",
    "name": "Dr. Tamer Youssef",
    "degree": "specialist",
    "services": [
      "retina",
      "optics",
      "cataract"
    ],
    "availableDays": [
      0,
      1,
      2,
      4
    ],
    "specialty": "General",
    "status": "active",
    "consultationPrice": 650,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 8
  },
  {
    "id": "doc-7",
    "name": "Prof. Nadia Selim",
    "degree": "professor",
    "services": [
      "pediatric",
      "optics"
    ],
    "availableDays": [
      0,
      1,
      2,
      3
    ],
    "specialty": "Pediatric",
    "status": "active",
    "consultationPrice": 800,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [],
      "5": [],
      "6": []
    },
    "bookingsCount": 9
  },
  {
    "id": "doc-8",
    "name": "Dr. Omar Farid",
    "degree": "consultant",
    "services": [
      "retina",
      "lasik"
    ],
    "availableDays": [
      0,
      2,
      3,
      4
    ],
    "specialty": "Retina",
    "status": "active",
    "consultationPrice": 900,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 4
  },
  {
    "id": "doc-9",
    "name": "Dr. Laila Mansour",
    "degree": "specialist",
    "services": [
      "cataract",
      "optics"
    ],
    "availableDays": [
      1,
      2,
      3,
      4
    ],
    "specialty": "Cataract",
    "status": "active",
    "consultationPrice": 850,
    "slotGrid": {
      "0": [],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 0
  },
  {
    "id": "doc-10",
    "name": "Prof. Youssef Nabil",
    "degree": "professor",
    "services": [
      "cataract",
      "lasik"
    ],
    "availableDays": [
      0,
      1,
      3,
      4
    ],
    "specialty": "Anterior segment",
    "status": "active",
    "consultationPrice": 1500,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 0
  },
  {
    "id": "doc-11",
    "name": "Dr. Sara Helmy",
    "degree": "consultant",
    "services": [
      "optics",
      "pediatric"
    ],
    "availableDays": [
      0,
      1,
      2,
      4
    ],
    "specialty": "Optics",
    "status": "active",
    "consultationPrice": 400,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [],
      "4": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "5": [],
      "6": []
    },
    "bookingsCount": 0
  },
  {
    "id": "doc-12",
    "name": "Dr. Rami Kamel",
    "degree": "specialist",
    "services": [
      "lasik",
      "retina"
    ],
    "availableDays": [
      0,
      1,
      2,
      3
    ],
    "specialty": "Refractive",
    "status": "inactive",
    "consultationPrice": 1100,
    "slotGrid": {
      "0": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "1": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "2": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "3": [
        "09-12",
        "12-15",
        "15-18",
        "18-21"
      ],
      "4": [],
      "5": [],
      "6": []
    },
    "bookingsCount": 4
  }
] as Doctor[]

export const SEED_CLINIC_SERVICES: ClinicService[] = [
  {
    "id": "retina",
    "nameKey": "serviceRetina",
    "active": true,
    "prices": {
      "professor": 1200,
      "consultant": 900,
      "specialist": 650
    },
    "attachments": [
      {
        "type": "prescription",
        "required": false,
        "optional": true
      },
      {
        "type": "insurance_card",
        "required": false,
        "optional": true
      },
      {
        "type": "receipt",
        "required": false,
        "optional": true
      }
    ]
  },
  {
    "id": "lasik",
    "nameKey": "serviceLasik",
    "active": true,
    "prices": {
      "professor": 1800,
      "consultant": 1400,
      "specialist": 1100
    },
    "attachments": [
      {
        "type": "prescription",
        "required": true,
        "optional": false
      },
      {
        "type": "insurance_card",
        "required": false,
        "optional": true
      },
      {
        "type": "receipt",
        "required": false,
        "optional": true
      }
    ]
  },
  {
    "id": "pediatric",
    "nameKey": "servicePediatric",
    "active": true,
    "prices": {
      "professor": 800,
      "consultant": 600,
      "specialist": 450
    },
    "attachments": [
      {
        "type": "prescription",
        "required": false,
        "optional": true
      },
      {
        "type": "insurance_card",
        "required": false,
        "optional": true
      },
      {
        "type": "receipt",
        "required": false,
        "optional": true
      }
    ]
  },
  {
    "id": "optics",
    "nameKey": "serviceOptics",
    "active": true,
    "prices": {
      "professor": 500,
      "consultant": 400,
      "specialist": 300
    },
    "attachments": [
      {
        "type": "prescription",
        "required": true,
        "optional": false
      },
      {
        "type": "insurance_card",
        "required": false,
        "optional": true
      },
      {
        "type": "receipt",
        "required": false,
        "optional": true
      }
    ]
  },
  {
    "id": "cataract",
    "nameKey": "serviceCataract",
    "active": true,
    "prices": {
      "professor": 1500,
      "consultant": 1100,
      "specialist": 850
    },
    "attachments": [
      {
        "type": "prescription",
        "required": true,
        "optional": false
      },
      {
        "type": "insurance_card",
        "required": true,
        "optional": false
      },
      {
        "type": "receipt",
        "required": false,
        "optional": true
      }
    ]
  }
] as ClinicService[]

export const SEED_CLINIC_DEPARTMENTS: ClinicDepartment[] = [
  {
    "id": "call_center",
    "name": "Call center",
    "members": [
      {
        "id": "m-cc-1",
        "name": "Ahmed Supervisor",
        "role": "Lead"
      },
      {
        "id": "m-cc-2",
        "name": "Nour Agent",
        "role": "Agent"
      },
      {
        "id": "m-cc-3",
        "name": "Sara Agent",
        "role": "Agent"
      }
    ],
    "workingHours": "Sat–Thu 09:00–21:00",
    "handoffRules": [
      "Confirm checkup booking and cost",
      "Accept consultation with full report",
      "Return incomplete drafts to AI"
    ]
  },
  {
    "id": "results",
    "name": "Results delivery",
    "members": [
      {
        "id": "m-rs-1",
        "name": "Hana Results",
        "role": "Lead"
      },
      {
        "id": "m-rs-2",
        "name": "Omar Courier",
        "role": "Agent"
      }
    ],
    "workingHours": "Sat–Thu 10:00–18:00",
    "handoffRules": [
      "Deliver examination results",
      "Optional receipt with None skip",
      "Escalate clinical questions"
    ]
  },
  {
    "id": "contracts",
    "name": "Contracts",
    "members": [
      {
        "id": "m-ct-1",
        "name": "Laila Contracts",
        "role": "Lead"
      },
      {
        "id": "m-ct-2",
        "name": "Karim Reviewer",
        "role": "Agent"
      }
    ],
    "workingHours": "Sat–Thu 09:00–17:00",
    "handoffRules": [
      "Review insurance + prescription",
      "Optional contract card",
      "Approve or request more documents"
    ]
  }
] as ClinicDepartment[]

export const SEED_CLINIC_SCHEDULE: ClinicSchedule = {
  "timezone": "Africa/Cairo",
  "weekly": [
    {
      "day": 0,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    },
    {
      "day": 1,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    },
    {
      "day": 2,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    },
    {
      "day": 3,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    },
    {
      "day": 4,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    },
    {
      "day": 5,
      "open": "09:00",
      "close": "21:00",
      "enabled": false
    },
    {
      "day": 6,
      "open": "09:00",
      "close": "21:00",
      "enabled": true
    }
  ],
  "holidays": [
    {
      "id": "hol-1",
      "date": "2025-12-25",
      "label": "Christmas"
    },
    {
      "id": "hol-2",
      "date": "2026-01-01",
      "label": "New Year"
    },
    {
      "id": "hol-3",
      "date": "2026-01-07",
      "label": "Coptic Christmas"
    }
  ],
  "exceptions": [
    {
      "id": "ex-1",
      "date": "2025-11-20",
      "closed": true,
      "label": "Staff training"
    },
    {
      "id": "ex-2",
      "date": "2025-11-27",
      "closed": false,
      "open": "10:00",
      "close": "16:00",
      "label": "Short day"
    }
  ],
  "timeSlots": [
    {
      "id": "09-12",
      "label": "09:00 – 12:00"
    },
    {
      "id": "12-15",
      "label": "12:00 – 15:00"
    },
    {
      "id": "15-18",
      "label": "15:00 – 18:00"
    },
    {
      "id": "18-21",
      "label": "18:00 – 21:00"
    }
  ]
} as ClinicSchedule

export const SEED_BOOKINGS: Booking[] = [
  {
    "id": "bk-001",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000000",
    "serviceId": "retina",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-08",
    "timeSlot": "09-12",
    "cost": 1200,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-0",
        "type": "prescription",
        "fileName": "doc-0.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "draft_ai",
    "conversationId": "conv-001",
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-08T00:00:00.000Z"
  },
  {
    "id": "bk-002",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000001",
    "serviceId": "lasik",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-09",
    "timeSlot": "12-15",
    "cost": 1400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T01:00:00.000Z",
    "updatedAt": "2025-11-08T01:00:00.000Z"
  },
  {
    "id": "bk-003",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000002",
    "serviceId": "pediatric",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-10",
    "timeSlot": "15-18",
    "cost": 450,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "conversationId": "conv-003",
    "createdAt": "2025-11-01T02:00:00.000Z",
    "updatedAt": "2025-11-08T02:00:00.000Z"
  },
  {
    "id": "bk-004",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000003",
    "serviceId": "optics",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-11",
    "timeSlot": "18-21",
    "cost": 500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T03:00:00.000Z",
    "updatedAt": "2025-11-08T03:00:00.000Z"
  },
  {
    "id": "bk-005",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000004",
    "serviceId": "cataract",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-12",
    "timeSlot": "09-12",
    "cost": 1100,
    "channel": "telegram",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-4",
        "type": "insurance_card",
        "fileName": "doc-4.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "no_show",
    "conversationId": "conv-005",
    "createdAt": "2025-11-01T04:00:00.000Z",
    "updatedAt": "2025-11-08T04:00:00.000Z"
  },
  {
    "id": "bk-006",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000005",
    "serviceId": "retina",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-13",
    "timeSlot": "12-15",
    "cost": 650,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T05:00:00.000Z",
    "updatedAt": "2025-11-08T05:00:00.000Z"
  },
  {
    "id": "bk-007",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000006",
    "serviceId": "lasik",
    "doctorId": "doc-4",
    "doctorName": "Prof. Karim Adel",
    "doctorDegree": "professor",
    "day": "2025-11-15",
    "timeSlot": "15-18",
    "cost": 1800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "conversationId": "conv-007",
    "createdAt": "2025-11-01T06:00:00.000Z",
    "updatedAt": "2025-11-08T06:00:00.000Z"
  },
  {
    "id": "bk-008",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000007",
    "serviceId": "pediatric",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-15",
    "timeSlot": "18-21",
    "cost": 600,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T07:00:00.000Z",
    "updatedAt": "2025-11-08T07:00:00.000Z"
  },
  {
    "id": "bk-009",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000008",
    "serviceId": "optics",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-16",
    "timeSlot": "09-12",
    "cost": 300,
    "channel": "manual",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-8",
        "type": "receipt",
        "fileName": "doc-8.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "cancelled",
    "conversationId": "conv-009",
    "createdAt": "2025-11-01T08:00:00.000Z",
    "updatedAt": "2025-11-08T08:00:00.000Z"
  },
  {
    "id": "bk-010",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000009",
    "serviceId": "cataract",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-17",
    "timeSlot": "12-15",
    "cost": 1500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T09:00:00.000Z",
    "updatedAt": "2025-11-08T09:00:00.000Z"
  },
  {
    "id": "bk-011",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000010",
    "serviceId": "retina",
    "doctorId": "doc-8",
    "doctorName": "Dr. Omar Farid",
    "doctorDegree": "consultant",
    "day": "2025-11-18",
    "timeSlot": "15-18",
    "cost": 900,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "conversationId": "conv-011",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  },
  {
    "id": "bk-012",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000011",
    "serviceId": "lasik",
    "doctorId": "doc-12",
    "doctorName": "Dr. Rami Kamel",
    "doctorDegree": "specialist",
    "day": "2025-11-19",
    "timeSlot": "18-21",
    "cost": 1100,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T11:00:00.000Z",
    "updatedAt": "2025-11-08T11:00:00.000Z"
  },
  {
    "id": "bk-013",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000012",
    "serviceId": "pediatric",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-20",
    "timeSlot": "09-12",
    "cost": 800,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-12",
        "type": "prescription",
        "fileName": "doc-12.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "confirmed",
    "conversationId": "conv-013",
    "createdAt": "2025-11-01T12:00:00.000Z",
    "updatedAt": "2025-11-08T12:00:00.000Z"
  },
  {
    "id": "bk-014",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000013",
    "serviceId": "optics",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-22",
    "timeSlot": "12-15",
    "cost": 400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T13:00:00.000Z",
    "updatedAt": "2025-11-08T13:00:00.000Z"
  },
  {
    "id": "bk-015",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000014",
    "serviceId": "cataract",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-08",
    "timeSlot": "15-18",
    "cost": 850,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "conversationId": "conv-015",
    "createdAt": "2025-11-01T14:00:00.000Z",
    "updatedAt": "2025-11-08T14:00:00.000Z"
  },
  {
    "id": "bk-016",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000015",
    "serviceId": "retina",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-09",
    "timeSlot": "18-21",
    "cost": 1200,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T15:00:00.000Z",
    "updatedAt": "2025-11-08T15:00:00.000Z"
  },
  {
    "id": "bk-017",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000016",
    "serviceId": "lasik",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-10",
    "timeSlot": "09-12",
    "cost": 1400,
    "channel": "telegram",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-16",
        "type": "insurance_card",
        "fileName": "doc-16.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "pending_confirmation",
    "conversationId": "conv-017",
    "createdAt": "2025-11-01T16:00:00.000Z",
    "updatedAt": "2025-11-08T16:00:00.000Z"
  },
  {
    "id": "bk-018",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000017",
    "serviceId": "pediatric",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-11",
    "timeSlot": "12-15",
    "cost": 450,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T17:00:00.000Z",
    "updatedAt": "2025-11-08T17:00:00.000Z"
  },
  {
    "id": "bk-019",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000018",
    "serviceId": "optics",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-12",
    "timeSlot": "15-18",
    "cost": 500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "conversationId": "conv-019",
    "createdAt": "2025-11-01T18:00:00.000Z",
    "updatedAt": "2025-11-08T18:00:00.000Z"
  },
  {
    "id": "bk-020",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000019",
    "serviceId": "cataract",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-13",
    "timeSlot": "18-21",
    "cost": 1100,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T19:00:00.000Z",
    "updatedAt": "2025-11-08T19:00:00.000Z"
  },
  {
    "id": "bk-021",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000020",
    "serviceId": "retina",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-15",
    "timeSlot": "09-12",
    "cost": 650,
    "channel": "manual",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-20",
        "type": "receipt",
        "fileName": "doc-20.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "draft_ai",
    "conversationId": "conv-021",
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-08T00:00:00.000Z"
  },
  {
    "id": "bk-022",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000021",
    "serviceId": "lasik",
    "doctorId": "doc-4",
    "doctorName": "Prof. Karim Adel",
    "doctorDegree": "professor",
    "day": "2025-11-15",
    "timeSlot": "12-15",
    "cost": 1800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T01:00:00.000Z",
    "updatedAt": "2025-11-08T01:00:00.000Z"
  },
  {
    "id": "bk-023",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000022",
    "serviceId": "pediatric",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-16",
    "timeSlot": "15-18",
    "cost": 600,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "conversationId": "conv-023",
    "createdAt": "2025-11-01T02:00:00.000Z",
    "updatedAt": "2025-11-08T02:00:00.000Z"
  },
  {
    "id": "bk-024",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000023",
    "serviceId": "optics",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-17",
    "timeSlot": "18-21",
    "cost": 300,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T03:00:00.000Z",
    "updatedAt": "2025-11-08T03:00:00.000Z"
  },
  {
    "id": "bk-025",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000024",
    "serviceId": "cataract",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-18",
    "timeSlot": "09-12",
    "cost": 1500,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-24",
        "type": "prescription",
        "fileName": "doc-24.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "no_show",
    "conversationId": "conv-025",
    "createdAt": "2025-11-01T04:00:00.000Z",
    "updatedAt": "2025-11-08T04:00:00.000Z"
  },
  {
    "id": "bk-026",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000025",
    "serviceId": "retina",
    "doctorId": "doc-8",
    "doctorName": "Dr. Omar Farid",
    "doctorDegree": "consultant",
    "day": "2025-11-19",
    "timeSlot": "12-15",
    "cost": 900,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T05:00:00.000Z",
    "updatedAt": "2025-11-08T05:00:00.000Z"
  },
  {
    "id": "bk-027",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000026",
    "serviceId": "lasik",
    "doctorId": "doc-12",
    "doctorName": "Dr. Rami Kamel",
    "doctorDegree": "specialist",
    "day": "2025-11-20",
    "timeSlot": "15-18",
    "cost": 1100,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "conversationId": "conv-027",
    "createdAt": "2025-11-01T06:00:00.000Z",
    "updatedAt": "2025-11-08T06:00:00.000Z"
  },
  {
    "id": "bk-028",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000027",
    "serviceId": "pediatric",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-22",
    "timeSlot": "18-21",
    "cost": 800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T07:00:00.000Z",
    "updatedAt": "2025-11-08T07:00:00.000Z"
  },
  {
    "id": "bk-029",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000028",
    "serviceId": "optics",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-08",
    "timeSlot": "09-12",
    "cost": 400,
    "channel": "telegram",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-28",
        "type": "insurance_card",
        "fileName": "doc-28.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "cancelled",
    "conversationId": "conv-029",
    "createdAt": "2025-11-01T08:00:00.000Z",
    "updatedAt": "2025-11-08T08:00:00.000Z"
  },
  {
    "id": "bk-030",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000029",
    "serviceId": "cataract",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-09",
    "timeSlot": "12-15",
    "cost": 850,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T09:00:00.000Z",
    "updatedAt": "2025-11-08T09:00:00.000Z"
  },
  {
    "id": "bk-031",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000030",
    "serviceId": "retina",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-10",
    "timeSlot": "15-18",
    "cost": 1200,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "conversationId": "conv-031",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  },
  {
    "id": "bk-032",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000031",
    "serviceId": "lasik",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-11",
    "timeSlot": "18-21",
    "cost": 1400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T11:00:00.000Z",
    "updatedAt": "2025-11-08T11:00:00.000Z"
  },
  {
    "id": "bk-033",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000032",
    "serviceId": "pediatric",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-12",
    "timeSlot": "09-12",
    "cost": 450,
    "channel": "manual",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-32",
        "type": "receipt",
        "fileName": "doc-32.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "confirmed",
    "conversationId": "conv-033",
    "createdAt": "2025-11-01T12:00:00.000Z",
    "updatedAt": "2025-11-08T12:00:00.000Z"
  },
  {
    "id": "bk-034",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000033",
    "serviceId": "optics",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-13",
    "timeSlot": "12-15",
    "cost": 500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T13:00:00.000Z",
    "updatedAt": "2025-11-08T13:00:00.000Z"
  },
  {
    "id": "bk-035",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000034",
    "serviceId": "cataract",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-15",
    "timeSlot": "15-18",
    "cost": 1100,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "conversationId": "conv-035",
    "createdAt": "2025-11-01T14:00:00.000Z",
    "updatedAt": "2025-11-08T14:00:00.000Z"
  },
  {
    "id": "bk-036",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000035",
    "serviceId": "retina",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-15",
    "timeSlot": "18-21",
    "cost": 650,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T15:00:00.000Z",
    "updatedAt": "2025-11-08T15:00:00.000Z"
  },
  {
    "id": "bk-037",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000036",
    "serviceId": "lasik",
    "doctorId": "doc-4",
    "doctorName": "Prof. Karim Adel",
    "doctorDegree": "professor",
    "day": "2025-11-16",
    "timeSlot": "09-12",
    "cost": 1800,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-36",
        "type": "prescription",
        "fileName": "doc-36.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "pending_confirmation",
    "conversationId": "conv-037",
    "createdAt": "2025-11-01T16:00:00.000Z",
    "updatedAt": "2025-11-08T16:00:00.000Z"
  },
  {
    "id": "bk-038",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000037",
    "serviceId": "pediatric",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-17",
    "timeSlot": "12-15",
    "cost": 600,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T17:00:00.000Z",
    "updatedAt": "2025-11-08T17:00:00.000Z"
  },
  {
    "id": "bk-039",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000038",
    "serviceId": "optics",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-18",
    "timeSlot": "15-18",
    "cost": 300,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "conversationId": "conv-039",
    "createdAt": "2025-11-01T18:00:00.000Z",
    "updatedAt": "2025-11-08T18:00:00.000Z"
  },
  {
    "id": "bk-040",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000039",
    "serviceId": "cataract",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-19",
    "timeSlot": "18-21",
    "cost": 1500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T19:00:00.000Z",
    "updatedAt": "2025-11-08T19:00:00.000Z"
  },
  {
    "id": "bk-041",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000040",
    "serviceId": "retina",
    "doctorId": "doc-8",
    "doctorName": "Dr. Omar Farid",
    "doctorDegree": "consultant",
    "day": "2025-11-20",
    "timeSlot": "09-12",
    "cost": 900,
    "channel": "telegram",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-40",
        "type": "insurance_card",
        "fileName": "doc-40.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "draft_ai",
    "conversationId": "conv-041",
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-08T00:00:00.000Z"
  },
  {
    "id": "bk-042",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000041",
    "serviceId": "lasik",
    "doctorId": "doc-12",
    "doctorName": "Dr. Rami Kamel",
    "doctorDegree": "specialist",
    "day": "2025-11-22",
    "timeSlot": "12-15",
    "cost": 1100,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T01:00:00.000Z",
    "updatedAt": "2025-11-08T01:00:00.000Z"
  },
  {
    "id": "bk-043",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000042",
    "serviceId": "pediatric",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-08",
    "timeSlot": "15-18",
    "cost": 800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "conversationId": "conv-043",
    "createdAt": "2025-11-01T02:00:00.000Z",
    "updatedAt": "2025-11-08T02:00:00.000Z"
  },
  {
    "id": "bk-044",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000043",
    "serviceId": "optics",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-09",
    "timeSlot": "18-21",
    "cost": 400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T03:00:00.000Z",
    "updatedAt": "2025-11-08T03:00:00.000Z"
  },
  {
    "id": "bk-045",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000044",
    "serviceId": "cataract",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-10",
    "timeSlot": "09-12",
    "cost": 850,
    "channel": "manual",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-44",
        "type": "receipt",
        "fileName": "doc-44.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "no_show",
    "conversationId": "conv-045",
    "createdAt": "2025-11-01T04:00:00.000Z",
    "updatedAt": "2025-11-08T04:00:00.000Z"
  },
  {
    "id": "bk-046",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000045",
    "serviceId": "retina",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-11",
    "timeSlot": "12-15",
    "cost": 1200,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T05:00:00.000Z",
    "updatedAt": "2025-11-08T05:00:00.000Z"
  },
  {
    "id": "bk-047",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000046",
    "serviceId": "lasik",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-12",
    "timeSlot": "15-18",
    "cost": 1400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "conversationId": "conv-047",
    "createdAt": "2025-11-01T06:00:00.000Z",
    "updatedAt": "2025-11-08T06:00:00.000Z"
  },
  {
    "id": "bk-048",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000047",
    "serviceId": "pediatric",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-13",
    "timeSlot": "18-21",
    "cost": 450,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T07:00:00.000Z",
    "updatedAt": "2025-11-08T07:00:00.000Z"
  },
  {
    "id": "bk-049",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000048",
    "serviceId": "optics",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-15",
    "timeSlot": "09-12",
    "cost": 500,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-48",
        "type": "prescription",
        "fileName": "doc-48.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "cancelled",
    "conversationId": "conv-001",
    "createdAt": "2025-11-01T08:00:00.000Z",
    "updatedAt": "2025-11-08T08:00:00.000Z"
  },
  {
    "id": "bk-050",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000049",
    "serviceId": "cataract",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-15",
    "timeSlot": "12-15",
    "cost": 1100,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T09:00:00.000Z",
    "updatedAt": "2025-11-08T09:00:00.000Z"
  },
  {
    "id": "bk-051",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000050",
    "serviceId": "retina",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-16",
    "timeSlot": "15-18",
    "cost": 650,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "conversationId": "conv-003",
    "createdAt": "2025-11-01T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  },
  {
    "id": "bk-052",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000051",
    "serviceId": "lasik",
    "doctorId": "doc-4",
    "doctorName": "Prof. Karim Adel",
    "doctorDegree": "professor",
    "day": "2025-11-17",
    "timeSlot": "18-21",
    "cost": 1800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T11:00:00.000Z",
    "updatedAt": "2025-11-08T11:00:00.000Z"
  },
  {
    "id": "bk-053",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000000",
    "serviceId": "pediatric",
    "doctorId": "doc-5",
    "doctorName": "Dr. Huda Fathy",
    "doctorDegree": "consultant",
    "day": "2025-11-18",
    "timeSlot": "09-12",
    "cost": 600,
    "channel": "telegram",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-52",
        "type": "insurance_card",
        "fileName": "doc-52.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "confirmed",
    "conversationId": "conv-005",
    "createdAt": "2025-11-01T12:00:00.000Z",
    "updatedAt": "2025-11-08T12:00:00.000Z"
  },
  {
    "id": "bk-054",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000001",
    "serviceId": "optics",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-19",
    "timeSlot": "12-15",
    "cost": 300,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T13:00:00.000Z",
    "updatedAt": "2025-11-08T13:00:00.000Z"
  },
  {
    "id": "bk-055",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000002",
    "serviceId": "cataract",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-20",
    "timeSlot": "15-18",
    "cost": 1500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "conversationId": "conv-007",
    "createdAt": "2025-11-01T14:00:00.000Z",
    "updatedAt": "2025-11-08T14:00:00.000Z"
  },
  {
    "id": "bk-056",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000003",
    "serviceId": "retina",
    "doctorId": "doc-8",
    "doctorName": "Dr. Omar Farid",
    "doctorDegree": "consultant",
    "day": "2025-11-22",
    "timeSlot": "18-21",
    "cost": 900,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "draft_ai",
    "createdAt": "2025-11-01T15:00:00.000Z",
    "updatedAt": "2025-11-08T15:00:00.000Z"
  },
  {
    "id": "bk-057",
    "patientName": "Layla Hassan Omar Ali",
    "phone": "+201010000004",
    "serviceId": "lasik",
    "doctorId": "doc-12",
    "doctorName": "Dr. Rami Kamel",
    "doctorDegree": "specialist",
    "day": "2025-11-08",
    "timeSlot": "09-12",
    "cost": 1100,
    "channel": "manual",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-56",
        "type": "receipt",
        "fileName": "doc-56.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "pending_confirmation",
    "conversationId": "conv-009",
    "createdAt": "2025-11-01T16:00:00.000Z",
    "updatedAt": "2025-11-08T16:00:00.000Z"
  },
  {
    "id": "bk-058",
    "patientName": "Omar Khaled Al Farsi",
    "phone": "+201110000005",
    "serviceId": "pediatric",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-09",
    "timeSlot": "12-15",
    "cost": 800,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "createdAt": "2025-11-01T17:00:00.000Z",
    "updatedAt": "2025-11-08T17:00:00.000Z"
  },
  {
    "id": "bk-059",
    "patientName": "Sara Ahmed Nour Eid",
    "phone": "+201210000006",
    "serviceId": "optics",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-10",
    "timeSlot": "15-18",
    "cost": 400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "conversationId": "conv-011",
    "createdAt": "2025-11-01T18:00:00.000Z",
    "updatedAt": "2025-11-08T18:00:00.000Z"
  },
  {
    "id": "bk-060",
    "patientName": "Youssef Karim Samir Q",
    "phone": "+201510000007",
    "serviceId": "cataract",
    "doctorId": "doc-6",
    "doctorName": "Dr. Tamer Youssef",
    "doctorDegree": "specialist",
    "day": "2025-11-11",
    "timeSlot": "18-21",
    "cost": 850,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "no_show",
    "createdAt": "2025-11-01T19:00:00.000Z",
    "updatedAt": "2025-11-08T19:00:00.000Z"
  },
  {
    "id": "bk-061",
    "patientName": "Nour Ibrahim Saleh M",
    "phone": "+201010000008",
    "serviceId": "retina",
    "doctorId": "doc-1",
    "doctorName": "Prof. Amira Nabil",
    "doctorDegree": "professor",
    "day": "2025-11-12",
    "timeSlot": "09-12",
    "cost": 1200,
    "channel": "whatsapp",
    "attachmentCount": 1,
    "attachments": [
      {
        "id": "ba-60",
        "type": "prescription",
        "fileName": "doc-60.jpg",
        "url": "/brand/icon.png"
      }
    ],
    "status": "draft_ai",
    "conversationId": "conv-013",
    "createdAt": "2025-11-01T00:00:00.000Z",
    "updatedAt": "2025-11-08T00:00:00.000Z"
  },
  {
    "id": "bk-062",
    "patientName": "ليلى حسن عمر علي",
    "phone": "+201110000009",
    "serviceId": "lasik",
    "doctorId": "doc-2",
    "doctorName": "Dr. Hassan Farouk",
    "doctorDegree": "consultant",
    "day": "2025-11-13",
    "timeSlot": "12-15",
    "cost": 1400,
    "channel": "telegram",
    "attachmentCount": 0,
    "attachments": [],
    "status": "pending_confirmation",
    "createdAt": "2025-11-01T01:00:00.000Z",
    "updatedAt": "2025-11-08T01:00:00.000Z"
  },
  {
    "id": "bk-063",
    "patientName": "عمر خالد الفارسي محمد",
    "phone": "+201210000010",
    "serviceId": "pediatric",
    "doctorId": "doc-3",
    "doctorName": "Dr. Mona Said",
    "doctorDegree": "specialist",
    "day": "2025-11-15",
    "timeSlot": "15-18",
    "cost": 450,
    "channel": "manual",
    "attachmentCount": 0,
    "attachments": [],
    "status": "confirmed",
    "conversationId": "conv-015",
    "createdAt": "2025-11-01T02:00:00.000Z",
    "updatedAt": "2025-11-08T02:00:00.000Z"
  },
  {
    "id": "bk-064",
    "patientName": "سارة أحمد نور عيد",
    "phone": "+201510000011",
    "serviceId": "optics",
    "doctorId": "doc-7",
    "doctorName": "Prof. Nadia Selim",
    "doctorDegree": "professor",
    "day": "2025-11-15",
    "timeSlot": "18-21",
    "cost": 500,
    "channel": "whatsapp",
    "attachmentCount": 0,
    "attachments": [],
    "status": "cancelled",
    "createdAt": "2025-11-01T03:00:00.000Z",
    "updatedAt": "2025-11-08T03:00:00.000Z"
  }
] as Booking[]

export const SEED_AGENTS: Agent[] = [
  {
    "id": "agent-eye-care",
    "name": "Eye-care booking assistant",
    "description": "Handles appointment booking and clinic FAQs for the medical center.",
    "status": "live",
    "isActive": true,
    "defaultLanguage": "en",
    "persona": "Warm, concise, medically careful without giving diagnoses.",
    "modelPreset": "Balanced",
    "channelsConnected": [
      "whatsapp",
      "telegram"
    ],
    "conversationsToday": 86,
    "resolutionRate": 0.82,
    "lastEditedAt": "2025-11-12T14:00:00.000Z",
    "avatarTone": "ai",
    "instructions": {
      "tone": "Warm, concise, medically careful without giving diagnoses.",
      "languageBehavior": "auto",
      "welcomeMessage": "Welcome to i-care eye center. For a clear vision — I can help book appointments or answer clinic questions.",
      "boundaries": "Do not give medical diagnoses. Escalate clinical questions. Never invent prices outside the price table.",
      "characterLimit": 4000,
      "versions": [
        {
          "id": "ver-1",
          "label": "v1 — baseline",
          "body": "Welcome to i-care eye center. For a clear vision — I can help book appointments or answer clinic questions.",
          "savedAt": "2025-10-01T00:00:00.000Z"
        },
        {
          "id": "ver-2",
          "label": "v2 — welcome refresh",
          "body": "Welcome to i-care eye center. For a clear vision — I can help book appointments or answer clinic questions. How can I help today?",
          "savedAt": "2025-11-01T00:00:00.000Z"
        }
      ]
    },
    "escalationRules": [
      {
        "id": "rule-ask-human",
        "whenKey": "ask_human",
        "when": "Customer asks for a human",
        "then": "Handoff to call center",
        "enabled": true
      },
      {
        "id": "rule-failed",
        "whenKey": "failed_understandings",
        "when": "3 failed understandings",
        "then": "Offer human handoff",
        "enabled": true
      },
      {
        "id": "rule-complaint",
        "whenKey": "complaint",
        "when": "Complaint detected",
        "then": "Handoff to supervisor with transcript",
        "enabled": false
      }
    ],
    "performanceSeries": [
      55,
      60,
      65,
      70,
      75,
      80,
      55,
      60,
      65,
      70,
      75,
      80,
      55,
      60
    ]
  },
  {
    "id": "agent-triage",
    "name": "Results triage assistant",
    "description": "Routes exam results and receipt uploads to the results team.",
    "status": "paused",
    "isActive": false,
    "defaultLanguage": "ar",
    "persona": "Clear and reassuring in Arabic and English.",
    "modelPreset": "Balanced",
    "channelsConnected": [
      "whatsapp"
    ],
    "conversationsToday": 12,
    "resolutionRate": 0.71,
    "lastEditedAt": "2025-11-08T09:00:00.000Z",
    "avatarTone": "ai",
    "instructions": {
      "tone": "Warm, concise, medically careful without giving diagnoses.",
      "languageBehavior": "auto",
      "welcomeMessage": "مرحباً بك في مركز آي كير. يمكنني مساعدتك في استلام النتائج.",
      "boundaries": "Do not give medical diagnoses. Escalate clinical questions. Never invent prices outside the price table.",
      "characterLimit": 4000,
      "versions": [
        {
          "id": "ver-1",
          "label": "v1 — baseline",
          "body": "مرحباً بك في مركز آي كير. يمكنني مساعدتك في استلام النتائج.",
          "savedAt": "2025-10-01T00:00:00.000Z"
        },
        {
          "id": "ver-2",
          "label": "v2 — welcome refresh",
          "body": "مرحباً بك في مركز آي كير. يمكنني مساعدتك في استلام النتائج. How can I help today?",
          "savedAt": "2025-11-01T00:00:00.000Z"
        }
      ]
    },
    "escalationRules": [
      {
        "id": "rule-ask-human",
        "whenKey": "ask_human",
        "when": "Customer asks for a human",
        "then": "Handoff to call center",
        "enabled": true
      },
      {
        "id": "rule-failed",
        "whenKey": "failed_understandings",
        "when": "3 failed understandings",
        "then": "Offer human handoff",
        "enabled": true
      }
    ],
    "performanceSeries": [
      40,
      43,
      46,
      49,
      52,
      55,
      58,
      61,
      64,
      42,
      45,
      48,
      51,
      54
    ]
  },
  {
    "id": "agent-contracts-draft",
    "name": "Insurance contracts draft",
    "description": "Draft agent for insurance contract collection — not live yet.",
    "status": "draft",
    "isActive": false,
    "defaultLanguage": "en",
    "persona": "Precise about documents and coverage.",
    "modelPreset": "Fast",
    "channelsConnected": [],
    "conversationsToday": 0,
    "resolutionRate": 0,
    "lastEditedAt": "2025-11-05T11:00:00.000Z",
    "avatarTone": "ai",
    "instructions": {
      "tone": "Warm, concise, medically careful without giving diagnoses.",
      "languageBehavior": "auto",
      "welcomeMessage": "Welcome to i-care eye center insurance desk. Please share your contract card when ready.",
      "boundaries": "Do not give medical diagnoses. Escalate clinical questions. Never invent prices outside the price table.",
      "characterLimit": 4000,
      "versions": [
        {
          "id": "ver-1",
          "label": "v1 — baseline",
          "body": "Welcome to i-care eye center insurance desk. Please share your contract card when ready.",
          "savedAt": "2025-10-01T00:00:00.000Z"
        },
        {
          "id": "ver-2",
          "label": "v2 — welcome refresh",
          "body": "Welcome to i-care eye center insurance desk. Please share your contract card when ready. How can I help today?",
          "savedAt": "2025-11-01T00:00:00.000Z"
        }
      ]
    },
    "escalationRules": [
      {
        "id": "rule-complaint",
        "whenKey": "complaint",
        "when": "Complaint detected",
        "then": "Handoff to supervisor with transcript",
        "enabled": false
      }
    ],
    "performanceSeries": [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  }
] as Agent[]

export const SEED_KB: KnowledgeArticle[] = [
  {
    "id": "kb-1",
    "title": "Clinic hours – branch 1",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-01T00:00:00.000Z",
    "kind": "file",
    "status": "disabled",
    "usageCount": 0,
    "ownerName": "Layla Hassan",
    "fileName": "policy-1.pdf",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-2",
    "title": "سياسة التأمين 2",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-02T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 17,
    "ownerName": "Omar Al-Farsi",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-3",
    "title": "Clinic hours – branch 3",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-03T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 34,
    "ownerName": "Sara Ahmed",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-4",
    "title": "سياسة التأمين 4",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-04T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 51,
    "ownerName": "Youssef Karim",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-5",
    "title": "Clinic hours – branch 5",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-05T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 68,
    "ownerName": "Nour Eid",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-6",
    "title": "سياسة التأمين 6",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-06T00:00:00.000Z",
    "kind": "file",
    "status": "enabled",
    "usageCount": 85,
    "ownerName": "Hana Malik",
    "fileName": "policy-6.pdf",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-7",
    "title": "Clinic hours – branch 7",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-07T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 102,
    "ownerName": "Tariq Salim",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-8",
    "title": "سياسة التأمين 8",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-08T00:00:00.000Z",
    "kind": "article",
    "status": "disabled",
    "usageCount": 119,
    "ownerName": "Maya Joseph",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-9",
    "title": "Clinic hours – branch 9",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-09T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 16,
    "ownerName": "Adel Farouk",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-10",
    "title": "سياسة التأمين 10",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-10T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 33,
    "ownerName": "Rania Saleh",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-11",
    "title": "Clinic hours – branch 11",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-11T00:00:00.000Z",
    "kind": "file",
    "status": "enabled",
    "usageCount": 50,
    "ownerName": "Ibrahim Nasser",
    "fileName": "policy-11.pdf",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-12",
    "title": "سياسة التأمين 12",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-12T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 67,
    "ownerName": "Dina Samir",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-13",
    "title": "Clinic hours – branch 13",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-13T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 84,
    "ownerName": "Khalid Mansour",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-14",
    "title": "سياسة التأمين 14",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-14T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 101,
    "ownerName": "Leila Haddad",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-15",
    "title": "Clinic hours – branch 15",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-15T00:00:00.000Z",
    "kind": "article",
    "status": "disabled",
    "usageCount": 118,
    "ownerName": "Fadi Kanaan",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-16",
    "title": "سياسة التأمين 16",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-16T00:00:00.000Z",
    "kind": "file",
    "status": "enabled",
    "usageCount": 15,
    "ownerName": "Noor Alami",
    "fileName": "policy-16.pdf",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-17",
    "title": "Clinic hours – branch 17",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-17T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 32,
    "ownerName": "Samir Qasim",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-18",
    "title": "سياسة التأمين 18",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-18T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 49,
    "ownerName": "Huda Faris",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-19",
    "title": "Clinic hours – branch 19",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-19T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 66,
    "ownerName": "Ziad Rahman",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-20",
    "title": "سياسة التأمين 20",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-20T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 83,
    "ownerName": "Maya Haddad",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-21",
    "title": "Clinic hours – branch 21",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-21T00:00:00.000Z",
    "kind": "file",
    "status": "enabled",
    "usageCount": 100,
    "ownerName": "Layla Hassan",
    "fileName": "policy-21.pdf",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-22",
    "title": "سياسة التأمين 22",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "hours"
    ],
    "updatedAt": "2025-10-22T00:00:00.000Z",
    "kind": "article",
    "status": "disabled",
    "usageCount": 117,
    "ownerName": "Omar Al-Farsi",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-23",
    "title": "Clinic hours – branch 23",
    "body": "Sunday–Thursday 9:00–21:00. Friday closed.",
    "locale": "en",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-23T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 14,
    "ownerName": "Sara Ahmed",
    "agentId": "agent-eye-care"
  },
  {
    "id": "kb-24",
    "title": "سياسة التأمين 24",
    "body": "نقبل معظم شركات التأمين المحلية.",
    "locale": "ar",
    "tags": [
      "eye-care",
      "insurance"
    ],
    "updatedAt": "2025-10-24T00:00:00.000Z",
    "kind": "article",
    "status": "enabled",
    "usageCount": 31,
    "ownerName": "Youssef Karim",
    "agentId": "agent-eye-care"
  }
] as KnowledgeArticle[]

export const SEED_WORKFLOWS: Workflow[] = [
  {
    "id": "wf-new-checkup",
    "name": "New checkup",
    "description": "8-step checkup booking with cost and call-center handoff.",
    "steps": [
      {
        "id": "nc-1",
        "title": "Choose service",
        "description": "Retina, LASIK, pediatric, optics, cataract",
        "kind": "intent",
        "iconKey": "service",
        "order": 1
      },
      {
        "id": "nc-2",
        "title": "Patient name",
        "description": "Collect four-part name",
        "kind": "action",
        "iconKey": "user",
        "order": 2
      },
      {
        "id": "nc-3",
        "title": "Phone",
        "description": "Egyptian mobile",
        "kind": "action",
        "iconKey": "phone",
        "order": 3
      },
      {
        "id": "nc-4",
        "title": "Doctor degree",
        "description": "Professor / consultant / specialist",
        "kind": "action",
        "iconKey": "degree",
        "order": 4
      },
      {
        "id": "nc-5",
        "title": "Day",
        "description": "Sat–Thu only",
        "kind": "action",
        "iconKey": "calendar",
        "order": 5
      },
      {
        "id": "nc-6",
        "title": "Time slot",
        "description": "09–12 / 12–15 / 15–18 / 18–21",
        "kind": "action",
        "iconKey": "clock",
        "order": 6
      },
      {
        "id": "nc-7",
        "title": "Show cost",
        "description": "Price from service + degree",
        "kind": "action",
        "iconKey": "cost",
        "order": 7
      },
      {
        "id": "nc-8",
        "title": "Handoff to call center",
        "description": "Confirm booking with call center",
        "kind": "handoff",
        "iconKey": "handoff",
        "order": 8
      }
    ],
    "completionRate": 0.64,
    "stepDropoff": [
      {
        "stepId": "nc-1",
        "label": "Choose service",
        "count": 120
      },
      {
        "stepId": "nc-2",
        "label": "Patient name",
        "count": 102
      },
      {
        "stepId": "nc-3",
        "label": "Phone",
        "count": 83
      },
      {
        "stepId": "nc-4",
        "label": "Doctor degree",
        "count": 77
      },
      {
        "stepId": "nc-5",
        "label": "Day",
        "count": 58
      },
      {
        "stepId": "nc-6",
        "label": "Time slot",
        "count": 40
      },
      {
        "stepId": "nc-7",
        "label": "Show cost",
        "count": 34
      },
      {
        "stepId": "nc-8",
        "label": "Handoff to call center",
        "count": 15
      }
    ],
    "agentId": "agent-eye-care"
  },
  {
    "id": "wf-consultation",
    "name": "Consultation",
    "description": "7-step consultation with named doctor availability.",
    "steps": [
      {
        "id": "cs-1",
        "title": "Choose service",
        "description": "Consultation service",
        "kind": "intent",
        "iconKey": "service",
        "order": 1
      },
      {
        "id": "cs-2",
        "title": "Patient name",
        "description": "Four-part name",
        "kind": "action",
        "iconKey": "user",
        "order": 2
      },
      {
        "id": "cs-3",
        "title": "Phone",
        "description": "Egyptian mobile",
        "kind": "action",
        "iconKey": "phone",
        "order": 3
      },
      {
        "id": "cs-4",
        "title": "Doctor name",
        "description": "Named consultant only",
        "kind": "action",
        "iconKey": "doctor",
        "order": 4
      },
      {
        "id": "cs-5",
        "title": "Doctor available days",
        "description": "Only that doctor’s days",
        "kind": "action",
        "iconKey": "calendar",
        "order": 5
      },
      {
        "id": "cs-6",
        "title": "Time slot",
        "description": "Only that doctor’s slots",
        "kind": "action",
        "iconKey": "clock",
        "order": 6
      },
      {
        "id": "cs-7",
        "title": "Handoff with full report",
        "description": "Call center receives full report",
        "kind": "handoff",
        "iconKey": "handoff",
        "order": 7
      }
    ],
    "completionRate": 0.58,
    "stepDropoff": [
      {
        "stepId": "cs-1",
        "label": "Choose service",
        "count": 90
      },
      {
        "stepId": "cs-2",
        "label": "Patient name",
        "count": 75
      },
      {
        "stepId": "cs-3",
        "label": "Phone",
        "count": 60
      },
      {
        "stepId": "cs-4",
        "label": "Doctor name",
        "count": 58
      },
      {
        "stepId": "cs-5",
        "label": "Doctor available days",
        "count": 43
      },
      {
        "stepId": "cs-6",
        "label": "Time slot",
        "count": 28
      },
      {
        "stepId": "cs-7",
        "label": "Handoff with full report",
        "count": 25
      }
    ],
    "agentId": "agent-eye-care"
  },
  {
    "id": "wf-examination",
    "name": "Examination",
    "description": "8-step exam booking with prescription image.",
    "steps": [
      {
        "id": "ex-1",
        "title": "Choose service",
        "description": "Examination type",
        "kind": "intent",
        "iconKey": "service",
        "order": 1
      },
      {
        "id": "ex-2",
        "title": "Patient name",
        "description": "Four-part name",
        "kind": "action",
        "iconKey": "user",
        "order": 2
      },
      {
        "id": "ex-3",
        "title": "Phone",
        "description": "Egyptian mobile",
        "kind": "action",
        "iconKey": "phone",
        "order": 3
      },
      {
        "id": "ex-4",
        "title": "Prescription image",
        "description": "Upload prescription",
        "kind": "action",
        "iconKey": "image",
        "order": 4
      },
      {
        "id": "ex-5",
        "title": "Day",
        "description": "Sat–Thu",
        "kind": "action",
        "iconKey": "calendar",
        "order": 5
      },
      {
        "id": "ex-6",
        "title": "Time slot",
        "description": "Four buckets",
        "kind": "action",
        "iconKey": "clock",
        "order": 6
      },
      {
        "id": "ex-7",
        "title": "Show cost",
        "description": "Estimated exam cost",
        "kind": "action",
        "iconKey": "cost",
        "order": 7
      },
      {
        "id": "ex-8",
        "title": "Handoff",
        "description": "Handoff to call center",
        "kind": "handoff",
        "iconKey": "handoff",
        "order": 8
      }
    ],
    "completionRate": 0.61,
    "stepDropoff": [
      {
        "stepId": "ex-1",
        "label": "Choose service",
        "count": 100
      },
      {
        "stepId": "ex-2",
        "label": "Patient name",
        "count": 84
      },
      {
        "stepId": "ex-3",
        "label": "Phone",
        "count": 68
      },
      {
        "stepId": "ex-4",
        "label": "Prescription image",
        "count": 64
      },
      {
        "stepId": "ex-5",
        "label": "Day",
        "count": 48
      },
      {
        "stepId": "ex-6",
        "label": "Time slot",
        "count": 32
      },
      {
        "stepId": "ex-7",
        "label": "Show cost",
        "count": 28
      },
      {
        "stepId": "ex-8",
        "label": "Handoff",
        "count": 12
      }
    ],
    "agentId": "agent-eye-care"
  },
  {
    "id": "wf-receive-result",
    "name": "Receive result",
    "description": "5-step results delivery with optional receipt skip.",
    "steps": [
      {
        "id": "rr-1",
        "title": "Identify patient",
        "description": "Name or phone",
        "kind": "intent",
        "iconKey": "user",
        "order": 1
      },
      {
        "id": "rr-2",
        "title": "Exam reference",
        "description": "Link to prior exam",
        "kind": "action",
        "iconKey": "file",
        "order": 2
      },
      {
        "id": "rr-3",
        "title": "Optional receipt",
        "description": "Upload receipt or choose None to skip",
        "kind": "action",
        "iconKey": "receipt",
        "order": 3
      },
      {
        "id": "rr-4",
        "title": "Confirm delivery channel",
        "description": "WhatsApp / Telegram",
        "kind": "action",
        "iconKey": "channel",
        "order": 4
      },
      {
        "id": "rr-5",
        "title": "Handoff to results delivery",
        "description": "Results department",
        "kind": "handoff",
        "iconKey": "handoff",
        "order": 5
      }
    ],
    "completionRate": 0.72,
    "stepDropoff": [
      {
        "stepId": "rr-1",
        "label": "Identify patient",
        "count": 80
      },
      {
        "stepId": "rr-2",
        "label": "Exam reference",
        "count": 66
      },
      {
        "stepId": "rr-3",
        "label": "Optional receipt",
        "count": 53
      },
      {
        "stepId": "rr-4",
        "label": "Confirm delivery channel",
        "count": 51
      },
      {
        "stepId": "rr-5",
        "label": "Handoff to results delivery",
        "count": 38
      }
    ],
    "agentId": "agent-eye-care"
  },
  {
    "id": "wf-insurance",
    "name": "Insurance contracts",
    "description": "6-step insurance intake with optional documents.",
    "steps": [
      {
        "id": "in-1",
        "title": "Identify patient",
        "description": "Name and phone",
        "kind": "intent",
        "iconKey": "user",
        "order": 1
      },
      {
        "id": "in-2",
        "title": "Coverage question",
        "description": "What needs approval",
        "kind": "action",
        "iconKey": "help",
        "order": 2
      },
      {
        "id": "in-3",
        "title": "Optional prescription",
        "description": "Attach if available",
        "kind": "action",
        "iconKey": "image",
        "order": 3
      },
      {
        "id": "in-4",
        "title": "Optional contract card",
        "description": "Insurance card photo",
        "kind": "action",
        "iconKey": "card",
        "order": 4
      },
      {
        "id": "in-5",
        "title": "Summarize request",
        "description": "AI summary for contracts team",
        "kind": "action",
        "iconKey": "summary",
        "order": 5
      },
      {
        "id": "in-6",
        "title": "Handoff to contracts",
        "description": "Contracts department",
        "kind": "handoff",
        "iconKey": "handoff",
        "order": 6
      }
    ],
    "completionRate": 0.49,
    "stepDropoff": [
      {
        "stepId": "in-1",
        "label": "Identify patient",
        "count": 70
      },
      {
        "stepId": "in-2",
        "label": "Coverage question",
        "count": 58
      },
      {
        "stepId": "in-3",
        "label": "Optional prescription",
        "count": 45
      },
      {
        "stepId": "in-4",
        "label": "Optional contract card",
        "count": 45
      },
      {
        "stepId": "in-5",
        "label": "Summarize request",
        "count": 32
      },
      {
        "stepId": "in-6",
        "label": "Handoff to contracts",
        "count": 20
      }
    ],
    "agentId": "agent-eye-care"
  }
] as Workflow[]

export const SEED_TOOLS: AgentTool[] = [
  {
    "id": "tool-check-availability",
    "name": "Check availability",
    "description": "Query clinic calendar slots",
    "type": "calendar",
    "enabled": true
  },
  {
    "id": "tool-create-booking-draft",
    "name": "Create booking draft",
    "description": "Start an appointment draft in CRM",
    "type": "crm",
    "enabled": true
  },
  {
    "id": "tool-calculate-cost",
    "name": "Calculate cost",
    "description": "Price from service + doctor degree",
    "type": "custom",
    "enabled": true
  },
  {
    "id": "tool-handoff-department",
    "name": "Handoff to department",
    "description": "Route to call center, results, or contracts",
    "type": "custom",
    "enabled": true
  },
  {
    "id": "tool-send-confirmation",
    "name": "Send confirmation",
    "description": "Send booking confirmation on channel",
    "type": "http",
    "enabled": false
  }
] as AgentTool[]

export const SEED_CHANNELS: ChannelConnection[] = [
  {
    "channelType": "whatsapp",
    "status": "connected",
    "displayName": "Eye-care WhatsApp",
    "lastSyncAt": "2025-11-12T14:30:00.000Z",
    "configSummary": "Business API • webhook active",
    "health": "healthy",
    "lastMessageAt": "2025-11-12T14:28:00.000Z",
    "volumeTodaySeries": [
      4,
      8,
      12,
      9,
      15,
      18,
      14,
      11,
      16,
      20,
      17,
      13
    ],
    "webhookUrl": "https://api.icare.local/webhooks/whatsapp",
    "credentialsMasked": "wa_••••••••42"
  },
  {
    "channelType": "telegram",
    "status": "error",
    "displayName": "Support Telegram bot",
    "lastSyncAt": "2025-11-11T09:00:00.000Z",
    "configSummary": "Token invalid or webhook failed",
    "health": "down",
    "lastMessageAt": "2025-11-10T18:00:00.000Z",
    "volumeTodaySeries": [
      0,
      1,
      0,
      2,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0
    ],
    "webhookUrl": "https://api.icare.local/webhooks/telegram",
    "credentialsMasked": "tg_••••••••"
  }
] as ChannelConnection[]

export const SEED_TEAM: TeamMember[] = [
  {
    "id": "team-1",
    "name": "Layla Hassan",
    "email": "member1@icare.local",
    "roleId": "role-admin",
    "status": "invited"
  },
  {
    "id": "team-2",
    "name": "Omar Al-Farsi",
    "email": "member2@icare.local",
    "roleId": "role-agent",
    "status": "active"
  },
  {
    "id": "team-3",
    "name": "Sara Ahmed",
    "email": "member3@icare.local",
    "roleId": "role-agent",
    "status": "active"
  },
  {
    "id": "team-4",
    "name": "Youssef Karim",
    "email": "member4@icare.local",
    "roleId": "role-admin",
    "status": "active"
  },
  {
    "id": "team-5",
    "name": "Nour Eid",
    "email": "member5@icare.local",
    "roleId": "role-agent",
    "status": "active"
  },
  {
    "id": "team-6",
    "name": "Hana Malik",
    "email": "member6@icare.local",
    "roleId": "role-agent",
    "status": "invited"
  },
  {
    "id": "team-7",
    "name": "Tariq Salim",
    "email": "member7@icare.local",
    "roleId": "role-admin",
    "status": "active"
  },
  {
    "id": "team-8",
    "name": "Maya Joseph",
    "email": "member8@icare.local",
    "roleId": "role-agent",
    "status": "active"
  },
  {
    "id": "team-9",
    "name": "Adel Farouk",
    "email": "member9@icare.local",
    "roleId": "role-agent",
    "status": "active"
  },
  {
    "id": "team-10",
    "name": "Rania Saleh",
    "email": "member10@icare.local",
    "roleId": "role-admin",
    "status": "active"
  },
  {
    "id": "team-11",
    "name": "Ibrahim Nasser",
    "email": "member11@icare.local",
    "roleId": "role-agent",
    "status": "invited"
  },
  {
    "id": "team-12",
    "name": "Dina Samir",
    "email": "member12@icare.local",
    "roleId": "role-agent",
    "status": "active"
  }
] as TeamMember[]

export const SEED_ROLES: Role[] = [
  {
    "id": "role-admin",
    "name": "Administrator",
    "permissions": [
      "inbox.read",
      "inbox.takeover",
      "agents.write",
      "settings.write"
    ]
  },
  {
    "id": "role-agent",
    "name": "Agent",
    "permissions": [
      "inbox.read",
      "inbox.takeover"
    ]
  },
  {
    "id": "role-viewer",
    "name": "Viewer",
    "permissions": [
      "inbox.read"
    ]
  }
] as Role[]

export const SEED_GENERAL: GeneralSettings = {
  orgName: 'i-care Eye Center',
  defaultLanguage: 'en',
  timezone: 'Asia/Riyadh',
}

export const SEED_HOURS: BusinessHours = {
  timezone: 'Asia/Riyadh',
  slots: [0,1,2,3,4,5,6].map((day) => ({ day, open: '09:00', close: '21:00', enabled: day !== 5 })),
}

export const SEED_NOTIFICATION_PREFS: NotificationPreference[] = [
  { eventType: 'escalation.created', group: 'Handoffs', inApp: true, email: true },
  { eventType: 'escalation.sla', group: 'Handoffs', inApp: true, email: true },
  { eventType: 'assignment', group: 'Inbox', inApp: true, email: false },
  { eventType: 'message.waiting', group: 'Inbox', inApp: true, email: false },
  { eventType: 'booking.created', group: 'Bookings', inApp: true, email: true },
  { eventType: 'booking.cancelled', group: 'Bookings', inApp: false, email: true },
  { eventType: 'channel.error', group: 'Channels', inApp: true, email: true },
]

export const SEED_API_KEYS: ApiKeySummary[] = [
  {
    id: 'key-1',
    label: 'Production API',
    createdAt: new Date(Date.UTC(2025, 6, 1)).toISOString(),
    lastUsedAt: new Date().toISOString(),
    maskedKey: 'ic_live_••••••••42',
    revealedKey: 'ic_live_prod_reveal_42',
  },
  {
    id: 'key-2',
    label: 'Staging API',
    createdAt: new Date(Date.UTC(2025, 8, 12)).toISOString(),
    maskedKey: 'ic_test_••••••••19',
    revealedKey: 'ic_test_stage_reveal_19',
  },
]

export const SEED_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: 'wh-1',
    url: 'https://hooks.example.com/icare/events',
    events: ['escalation.created', 'booking.created'],
    active: true,
    lastTestAt: new Date(Date.UTC(2025, 10, 10)).toISOString(),
  },
  {
    id: 'wh-2',
    url: 'https://crm.example.com/webhooks/icare',
    events: ['customer.updated'],
    active: false,
  },
]

export const SEED_PERFORMANCE: PerformanceSnapshot = {
  "period": "Last 30 days",
  "conversationsTotal": 1240,
  "avgFirstResponseMs": 95000,
  "resolutionRate": 0.87,
  "aiDeflectionRate": 0.62
} as PerformanceSnapshot

export const SEED_VOLUME_SERIES: number[] = [40,47,54,61,68,40,47,54,61,68,40,47,54,61]

export const SEED_CHANNEL_MIX = [{"label":"WhatsApp","value":72},{"label":"Telegram","value":28}] as { label: string; value: number }[]

export const SEED_TOPIC_MIX = [{"label":"Appointments","value":48},{"label":"Insurance","value":22},{"label":"Hours","value":18},{"label":"Other","value":12}] as { label: string; value: number }[]

export const SEED_INSIGHTS: InsightPoint[] = [
  {
    "label": "D1",
    "value": 40,
    "series": [
      40
    ]
  },
  {
    "label": "D2",
    "value": 47,
    "series": [
      40,
      47
    ]
  },
  {
    "label": "D3",
    "value": 54,
    "series": [
      40,
      47,
      54
    ]
  },
  {
    "label": "D4",
    "value": 61,
    "series": [
      40,
      47,
      54,
      61
    ]
  },
  {
    "label": "D5",
    "value": 68,
    "series": [
      40,
      47,
      54,
      61,
      68
    ]
  },
  {
    "label": "D6",
    "value": 40,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40
    ]
  },
  {
    "label": "D7",
    "value": 47,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47
    ]
  },
  {
    "label": "D8",
    "value": 54,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54
    ]
  },
  {
    "label": "D9",
    "value": 61,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61
    ]
  },
  {
    "label": "D10",
    "value": 68,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61,
      68
    ]
  },
  {
    "label": "D11",
    "value": 40,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61,
      68,
      40
    ]
  },
  {
    "label": "D12",
    "value": 47,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61,
      68,
      40,
      47
    ]
  },
  {
    "label": "D13",
    "value": 54,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54
    ]
  },
  {
    "label": "D14",
    "value": 61,
    "series": [
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61,
      68,
      40,
      47,
      54,
      61
    ]
  }
] as InsightPoint[]

export const SEED_UNANSWERED: UnansweredTopic[] = [
  {
    "id": "uq-1",
    "topic": "Pricing",
    "question": "How much is LASIK package 1?",
    "count": 4,
    "lastAskedAt": "2025-11-12T10:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "LASIK pricing depends on doctor degree; share the price table and offer a consult.",
    "status": "dismissed",
    "sampleUtterances": [
      "Sample utterance 1"
    ]
  },
  {
    "id": "uq-2",
    "topic": "Specialist",
    "question": "Is there a pediatric specialist on day 2?",
    "count": 7,
    "lastAskedAt": "2025-11-11T11:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "Yes — pediatric specialists are available Sat–Thu; offer booking flow.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 2"
    ]
  },
  {
    "id": "uq-3",
    "topic": "Hours",
    "question": "Are you open Friday evening 3?",
    "count": 10,
    "lastAskedAt": "2025-11-10T12:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "Clinic is closed Fridays; offer Sat–Thu slots.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 3"
    ]
  },
  {
    "id": "uq-4",
    "topic": "Pricing",
    "question": "How much is LASIK package 4?",
    "count": 13,
    "lastAskedAt": "2025-11-09T13:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "LASIK pricing depends on doctor degree; share the price table and offer a consult.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 4"
    ]
  },
  {
    "id": "uq-5",
    "topic": "Specialist",
    "question": "Is there a pediatric specialist on day 5?",
    "count": 16,
    "lastAskedAt": "2025-11-08T14:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "Yes — pediatric specialists are available Sat–Thu; offer booking flow.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 5"
    ]
  },
  {
    "id": "uq-6",
    "topic": "Hours",
    "question": "Are you open Friday evening 6?",
    "count": 19,
    "lastAskedAt": "2025-11-07T15:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "Clinic is closed Fridays; offer Sat–Thu slots.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 6"
    ]
  },
  {
    "id": "uq-7",
    "topic": "Pricing",
    "question": "How much is LASIK package 7?",
    "count": 4,
    "lastAskedAt": "2025-11-06T16:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "LASIK pricing depends on doctor degree; share the price table and offer a consult.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 7"
    ]
  },
  {
    "id": "uq-8",
    "topic": "Specialist",
    "question": "Is there a pediatric specialist on day 8?",
    "count": 7,
    "lastAskedAt": "2025-11-05T17:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "Yes — pediatric specialists are available Sat–Thu; offer booking flow.",
    "status": "dismissed",
    "sampleUtterances": [
      "Sample utterance 8"
    ]
  },
  {
    "id": "uq-9",
    "topic": "Hours",
    "question": "Are you open Friday evening 9?",
    "count": 10,
    "lastAskedAt": "2025-11-04T10:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "Clinic is closed Fridays; offer Sat–Thu slots.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 9"
    ]
  },
  {
    "id": "uq-10",
    "topic": "Pricing",
    "question": "How much is LASIK package 10?",
    "count": 13,
    "lastAskedAt": "2025-11-03T11:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "LASIK pricing depends on doctor degree; share the price table and offer a consult.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 10"
    ]
  },
  {
    "id": "uq-11",
    "topic": "Specialist",
    "question": "Is there a pediatric specialist on day 11?",
    "count": 16,
    "lastAskedAt": "2025-11-12T12:00:00.000Z",
    "channel": "whatsapp",
    "suggestedAnswer": "Yes — pediatric specialists are available Sat–Thu; offer booking flow.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 11"
    ]
  },
  {
    "id": "uq-12",
    "topic": "Hours",
    "question": "Are you open Friday evening 12?",
    "count": 19,
    "lastAskedAt": "2025-11-11T13:00:00.000Z",
    "channel": "telegram",
    "suggestedAnswer": "Clinic is closed Fridays; offer Sat–Thu slots.",
    "status": "open",
    "sampleUtterances": [
      "Sample utterance 12"
    ]
  }
] as UnansweredTopic[]

export const SEED_CSAT: CsatSummary = {
  "score": 4.6,
  "responseCount": 320,
  "distribution": [
    {
      "label": "5",
      "value": 210
    },
    {
      "label": "4",
      "value": 70
    },
    {
      "label": "3",
      "value": 25
    },
    {
      "label": "2",
      "value": 10
    },
    {
      "label": "1",
      "value": 5
    }
  ],
  "trend": [
    {
      "label": "D1",
      "value": 4.2
    },
    {
      "label": "D2",
      "value": 4.3
    },
    {
      "label": "D3",
      "value": 4.4
    },
    {
      "label": "D4",
      "value": 4.5
    },
    {
      "label": "D5",
      "value": 4.6
    },
    {
      "label": "D6",
      "value": 4.2
    },
    {
      "label": "D7",
      "value": 4.3
    },
    {
      "label": "D8",
      "value": 4.4
    },
    {
      "label": "D9",
      "value": 4.5
    },
    {
      "label": "D10",
      "value": 4.6
    },
    {
      "label": "D11",
      "value": 4.2
    },
    {
      "label": "D12",
      "value": 4.3
    },
    {
      "label": "D13",
      "value": 4.4
    },
    {
      "label": "D14",
      "value": 4.5
    }
  ],
  "comments": [
    {
      "id": "csat-c-1",
      "rating": 1,
      "comment": "Very helpful booking assistant.",
      "sentiment": "negative",
      "at": "2025-11-12T12:00:00.000Z",
      "channel": "whatsapp"
    },
    {
      "id": "csat-c-2",
      "rating": 2,
      "comment": "Waited too long for a human.",
      "sentiment": "negative",
      "at": "2025-11-11T12:00:00.000Z",
      "channel": "telegram"
    },
    {
      "id": "csat-c-3",
      "rating": 3,
      "comment": "Clear answers about clinic hours.",
      "sentiment": "neutral",
      "at": "2025-11-10T12:00:00.000Z",
      "channel": "whatsapp"
    },
    {
      "id": "csat-c-4",
      "rating": 4,
      "comment": "Very helpful booking assistant.",
      "sentiment": "positive",
      "at": "2025-11-09T12:00:00.000Z",
      "channel": "telegram"
    },
    {
      "id": "csat-c-5",
      "rating": 5,
      "comment": "Waited too long for a human.",
      "sentiment": "positive",
      "at": "2025-11-08T12:00:00.000Z",
      "channel": "whatsapp"
    },
    {
      "id": "csat-c-6",
      "rating": 1,
      "comment": "Clear answers about clinic hours.",
      "sentiment": "negative",
      "at": "2025-11-07T12:00:00.000Z",
      "channel": "telegram"
    },
    {
      "id": "csat-c-7",
      "rating": 2,
      "comment": "Very helpful booking assistant.",
      "sentiment": "negative",
      "at": "2025-11-06T12:00:00.000Z",
      "channel": "whatsapp"
    },
    {
      "id": "csat-c-8",
      "rating": 3,
      "comment": "Waited too long for a human.",
      "sentiment": "neutral",
      "at": "2025-11-05T12:00:00.000Z",
      "channel": "telegram"
    },
    {
      "id": "csat-c-9",
      "rating": 4,
      "comment": "Clear answers about clinic hours.",
      "sentiment": "positive",
      "at": "2025-11-04T12:00:00.000Z",
      "channel": "whatsapp"
    },
    {
      "id": "csat-c-10",
      "rating": 5,
      "comment": "Very helpful booking assistant.",
      "sentiment": "positive",
      "at": "2025-11-03T12:00:00.000Z",
      "channel": "telegram"
    }
  ]
} as CsatSummary

export const SEED_RECENT_ESCALATIONS: Escalation[] = [
  {
    "id": "esc-001",
    "conversationId": "conv-001",
    "customerName": "Layla Hassan",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T00:00:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "call_center",
    "serviceId": "retina",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected retina; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T01:00:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000000",
    "doctorName": "Prof. Amira Nabil",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "09-12",
    "estimatedCost": "SAR 450",
    "timeline": [
      {
        "id": "tl-0-1",
        "at": "2025-11-10T00:00:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-0-2",
        "at": "2025-11-10T00:10:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-0",
        "at": "2025-11-10T00:00:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-002",
    "conversationId": "conv-002",
    "customerName": "عمر الفارسي",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T01:03:00.000Z",
    "department": "results",
    "serviceId": "lasik",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T05:03:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000001",
    "timeline": [
      {
        "id": "tl-1-1",
        "at": "2025-11-10T01:03:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-1-2",
        "at": "2025-11-10T01:13:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-003",
    "conversationId": "conv-003",
    "customerName": "Sara Ahmed",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T02:06:00.000Z",
    "resolvedAt": "2025-11-10T06:06:00.000Z",
    "department": "contracts",
    "serviceId": "pediatric",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T06:06:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000002",
    "timeline": [
      {
        "id": "tl-2-1",
        "at": "2025-11-10T02:06:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-2-2",
        "at": "2025-11-10T02:16:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-004",
    "conversationId": "conv-004",
    "customerName": "يوسف كريم",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T03:09:00.000Z",
    "department": "call_center",
    "serviceId": "optics",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected optics; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T07:09:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000003",
    "doctorName": "Prof. Karim Adel",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "18-21",
    "estimatedCost": "SAR 600",
    "timeline": [
      {
        "id": "tl-3-1",
        "at": "2025-11-10T03:09:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-3-2",
        "at": "2025-11-10T03:19:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-005",
    "conversationId": "conv-005",
    "customerName": "Nour Eid",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T04:12:00.000Z",
    "department": "results",
    "serviceId": "cataract",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T08:12:00.000Z",
    "slaTone": "warning",
    "patientPhone": "+201010000004",
    "timeline": [
      {
        "id": "tl-4-1",
        "at": "2025-11-10T04:12:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-4-2",
        "at": "2025-11-10T04:22:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": [
      {
        "id": "note-4",
        "at": "2025-11-10T04:12:00.000Z",
        "author": "AI",
        "body": "Patient prefers Arabic replies."
      }
    ]
  },
  {
    "id": "esc-006",
    "conversationId": "conv-006",
    "customerName": "هناء مالك",
    "reason": "Insurance card + prescription verification",
    "priority": "high",
    "status": "resolved",
    "openedAt": "2025-11-10T05:15:00.000Z",
    "resolvedAt": "2025-11-10T07:15:00.000Z",
    "notes": "Follow up with clinic reception.",
    "department": "contracts",
    "serviceId": "retina",
    "aiSummary": "Insurance card + prescription verification",
    "aiSummaryDetail": "Insurance documents attached; AI requested medical approval.",
    "attachmentCount": 2,
    "slaDueAt": "2025-11-10T09:15:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000005",
    "timeline": [
      {
        "id": "tl-5-1",
        "at": "2025-11-10T05:15:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-5-2",
        "at": "2025-11-10T05:25:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-007",
    "conversationId": "conv-007",
    "customerName": "Tariq Salim",
    "reason": "Confirm checkup booking and cost",
    "priority": "low",
    "status": "open",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T06:18:00.000Z",
    "department": "call_center",
    "serviceId": "lasik",
    "aiSummary": "Confirm checkup booking and cost",
    "aiSummaryDetail": "Patient selected lasik; AI collected slot and estimated cost.",
    "attachmentCount": 0,
    "slaDueAt": "2025-11-10T10:18:00.000Z",
    "slaTone": "ok",
    "patientPhone": "+201010000006",
    "doctorName": "Prof. Nadia Selim",
    "appointmentDay": "2025-11-18",
    "appointmentSlot": "15-18",
    "estimatedCost": "SAR 750",
    "timeline": [
      {
        "id": "tl-6-1",
        "at": "2025-11-10T06:18:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-6-2",
        "at": "2025-11-10T06:28:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  },
  {
    "id": "esc-008",
    "conversationId": "conv-008",
    "customerName": "مايا جوزيف",
    "reason": "Visual field result ready for review",
    "priority": "normal",
    "status": "assigned",
    "assignedUserId": "user-supervisor",
    "assigneeName": "Ahmed Supervisor",
    "openedAt": "2025-11-10T07:21:00.000Z",
    "department": "results",
    "serviceId": "pediatric",
    "aiSummary": "Visual field result ready for review",
    "aiSummaryDetail": "Exam results are ready; patient asked for human explanation.",
    "attachmentCount": 1,
    "slaDueAt": "2025-11-10T08:21:00.000Z",
    "slaTone": "critical",
    "patientPhone": "+201010000007",
    "timeline": [
      {
        "id": "tl-7-1",
        "at": "2025-11-10T07:21:00.000Z",
        "label": "AI opened handoff"
      },
      {
        "id": "tl-7-2",
        "at": "2025-11-10T07:31:00.000Z",
        "label": "Queued to department"
      }
    ],
    "internalNotes": []
  }
] as Escalation[]
