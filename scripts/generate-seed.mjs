import fs from 'node:fs'
import path from 'node:path'

const out = path.resolve(import.meta.dirname, '..', 'src/infrastructure/data/dummy/seed.generated.ts')

const enNames = [
  'Layla Hassan', 'Omar Al-Farsi', 'Sara Ahmed', 'Youssef Karim', 'Nour Eid',
  'Hana Malik', 'Tariq Salim', 'Maya Joseph', 'Adel Farouk', 'Rania Saleh',
  'Ibrahim Nasser', 'Dina Samir', 'Khalid Mansour', 'Leila Haddad', 'Fadi Kanaan',
  'Noor Alami', 'Samir Qasim', 'Huda Faris', 'Ziad Rahman', 'Maya Haddad',
]
const arNames = [
  'ليلى حسن', 'عمر الفارسي', 'سارة أحمد', 'يوسف كريم', 'نور عيد',
  'هناء مالك', 'طارق سليم', 'مايا جوزيف', 'عادل فاروق', 'رانيا صالح',
  'إبراهيم ناصر', 'دينا سمير', 'خالد منصور', 'ليلى حداد', 'فادي كنعان',
  'نور علمي', 'سمير قاسم', 'هدى فارس', 'زياد رحمن', 'مايا حداد',
]

const channels = ['whatsapp', 'telegram']
const statuses = ['open', 'waiting_human', 'ai_active', 'resolved', 'archived']
const handlers = ['ai', 'human', 'unassigned']
const priorities = ['low', 'normal', 'high']
const escStatuses = ['open', 'assigned', 'resolved']
const services = ['retina', 'lasik', 'pediatric', 'optics', 'cataract']
const attachmentTypes = ['prescription', 'insurance_card', 'receipt']
const departments = ['call_center', 'results', 'contracts']
const tagPool = ['vip', 'eye-care', 'new', 'insurance', 'follow-up', 'urgent']

const pick = (arr, i) => arr[i % arr.length]

const previewsEn = [
  'Can I book a retina check this week?',
  'Need LASIK pricing and available surgeons',
  'Reschedule my pediatric eye exam',
  'Insurance card attached — please confirm coverage',
  'Where is the Riyadh clinic and Friday hours?',
]
const previewsAr = [
  'أريد موعداً لفحص الشبكية غداً',
  'كم تكلفة عملية الليزك؟',
  'أحتاج إعادة جدولة موعد طفلتي',
  'أرسلت بطاقة التأمين — هل التغطية سارية؟',
  'هل العيادة مفتوحة يوم الجمعة؟',
]

const doctorNames = [
  'Dr. Amira Hassan',
  'Dr. Karim Fawzy',
  'Dr. Nadia Selim',
  'Dr. Omar Farid',
  'Dr. Laila Mansour',
  'Dr. Youssef Nabil',
]
const intents = [
  'book_appointment',
  'insurance_check',
  'reschedule',
  'results_followup',
  'clinic_hours',
]
const attachmentKinds = ['prescription', 'card', 'receipt']

const customers = Array.from({ length: 52 }, (_, i) => {
  const id = `cust-${String(i + 1).padStart(3, '0')}`
  const en = pick(enNames, i)
  const ar = pick(arNames, i)
  const isAr = i % 2 === 1
  const status = i % 17 === 0 ? 'blocked' : i % 11 === 0 ? 'inactive' : 'active'
  const hasInsurance = i % 3 === 0 || i % 4 === 0
  const tags = [
    ...(i % 5 === 0 ? ['vip', 'eye-care'] : []),
    ...(i % 7 === 0 ? ['new'] : []),
    ...(hasInsurance ? ['insurance'] : []),
    ...(i % 13 === 0 ? ['flagged'] : []),
    ...(i % 9 === 0 ? ['follow-up'] : []),
  ].filter((t, idx, arr) => arr.indexOf(t) === idx)
  const createdAt = new Date(Date.UTC(2025, 8 + (i % 3), (i % 28) + 1))
  const lastSeenAt = new Date(Date.UTC(2025, 10, (i % 28) + 1, i % 20))
  const noteCount = (i % 4) + 1
  const notes = Array.from({ length: noteCount }, (_, n) => ({
    id: `cnote-${i + 1}-${n + 1}`,
    body:
      n === 0
        ? isAr
          ? 'يفضل التواصل صباحاً عبر واتساب.'
          : 'Prefers morning WhatsApp follow-ups.'
        : `Internal note ${n + 1} for ${id}.`,
    pinned: n === 0,
    createdAt: new Date(Date.UTC(2025, 10, (n % 20) + 1)).toISOString(),
    updatedAt: new Date(Date.UTC(2025, 10, (n % 20) + 2)).toISOString(),
  }))
  const attCount = i % 6
  const attachments = Array.from({ length: attCount }, (_, a) => ({
    id: `catt-${i + 1}-${a + 1}`,
    kind: pick(attachmentKinds, i + a),
    label: `${pick(attachmentKinds, i + a)}-${a + 1}`,
    url: '/brand/icon.png',
    createdAt: new Date(Date.UTC(2025, 9, (a % 20) + 1)).toISOString(),
  }))
  const activity = [
    {
      id: `cact-${i + 1}-1`,
      type: 'conversation',
      title: isAr ? 'محادثة جديدة' : 'New conversation opened',
      at: lastSeenAt.toISOString(),
    },
    {
      id: `cact-${i + 1}-2`,
      type: 'booking',
      title: isAr ? 'حجز موعد' : 'Appointment booking',
      at: new Date(Date.UTC(2025, 10, Math.max(1, (i % 28) - 2))).toISOString(),
    },
    ...(i % 2 === 0
      ? [
          {
            id: `cact-${i + 1}-3`,
            type: 'note',
            title: isAr ? 'ملاحظة داخلية' : 'Internal note added',
            at: notes[0].createdAt,
          },
        ]
      : []),
  ]
  return {
    id,
    displayName: isAr ? ar : en,
    phone: `+201${pick(['0', '1', '2', '5'], i)}${String(10000000 + i).slice(0, 8)}`,
    email: i % 3 === 0 ? `user${i + 1}@example.com` : undefined,
    preferredLanguage: isAr ? 'ar' : 'en',
    tags,
    createdAt: createdAt.toISOString(),
    lastSeenAt: lastSeenAt.toISOString(),
    channels:
      i % 5 === 0
        ? [
            { channelType: 'whatsapp', externalId: `wa-${i + 1}` },
            { channelType: 'telegram', externalId: `tg-${i + 1}` },
          ]
        : [{ channelType: pick(channels, i), externalId: `ext-${i + 1}` }],
    status,
    satisfaction: (i % 5) + 1,
    hasInsurance,
    lastServiceId: pick(services, i),
    totalBookings: 0,
    totalConversations: 0,
    flagged: status === 'blocked' || tags.includes('flagged'),
    notes,
    attachments,
    activity,
    aiProfile: {
      preferences: isAr
        ? 'يفضل العربية، مواعيد مسائية، تذكير قبل الموعد.'
        : 'Prefers evening slots and appointment reminders.',
      frequentDoctorName: pick(doctorNames, i),
      language: isAr ? 'ar' : 'en',
      lastIntent: pick(intents, i),
    },
  }
})

const conversations = Array.from({ length: 48 }, (_, i) => {
  const customer = customers[i % customers.length]
  const status = pick(statuses, i)
  let handler =
    status === 'waiting_human'
      ? 'unassigned'
      : status === 'ai_active'
        ? 'ai'
        : status === 'resolved' || status === 'archived'
          ? pick(['ai', 'human'], i)
          : pick(handlers, i)
  if (i % 11 === 0) handler = 'human'
  if (i % 13 === 0) {
    handler = 'ai'
  }
  const serviceId = pick(services, i)
  const isAr = customer.preferredLanguage === 'ar'
  const slaWarning = i % 8 === 0
  const slaCritical = i % 17 === 0
  return {
    id: `conv-${String(i + 1).padStart(3, '0')}`,
    customerId: customer.id,
    customerName: customer.displayName,
    channelType: pick(channels, i),
    status,
    handler,
    assignedUserId: handler === 'human' ? 'user-supervisor' : undefined,
    assigneeName: handler === 'human' ? 'Ahmed Supervisor' : undefined,
    agentId: handler === 'ai' || status === 'ai_active' ? 'agent-eye-care' : undefined,
    subject:
      i % 5 === 0
        ? 'Appointment booking'
        : i % 5 === 1
          ? 'Insurance coverage'
          : i % 5 === 2
            ? 'LASIK inquiry'
            : i % 5 === 3
              ? 'Reschedule'
              : 'Clinic hours',
    lastMessageAt: new Date(Date.UTC(2025, 10, 12, i % 24, (i * 7) % 60)).toISOString(),
    unreadCount: i % 5 === 0 ? 0 : (i % 4) + 1,
    escalationId: i % 9 === 0 ? `esc-${String((i % 35) + 1).padStart(3, '0')}` : undefined,
    lastMessagePreview: isAr ? pick(previewsAr, i) : pick(previewsEn, i),
    aiReasoning:
      handler === 'ai'
        ? 'User intent: book_appointment. Suggested slot search via check_availability.'
        : undefined,
    serviceId,
    tags: [pick(tagPool, i), ...(i % 3 === 0 ? ['eye-care'] : [])].filter(
      (t, idx, arr) => arr.indexOf(t) === idx,
    ),
    slaDueAt: slaWarning || slaCritical
      ? new Date(Date.UTC(2025, 10, 12, (i % 24) + 1)).toISOString()
      : undefined,
    slaTone: slaCritical ? 'critical' : slaWarning ? 'warning' : 'ok',
    isTyping: handler === 'ai' && i % 10 === 0,
    locale: isAr ? 'ar' : 'en',
  }
})

const messages = []
for (let ci = 0; ci < conversations.length; ci += 1) {
  const conv = conversations[ci]
  const base = new Date(Date.UTC(2025, 10, 12, ci % 20, 0)).getTime()
  const isAr = conv.locale === 'ar'
  const thread = [
    {
      senderType: 'customer',
      direction: 'inbound',
      body: conv.lastMessagePreview,
      metadata: { kind: 'text' },
    },
    {
      senderType: 'ai',
      direction: 'outbound',
      body: isAr
        ? 'مرحباً، يمكنني مساعدتك في حجز الموعد. ما الخدمة المطلوبة؟'
        : 'Hi! I can help book an appointment. Which service do you need?',
      metadata: { kind: 'text' },
    },
    {
      senderType: 'customer',
      direction: 'inbound',
      body: isAr ? `خدمة ${conv.serviceId}` : `Looking for ${conv.serviceId} care`,
      metadata: { kind: 'text' },
    },
    {
      senderType: 'ai',
      direction: 'outbound',
      body: isAr
        ? 'تم العثور على مواعيد متاحة يوم الثلاثاء. هل يناسبك؟'
        : 'I found openings on Tuesday. Does that work?',
      metadata: { kind: 'text' },
    },
  ]

  if (ci % 3 === 0) {
    const att = pick(attachmentTypes, ci)
    thread.push({
      senderType: 'customer',
      direction: 'inbound',
      body: isAr ? 'مرفق صورة' : `Attached ${att.replace('_', ' ')}`,
      metadata: {
        kind: 'attachment',
        attachmentType: att,
        url: '/brand/icon.png',
        fileName: `${att}-${conv.id}.jpg`,
        mimeType: 'image/jpeg',
      },
    })
  }

  if (conv.handler === 'human' || conv.status === 'waiting_human') {
    thread.push({
      senderType: 'system',
      direction: 'outbound',
      body:
        conv.status === 'waiting_human'
          ? isAr
            ? 'تم تحويل المحادثة إلى العقود'
            : 'AI handed off to Contracts'
          : isAr
            ? 'تولى أحمد المحادثة'
            : 'Ahmed took over',
      metadata: { kind: 'system' },
    })
  }

  if (conv.handler === 'human') {
    thread.push({
      senderType: 'agent',
      direction: 'outbound',
      body: isAr
        ? 'مرحباً، أنا أحمد من مركز العناية بالعيون. سأكمل الحجز معك.'
        : "Hello, I'm Ahmed from i-care. I'll finish the booking with you.",
      metadata: { kind: 'text' },
    })
  }

  thread.forEach((msg, mi) => {
    messages.push({
      id: `msg-${conv.id}-${mi}`,
      conversationId: conv.id,
      direction: msg.direction,
      senderType: msg.senderType,
      body: msg.body,
      sentAt: new Date(base + mi * 90_000).toISOString(),
      metadata: msg.metadata,
    })
  })
}

const bookingDrafts = conversations
  .filter((_, i) => i % 2 === 0 || conversations[i].subject === 'Appointment booking')
  .map((conv, idx) => {
    const filled = 3 + (idx % 6)
    const fields = {
      fourPartName: filled >= 1 ? conv.customerName : undefined,
      phone: filled >= 2 ? customers.find((c) => c.id === conv.customerId)?.phone : undefined,
      serviceId: filled >= 3 ? conv.serviceId : undefined,
      doctorDegree: filled >= 4 ? (idx % 2 === 0 ? 'Consultant' : 'Specialist') : undefined,
      day: filled >= 5 ? 'Tuesday' : undefined,
      timeSlot: filled >= 6 ? '10:00–11:00' : undefined,
      estimatedCost: filled >= 7 ? 'SAR 450' : undefined,
      attachmentCount: filled >= 8 ? 1 : filled >= 3 && idx % 3 === 0 ? 1 : 0,
    }
    const stepIndex = Math.min(8, filled)
    let confirmationState = 'collecting'
    if (stepIndex >= 8) confirmationState = idx % 3 === 0 ? 'confirmed' : 'awaiting_confirm'
    else if (stepIndex >= 6 && idx % 5 === 0) confirmationState = 'editing'
    return {
      conversationId: conv.id,
      ...fields,
      stepIndex,
      stepTotal: 8,
      confirmationState,
    }
  })

const aiInsights = conversations
  .filter((c) => c.handler === 'ai' || c.status === 'ai_active' || c.status === 'waiting_human')
  .map((conv, idx) => ({
    conversationId: conv.id,
    intent:
      conv.subject === 'Appointment booking'
        ? 'book_appointment'
        : conv.subject === 'Insurance coverage'
          ? 'check_insurance'
          : conv.subject === 'Reschedule'
            ? 'reschedule_appointment'
            : 'general_inquiry',
    confidence: Number((0.62 + (idx % 30) / 100).toFixed(2)),
    reasoningSummary:
      conv.locale === 'ar'
        ? 'المريض يطلب جدولة خدمة طب عيون. تم جمع الخدمة وجاري تأكيد الموعد.'
        : 'Patient is scheduling eye-care service. Service captured; confirming slot and cost.',
    toolsUsed:
      idx % 2 === 0
        ? ['check_availability', 'book_slot']
        : ['fetch_insurance', 'escalate_to_human'],
    handoffReason:
      conv.status === 'waiting_human'
        ? 'Patient requested human / insurance complexity'
        : undefined,
    handoffDepartment:
      conv.status === 'waiting_human' ? pick(departments, idx) : undefined,
  }))

const fourPartNames = [
  'Layla Hassan Omar Ali',
  'Omar Khaled Al Farsi',
  'Sara Ahmed Nour Eid',
  'Youssef Karim Samir Q',
  'Nour Ibrahim Saleh M',
  'ليلى حسن عمر علي',
  'عمر خالد الفارسي محمد',
  'سارة أحمد نور عيد',
]

const slots = ['09-12', '12-15', '15-18', '18-21']
const bookingStatuses = ['draft_ai', 'pending_confirmation', 'confirmed', 'cancelled', 'no_show']
const degrees = ['professor', 'consultant', 'specialist']
const priceTable = {
  retina: { professor: 1200, consultant: 900, specialist: 650 },
  lasik: { professor: 1800, consultant: 1400, specialist: 1100 },
  pediatric: { professor: 800, consultant: 600, specialist: 450 },
  optics: { professor: 500, consultant: 400, specialist: 300 },
  cataract: { professor: 1500, consultant: 1100, specialist: 850 },
}

const makeSlotGrid = (days) => {
  const grid = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  for (const day of days) {
    if (day === 5) continue
    grid[day] = [...slots]
  }
  return grid
}

const doctorSeedMeta = [
  { id: 'doc-1', name: 'Prof. Amira Nabil', degree: 'professor', services: ['retina', 'cataract'], days: [0, 1, 2, 3, 4], specialty: 'Retina' },
  { id: 'doc-2', name: 'Dr. Hassan Farouk', degree: 'consultant', services: ['lasik', 'optics'], days: [0, 1, 2, 3], specialty: 'Refractive' },
  { id: 'doc-3', name: 'Dr. Mona Said', degree: 'specialist', services: ['pediatric', 'optics'], days: [1, 2, 3, 4], specialty: 'Pediatric' },
  { id: 'doc-4', name: 'Prof. Karim Adel', degree: 'professor', services: ['lasik', 'retina'], days: [0, 2, 3, 4], specialty: 'Cornea' },
  { id: 'doc-5', name: 'Dr. Huda Fathy', degree: 'consultant', services: ['cataract', 'pediatric'], days: [0, 1, 3, 4], specialty: 'Cataract' },
  { id: 'doc-6', name: 'Dr. Tamer Youssef', degree: 'specialist', services: ['retina', 'optics', 'cataract'], days: [0, 1, 2, 4], specialty: 'General' },
  { id: 'doc-7', name: 'Prof. Nadia Selim', degree: 'professor', services: ['pediatric', 'optics'], days: [0, 1, 2, 3], specialty: 'Pediatric' },
  { id: 'doc-8', name: 'Dr. Omar Farid', degree: 'consultant', services: ['retina', 'lasik'], days: [0, 2, 3, 4], specialty: 'Retina' },
  { id: 'doc-9', name: 'Dr. Laila Mansour', degree: 'specialist', services: ['cataract', 'optics'], days: [1, 2, 3, 4], specialty: 'Cataract' },
  { id: 'doc-10', name: 'Prof. Youssef Nabil', degree: 'professor', services: ['cataract', 'lasik'], days: [0, 1, 3, 4], specialty: 'Anterior segment' },
  { id: 'doc-11', name: 'Dr. Sara Helmy', degree: 'consultant', services: ['optics', 'pediatric'], days: [0, 1, 2, 4], specialty: 'Optics' },
  { id: 'doc-12', name: 'Dr. Rami Kamel', degree: 'specialist', services: ['lasik', 'retina'], days: [0, 1, 2, 3], specialty: 'Refractive', status: 'inactive' },
]

const doctors = doctorSeedMeta.map((d) => {
  const slotGrid = makeSlotGrid(d.days)
  const primaryService = d.services[0]
  return {
    id: d.id,
    name: d.name,
    degree: d.degree,
    services: d.services,
    availableDays: d.days.filter((day) => day !== 5),
    specialty: d.specialty,
    status: d.status ?? 'active',
    consultationPrice: priceTable[primaryService][d.degree],
    slotGrid,
    bookingsCount: 0,
  }
})

const clinicServices = [
  {
    id: 'retina',
    nameKey: 'serviceRetina',
    active: true,
    prices: { ...priceTable.retina },
    attachments: [
      { type: 'prescription', required: false, optional: true },
      { type: 'insurance_card', required: false, optional: true },
      { type: 'receipt', required: false, optional: true },
    ],
  },
  {
    id: 'lasik',
    nameKey: 'serviceLasik',
    active: true,
    prices: { ...priceTable.lasik },
    attachments: [
      { type: 'prescription', required: true, optional: false },
      { type: 'insurance_card', required: false, optional: true },
      { type: 'receipt', required: false, optional: true },
    ],
  },
  {
    id: 'pediatric',
    nameKey: 'servicePediatric',
    active: true,
    prices: { ...priceTable.pediatric },
    attachments: [
      { type: 'prescription', required: false, optional: true },
      { type: 'insurance_card', required: false, optional: true },
      { type: 'receipt', required: false, optional: true },
    ],
  },
  {
    id: 'optics',
    nameKey: 'serviceOptics',
    active: true,
    prices: { ...priceTable.optics },
    attachments: [
      { type: 'prescription', required: true, optional: false },
      { type: 'insurance_card', required: false, optional: true },
      { type: 'receipt', required: false, optional: true },
    ],
  },
  {
    id: 'cataract',
    nameKey: 'serviceCataract',
    active: true,
    prices: { ...priceTable.cataract },
    attachments: [
      { type: 'prescription', required: true, optional: false },
      { type: 'insurance_card', required: true, optional: false },
      { type: 'receipt', required: false, optional: true },
    ],
  },
]

const clinicDepartments = [
  {
    id: 'call_center',
    name: 'Call center',
    members: [
      { id: 'm-cc-1', name: 'Ahmed Supervisor', role: 'Lead' },
      { id: 'm-cc-2', name: 'Nour Agent', role: 'Agent' },
      { id: 'm-cc-3', name: 'Sara Agent', role: 'Agent' },
    ],
    workingHours: 'Sat–Thu 09:00–21:00',
    handoffRules: [
      'Confirm checkup booking and cost',
      'Accept consultation with full report',
      'Return incomplete drafts to AI',
    ],
  },
  {
    id: 'results',
    name: 'Results delivery',
    members: [
      { id: 'm-rs-1', name: 'Hana Results', role: 'Lead' },
      { id: 'm-rs-2', name: 'Omar Courier', role: 'Agent' },
    ],
    workingHours: 'Sat–Thu 10:00–18:00',
    handoffRules: [
      'Deliver examination results',
      'Optional receipt with None skip',
      'Escalate clinical questions',
    ],
  },
  {
    id: 'contracts',
    name: 'Contracts',
    members: [
      { id: 'm-ct-1', name: 'Laila Contracts', role: 'Lead' },
      { id: 'm-ct-2', name: 'Karim Reviewer', role: 'Agent' },
    ],
    workingHours: 'Sat–Thu 09:00–17:00',
    handoffRules: [
      'Review insurance + prescription',
      'Optional contract card',
      'Approve or request more documents',
    ],
  },
]

const clinicSchedule = {
  timezone: 'Africa/Cairo',
  weekly: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    day,
    open: '09:00',
    close: '21:00',
    enabled: day !== 5,
  })),
  holidays: [
    { id: 'hol-1', date: '2025-12-25', label: 'Christmas' },
    { id: 'hol-2', date: '2026-01-01', label: 'New Year' },
    { id: 'hol-3', date: '2026-01-07', label: 'Coptic Christmas' },
  ],
  exceptions: [
    { id: 'ex-1', date: '2025-11-20', closed: true, label: 'Staff training' },
    { id: 'ex-2', date: '2025-11-27', closed: false, open: '10:00', close: '16:00', label: 'Short day' },
  ],
  timeSlots: [
    { id: '09-12', label: '09:00 – 12:00' },
    { id: '12-15', label: '12:00 – 15:00' },
    { id: '15-18', label: '15:00 – 18:00' },
    { id: '18-21', label: '18:00 – 21:00' },
  ],
}

const handoffReasons = {
  call_center: ['Confirm checkup booking and cost', 'New consultation slot confirmation', 'Examination booking needs cost review'],
  results: ['Deliver examination result to patient', 'Visual field result ready for review', 'OCT scan result requires explanation'],
  contracts: ['Insurance contract review with prescription', 'Medical approval for LASIK coverage', 'Insurance card + prescription verification'],
}

const escalations = Array.from({ length: 36 }, (_, i) => {
  const conv = conversations[i % conversations.length]
  const department = pick(departments, i)
  const status = pick(escStatuses, i)
  const slaTone = i % 7 === 0 ? 'critical' : i % 4 === 0 ? 'warning' : 'ok'
  const openedAt = new Date(Date.UTC(2025, 10, 10, i % 20, (i * 3) % 60))
  const doctor = pick(doctors, i)
  return {
    id: `esc-${String(i + 1).padStart(3, '0')}`,
    conversationId: conv.id,
    customerName: conv.customerName,
    reason: pick(handoffReasons[department], i),
    priority: pick(priorities, i),
    status,
    assignedUserId: status === 'assigned' || i % 3 === 0 ? 'user-supervisor' : undefined,
    assigneeName: status === 'assigned' || i % 3 === 0 ? 'Ahmed Supervisor' : undefined,
    openedAt: openedAt.toISOString(),
    resolvedAt: status === 'resolved' ? new Date(openedAt.getTime() + 3_600_000 * (2 + (i % 5))).toISOString() : undefined,
    notes: i % 5 === 0 ? 'Follow up with clinic reception.' : undefined,
    department,
    serviceId: conv.serviceId ?? pick(services, i),
    aiSummary: pick(handoffReasons[department], i),
    aiSummaryDetail:
      department === 'call_center'
        ? `Patient selected ${conv.serviceId}; AI collected slot and estimated cost.`
        : department === 'results'
          ? 'Exam results are ready; patient asked for human explanation.'
          : 'Insurance documents attached; AI requested medical approval.',
    attachmentCount: department === 'contracts' ? 2 : i % 3,
    slaDueAt: new Date(openedAt.getTime() + 3_600_000 * (slaTone === 'critical' ? 1 : 4)).toISOString(),
    slaTone,
    patientPhone: `+2010${String(10000000 + i).slice(0, 8)}`,
    doctorName: department === 'call_center' ? doctor.name : undefined,
    appointmentDay: department === 'call_center' ? '2025-11-18' : undefined,
    appointmentSlot: department === 'call_center' ? pick(slots, i) : undefined,
    estimatedCost: department === 'call_center' ? `SAR ${450 + (i % 8) * 50}` : undefined,
    timeline: [
      { id: `tl-${i}-1`, at: openedAt.toISOString(), label: 'AI opened handoff' },
      { id: `tl-${i}-2`, at: new Date(openedAt.getTime() + 600_000).toISOString(), label: 'Queued to department' },
    ],
    internalNotes: i % 4 === 0
      ? [{ id: `note-${i}`, at: openedAt.toISOString(), author: 'AI', body: 'Patient prefers Arabic replies.' }]
      : [],
  }
})

const bookings = Array.from({ length: 64 }, (_, i) => {
  const serviceId = pick(services, i)
  const degree = pick(degrees, i)
  const doctor = doctors.find((d) => d.degree === degree && d.services.includes(serviceId)) ?? pick(doctors, i)
  const dayOffset = i % 14
  const day = new Date(Date.UTC(2025, 10, 8 + dayOffset))
  // Skip Friday (JS getUTCDay: 5)
  if (day.getUTCDay() === 5) day.setUTCDate(day.getUTCDate() + 1)
  const status = pick(bookingStatuses, i)
  const cost = priceTable[serviceId][doctor.degree]
  const linkedCustomer = customers[i % customers.length]
  const name = pick(fourPartNames, i)
  return {
    id: `bk-${String(i + 1).padStart(3, '0')}`,
    patientName: name,
    phone: linkedCustomer.phone,
    serviceId,
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorDegree: doctor.degree,
    day: day.toISOString().slice(0, 10),
    timeSlot: pick(slots, i),
    cost,
    channel: pick(['whatsapp', 'telegram', 'manual'], i),
    attachmentCount: i % 4 === 0 ? 1 : 0,
    attachments: i % 4 === 0
      ? [{ id: `ba-${i}`, type: pick(['prescription', 'insurance_card', 'receipt'], i), fileName: `doc-${i}.jpg`, url: '/brand/icon.png' }]
      : [],
    status,
    conversationId: i % 2 === 0 ? conversations[i % conversations.length].id : undefined,
    createdAt: new Date(Date.UTC(2025, 10, 1, i % 20)).toISOString(),
    updatedAt: new Date(Date.UTC(2025, 10, 8, i % 20)).toISOString(),
  }
})

// Derive list counters from linked conversations / bookings
for (const customer of customers) {
  customer.totalConversations = conversations.filter((c) => c.customerId === customer.id).length
  customer.totalBookings = bookings.filter((b) => b.phone === customer.phone).length
  const lastConv = conversations
    .filter((c) => c.customerId === customer.id)
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt))[0]
  if (lastConv?.serviceId) customer.lastServiceId = lastConv.serviceId
}

for (const doctor of doctors) {
  doctor.bookingsCount = bookings.filter((b) => b.doctorId === doctor.id).length
}

const makeSteps = (defs) =>
  defs.map((d, i) => ({
    id: d.id,
    title: d.title,
    description: d.description,
    kind: d.kind,
    iconKey: d.iconKey ?? d.kind,
    order: i + 1,
  }))

const makeDropoff = (steps, base = 100) =>
  steps.map((step, i) => ({
    stepId: step.id,
    label: step.title,
    count: Math.max(8, Math.round(base * (1 - i * 0.12) - (i % 3) * 4)),
  }))

const defaultInstructions = (welcome) => ({
  tone: 'Warm, concise, medically careful without giving diagnoses.',
  languageBehavior: 'auto',
  welcomeMessage: welcome,
  boundaries:
    'Do not give medical diagnoses. Escalate clinical questions. Never invent prices outside the price table.',
  characterLimit: 4000,
  versions: [
    {
      id: 'ver-1',
      label: 'v1 — baseline',
      body: welcome,
      savedAt: new Date(Date.UTC(2025, 9, 1)).toISOString(),
    },
    {
      id: 'ver-2',
      label: 'v2 — welcome refresh',
      body: welcome + ' How can I help today?',
      savedAt: new Date(Date.UTC(2025, 10, 1)).toISOString(),
    },
  ],
})

const defaultRules = [
  {
    id: 'rule-ask-human',
    whenKey: 'ask_human',
    when: 'Customer asks for a human',
    then: 'Handoff to call center',
    enabled: true,
  },
  {
    id: 'rule-failed',
    whenKey: 'failed_understandings',
    when: '3 failed understandings',
    then: 'Offer human handoff',
    enabled: true,
  },
  {
    id: 'rule-complaint',
    whenKey: 'complaint',
    when: 'Complaint detected',
    then: 'Handoff to supervisor with transcript',
    enabled: false,
  },
]

const agents = [
  {
    id: 'agent-eye-care',
    name: 'Eye-care booking assistant',
    description: 'Handles appointment booking and clinic FAQs for the medical center.',
    status: 'live',
    isActive: true,
    defaultLanguage: 'en',
    persona: 'Warm, concise, medically careful without giving diagnoses.',
    modelPreset: 'Balanced',
    channelsConnected: ['whatsapp', 'telegram'],
    conversationsToday: 86,
    resolutionRate: 0.82,
    lastEditedAt: new Date(Date.UTC(2025, 10, 12, 14)).toISOString(),
    avatarTone: 'ai',
    instructions: defaultInstructions(
      'Welcome to i-care eye center. For a clear vision — I can help book appointments or answer clinic questions.',
    ),
    escalationRules: defaultRules,
    performanceSeries: Array.from({ length: 14 }, (_, i) => 55 + ((i * 5) % 30)),
  },
  {
    id: 'agent-triage',
    name: 'Results triage assistant',
    description: 'Routes exam results and receipt uploads to the results team.',
    status: 'paused',
    isActive: false,
    defaultLanguage: 'ar',
    persona: 'Clear and reassuring in Arabic and English.',
    modelPreset: 'Balanced',
    channelsConnected: ['whatsapp'],
    conversationsToday: 12,
    resolutionRate: 0.71,
    lastEditedAt: new Date(Date.UTC(2025, 10, 8, 9)).toISOString(),
    avatarTone: 'ai',
    instructions: defaultInstructions(
      'مرحباً بك في مركز آي كير. يمكنني مساعدتك في استلام النتائج.',
    ),
    escalationRules: [defaultRules[0], defaultRules[1]],
    performanceSeries: Array.from({ length: 14 }, (_, i) => 40 + ((i * 3) % 25)),
  },
  {
    id: 'agent-contracts-draft',
    name: 'Insurance contracts draft',
    description: 'Draft agent for insurance contract collection — not live yet.',
    status: 'draft',
    isActive: false,
    defaultLanguage: 'en',
    persona: 'Precise about documents and coverage.',
    modelPreset: 'Fast',
    channelsConnected: [],
    conversationsToday: 0,
    resolutionRate: 0,
    lastEditedAt: new Date(Date.UTC(2025, 10, 5, 11)).toISOString(),
    avatarTone: 'ai',
    instructions: defaultInstructions(
      'Welcome to i-care eye center insurance desk. Please share your contract card when ready.',
    ),
    escalationRules: [defaultRules[2]],
    performanceSeries: Array.from({ length: 14 }, () => 0),
  },
]

const knowledgeArticles = Array.from({ length: 24 }, (_, i) => ({
  id: `kb-${i + 1}`,
  title: i % 2 === 0 ? `Clinic hours – branch ${i + 1}` : `سياسة التأمين ${i + 1}`,
  body: i % 2 === 0 ? 'Sunday–Thursday 9:00–21:00. Friday closed.' : 'نقبل معظم شركات التأمين المحلية.',
  locale: i % 2 === 0 ? 'en' : 'ar',
  tags: ['eye-care', i % 3 === 0 ? 'hours' : 'insurance'],
  updatedAt: new Date(Date.UTC(2025, 9, i + 1)).toISOString(),
  kind: i % 5 === 0 ? 'file' : 'article',
  status: i % 7 === 0 ? 'disabled' : 'enabled',
  usageCount: (i * 17) % 120,
  ownerName: pick(enNames, i),
  fileName: i % 5 === 0 ? `policy-${i + 1}.pdf` : undefined,
  agentId: 'agent-eye-care',
}))

const checkupSteps = makeSteps([
  { id: 'nc-1', title: 'Choose service', description: 'Retina, LASIK, pediatric, optics, cataract', kind: 'intent', iconKey: 'service' },
  { id: 'nc-2', title: 'Patient name', description: 'Collect four-part name', kind: 'action', iconKey: 'user' },
  { id: 'nc-3', title: 'Phone', description: 'Egyptian mobile', kind: 'action', iconKey: 'phone' },
  { id: 'nc-4', title: 'Doctor degree', description: 'Professor / consultant / specialist', kind: 'action', iconKey: 'degree' },
  { id: 'nc-5', title: 'Day', description: 'Sat–Thu only', kind: 'action', iconKey: 'calendar' },
  { id: 'nc-6', title: 'Time slot', description: '09–12 / 12–15 / 15–18 / 18–21', kind: 'action', iconKey: 'clock' },
  { id: 'nc-7', title: 'Show cost', description: 'Price from service + degree', kind: 'action', iconKey: 'cost' },
  { id: 'nc-8', title: 'Handoff to call center', description: 'Confirm booking with call center', kind: 'handoff', iconKey: 'handoff' },
])

const consultationSteps = makeSteps([
  { id: 'cs-1', title: 'Choose service', description: 'Consultation service', kind: 'intent', iconKey: 'service' },
  { id: 'cs-2', title: 'Patient name', description: 'Four-part name', kind: 'action', iconKey: 'user' },
  { id: 'cs-3', title: 'Phone', description: 'Egyptian mobile', kind: 'action', iconKey: 'phone' },
  { id: 'cs-4', title: 'Doctor name', description: 'Named consultant only', kind: 'action', iconKey: 'doctor' },
  { id: 'cs-5', title: 'Doctor available days', description: 'Only that doctor’s days', kind: 'action', iconKey: 'calendar' },
  { id: 'cs-6', title: 'Time slot', description: 'Only that doctor’s slots', kind: 'action', iconKey: 'clock' },
  { id: 'cs-7', title: 'Handoff with full report', description: 'Call center receives full report', kind: 'handoff', iconKey: 'handoff' },
])

const examinationSteps = makeSteps([
  { id: 'ex-1', title: 'Choose service', description: 'Examination type', kind: 'intent', iconKey: 'service' },
  { id: 'ex-2', title: 'Patient name', description: 'Four-part name', kind: 'action', iconKey: 'user' },
  { id: 'ex-3', title: 'Phone', description: 'Egyptian mobile', kind: 'action', iconKey: 'phone' },
  { id: 'ex-4', title: 'Prescription image', description: 'Upload prescription', kind: 'action', iconKey: 'image' },
  { id: 'ex-5', title: 'Day', description: 'Sat–Thu', kind: 'action', iconKey: 'calendar' },
  { id: 'ex-6', title: 'Time slot', description: 'Four buckets', kind: 'action', iconKey: 'clock' },
  { id: 'ex-7', title: 'Show cost', description: 'Estimated exam cost', kind: 'action', iconKey: 'cost' },
  { id: 'ex-8', title: 'Handoff', description: 'Handoff to call center', kind: 'handoff', iconKey: 'handoff' },
])

const receiveResultSteps = makeSteps([
  { id: 'rr-1', title: 'Identify patient', description: 'Name or phone', kind: 'intent', iconKey: 'user' },
  { id: 'rr-2', title: 'Exam reference', description: 'Link to prior exam', kind: 'action', iconKey: 'file' },
  { id: 'rr-3', title: 'Optional receipt', description: 'Upload receipt or choose None to skip', kind: 'action', iconKey: 'receipt' },
  { id: 'rr-4', title: 'Confirm delivery channel', description: 'WhatsApp / Telegram', kind: 'action', iconKey: 'channel' },
  { id: 'rr-5', title: 'Handoff to results delivery', description: 'Results department', kind: 'handoff', iconKey: 'handoff' },
])

const insuranceSteps = makeSteps([
  { id: 'in-1', title: 'Identify patient', description: 'Name and phone', kind: 'intent', iconKey: 'user' },
  { id: 'in-2', title: 'Coverage question', description: 'What needs approval', kind: 'action', iconKey: 'help' },
  { id: 'in-3', title: 'Optional prescription', description: 'Attach if available', kind: 'action', iconKey: 'image' },
  { id: 'in-4', title: 'Optional contract card', description: 'Insurance card photo', kind: 'action', iconKey: 'card' },
  { id: 'in-5', title: 'Summarize request', description: 'AI summary for contracts team', kind: 'action', iconKey: 'summary' },
  { id: 'in-6', title: 'Handoff to contracts', description: 'Contracts department', kind: 'handoff', iconKey: 'handoff' },
])

const workflows = [
  {
    id: 'wf-new-checkup',
    name: 'New checkup',
    description: '8-step checkup booking with cost and call-center handoff.',
    steps: checkupSteps,
    completionRate: 0.64,
    stepDropoff: makeDropoff(checkupSteps, 120),
    agentId: 'agent-eye-care',
  },
  {
    id: 'wf-consultation',
    name: 'Consultation',
    description: '7-step consultation with named doctor availability.',
    steps: consultationSteps,
    completionRate: 0.58,
    stepDropoff: makeDropoff(consultationSteps, 90),
    agentId: 'agent-eye-care',
  },
  {
    id: 'wf-examination',
    name: 'Examination',
    description: '8-step exam booking with prescription image.',
    steps: examinationSteps,
    completionRate: 0.61,
    stepDropoff: makeDropoff(examinationSteps, 100),
    agentId: 'agent-eye-care',
  },
  {
    id: 'wf-receive-result',
    name: 'Receive result',
    description: '5-step results delivery with optional receipt skip.',
    steps: receiveResultSteps,
    completionRate: 0.72,
    stepDropoff: makeDropoff(receiveResultSteps, 80),
    agentId: 'agent-eye-care',
  },
  {
    id: 'wf-insurance',
    name: 'Insurance contracts',
    description: '6-step insurance intake with optional documents.',
    steps: insuranceSteps,
    completionRate: 0.49,
    stepDropoff: makeDropoff(insuranceSteps, 70),
    agentId: 'agent-eye-care',
  },
]

const tools = [
  { id: 'tool-check-availability', name: 'Check availability', description: 'Query clinic calendar slots', type: 'calendar', enabled: true },
  { id: 'tool-create-booking-draft', name: 'Create booking draft', description: 'Start an appointment draft in CRM', type: 'crm', enabled: true },
  { id: 'tool-calculate-cost', name: 'Calculate cost', description: 'Price from service + doctor degree', type: 'custom', enabled: true },
  { id: 'tool-handoff-department', name: 'Handoff to department', description: 'Route to call center, results, or contracts', type: 'custom', enabled: true },
  { id: 'tool-send-confirmation', name: 'Send confirmation', description: 'Send booking confirmation on channel', type: 'http', enabled: false },
]

const channelConnections = [
  {
    channelType: 'whatsapp',
    status: 'connected',
    displayName: 'Eye-care WhatsApp',
    lastSyncAt: new Date(Date.UTC(2025, 10, 12, 14, 30)).toISOString(),
    configSummary: 'Business API • webhook active',
    health: 'healthy',
    lastMessageAt: new Date(Date.UTC(2025, 10, 12, 14, 28)).toISOString(),
    volumeTodaySeries: [4, 8, 12, 9, 15, 18, 14, 11, 16, 20, 17, 13],
    webhookUrl: 'https://api.icare.local/webhooks/whatsapp',
    credentialsMasked: 'wa_••••••••42',
  },
  {
    channelType: 'telegram',
    status: 'error',
    displayName: 'Support Telegram bot',
    lastSyncAt: new Date(Date.UTC(2025, 10, 11, 9)).toISOString(),
    configSummary: 'Token invalid or webhook failed',
    health: 'down',
    lastMessageAt: new Date(Date.UTC(2025, 10, 10, 18)).toISOString(),
    volumeTodaySeries: [0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0],
    webhookUrl: 'https://api.icare.local/webhooks/telegram',
    credentialsMasked: 'tg_••••••••',
  },
]

const performanceSeries = Array.from({ length: 14 }, (_, i) => 40 + ((i * 7) % 35))

const analytics = {
  performance: {
    period: 'Last 30 days',
    conversationsTotal: 1240,
    avgFirstResponseMs: 95000,
    resolutionRate: 0.87,
    aiDeflectionRate: 0.62,
  },
  conversationVolume: performanceSeries,
  channelMix: [
    { label: 'WhatsApp', value: 72 },
    { label: 'Telegram', value: 28 },
  ],
  topics: [
    { label: 'Appointments', value: 48 },
    { label: 'Insurance', value: 22 },
    { label: 'Hours', value: 18 },
    { label: 'Other', value: 12 },
  ],
  insights: performanceSeries.map((v, i) => ({ label: `D${i + 1}`, value: v, series: performanceSeries.slice(0, i + 1) })),
  unanswered: Array.from({ length: 12 }, (_, i) => ({
    id: `uq-${i + 1}`,
    topic: i % 3 === 0 ? 'Pricing' : i % 3 === 1 ? 'Specialist' : 'Hours',
    question:
      i % 3 === 0
        ? `How much is LASIK package ${i + 1}?`
        : i % 3 === 1
          ? `Is there a pediatric specialist on day ${i + 1}?`
          : `Are you open Friday evening ${i + 1}?`,
    count: 4 + ((i * 3) % 18),
    lastAskedAt: new Date(Date.UTC(2025, 10, 12 - (i % 10), 10 + (i % 8))).toISOString(),
    channel: i % 2 === 0 ? 'whatsapp' : 'telegram',
    suggestedAnswer:
      i % 3 === 0
        ? 'LASIK pricing depends on doctor degree; share the price table and offer a consult.'
        : i % 3 === 1
          ? 'Yes — pediatric specialists are available Sat–Thu; offer booking flow.'
          : 'Clinic is closed Fridays; offer Sat–Thu slots.',
    status: i % 7 === 0 ? 'dismissed' : 'open',
    sampleUtterances: [`Sample utterance ${i + 1}`],
  })),
  csat: {
    score: 4.6,
    responseCount: 320,
    distribution: [
      { label: '5', value: 210 },
      { label: '4', value: 70 },
      { label: '3', value: 25 },
      { label: '2', value: 10 },
      { label: '1', value: 5 },
    ],
    trend: Array.from({ length: 14 }, (_, i) => ({
      label: `D${i + 1}`,
      value: Math.round((4.2 + ((i % 5) * 0.1)) * 10) / 10,
    })),
    comments: Array.from({ length: 10 }, (_, i) => ({
      id: `csat-c-${i + 1}`,
      rating: (i % 5) + 1,
      comment:
        i % 3 === 0
          ? 'Very helpful booking assistant.'
          : i % 3 === 1
            ? 'Waited too long for a human.'
            : 'Clear answers about clinic hours.',
      sentiment: i % 5 >= 3 ? 'positive' : i % 5 === 2 ? 'neutral' : 'negative',
      at: new Date(Date.UTC(2025, 10, 12 - i, 12)).toISOString(),
      channel: i % 2 === 0 ? 'whatsapp' : 'telegram',
    })),
  },
  recentEscalations: escalations.slice(0, 8),
}

const teamMembers = Array.from({ length: 12 }, (_, i) => ({
  id: `team-${i + 1}`,
  name: pick(enNames, i),
  email: `member${i + 1}@icare.local`,
  roleId: i % 3 === 0 ? 'role-admin' : 'role-agent',
  status: i % 5 === 0 ? 'invited' : 'active',
}))

const roles = [
  { id: 'role-admin', name: 'Administrator', permissions: ['inbox.read', 'inbox.takeover', 'agents.write', 'settings.write'] },
  { id: 'role-agent', name: 'Agent', permissions: ['inbox.read', 'inbox.takeover'] },
  { id: 'role-viewer', name: 'Viewer', permissions: ['inbox.read'] },
]

const content = `/* eslint-disable -- generated seed */
import type { Agent, AgentTool, ChannelConnection, Customer, Escalation, KnowledgeArticle, Workflow, BookingDraft, AiInsight, Booking, Doctor, ClinicService, ClinicDepartment, ClinicSchedule } from '@/domain/entities'
import type { Conversation } from '@/domain/entities/conversation.entity'
import type { Message } from '@/domain/entities/message.entity'
import type { PerformanceSnapshot, CsatSummary, UnansweredTopic, InsightPoint } from '@/domain/entities/analytics.entity'
import type { TeamMember, Role, BusinessHours, NotificationPreference, ApiKeySummary, GeneralSettings, WebhookEndpoint } from '@/domain/entities/settings.entity'

export const SEED_CUSTOMERS: Customer[] = ${JSON.stringify(customers, null, 2)} as Customer[]

export const SEED_CONVERSATIONS: Conversation[] = ${JSON.stringify(conversations, null, 2)} as Conversation[]

export const SEED_MESSAGES: Message[] = ${JSON.stringify(messages, null, 2)} as Message[]

export const SEED_BOOKING_DRAFTS: BookingDraft[] = ${JSON.stringify(bookingDrafts, null, 2)} as BookingDraft[]

export const SEED_AI_INSIGHTS: AiInsight[] = ${JSON.stringify(aiInsights, null, 2)} as AiInsight[]

export const SEED_ESCALATIONS: Escalation[] = ${JSON.stringify(escalations, null, 2)} as Escalation[]

export const SEED_DOCTORS: Doctor[] = ${JSON.stringify(doctors, null, 2)} as Doctor[]

export const SEED_CLINIC_SERVICES: ClinicService[] = ${JSON.stringify(clinicServices, null, 2)} as ClinicService[]

export const SEED_CLINIC_DEPARTMENTS: ClinicDepartment[] = ${JSON.stringify(clinicDepartments, null, 2)} as ClinicDepartment[]

export const SEED_CLINIC_SCHEDULE: ClinicSchedule = ${JSON.stringify(clinicSchedule, null, 2)} as ClinicSchedule

export const SEED_BOOKINGS: Booking[] = ${JSON.stringify(bookings, null, 2)} as Booking[]

export const SEED_AGENTS: Agent[] = ${JSON.stringify(agents, null, 2)} as Agent[]

export const SEED_KB: KnowledgeArticle[] = ${JSON.stringify(knowledgeArticles, null, 2)} as KnowledgeArticle[]

export const SEED_WORKFLOWS: Workflow[] = ${JSON.stringify(workflows, null, 2)} as Workflow[]

export const SEED_TOOLS: AgentTool[] = ${JSON.stringify(tools, null, 2)} as AgentTool[]

export const SEED_CHANNELS: ChannelConnection[] = ${JSON.stringify(channelConnections, null, 2)} as ChannelConnection[]

export const SEED_TEAM: TeamMember[] = ${JSON.stringify(teamMembers, null, 2)} as TeamMember[]

export const SEED_ROLES: Role[] = ${JSON.stringify(roles, null, 2)} as Role[]

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

export const SEED_PERFORMANCE: PerformanceSnapshot = ${JSON.stringify(analytics.performance, null, 2)} as PerformanceSnapshot

export const SEED_VOLUME_SERIES: number[] = ${JSON.stringify(performanceSeries)}

export const SEED_CHANNEL_MIX = ${JSON.stringify(analytics.channelMix)} as { label: string; value: number }[]

export const SEED_TOPIC_MIX = ${JSON.stringify(analytics.topics)} as { label: string; value: number }[]

export const SEED_INSIGHTS: InsightPoint[] = ${JSON.stringify(analytics.insights, null, 2)} as InsightPoint[]

export const SEED_UNANSWERED: UnansweredTopic[] = ${JSON.stringify(analytics.unanswered, null, 2)} as UnansweredTopic[]

export const SEED_CSAT: CsatSummary = ${JSON.stringify(analytics.csat, null, 2)} as CsatSummary

export const SEED_RECENT_ESCALATIONS: Escalation[] = ${JSON.stringify(analytics.recentEscalations, null, 2)} as Escalation[]
`

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, content)
console.log('Generated', out, {
  conversations: conversations.length,
  messages: messages.length,
  escalations: escalations.length,
  bookings: bookings.length,
  doctors: doctors.length,
})
