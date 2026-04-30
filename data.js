// Mock data for the Wellness Assistant prototype
// All "RAG retrievals" come from this curated set so the demo feels real.

window.WA_DATA = {
  topics: [
    {
      id: 'depression',
      label: 'Depression',
      blurb: 'Symptoms, types, evidence-based care',
      count: 14,
      hue: 232,
    },
    {
      id: 'anxiety',
      label: 'Anxiety',
      blurb: 'Generalized, panic, social',
      count: 11,
      hue: 198,
    },
    {
      id: 'coping',
      label: 'Coping skills',
      blurb: 'Grounding, breathing, journaling',
      count: 9,
      hue: 168,
    },
    {
      id: 'sleep',
      label: 'Sleep & rest',
      blurb: 'Hygiene, insomnia, rumination',
      count: 7,
      hue: 268,
    },
    {
      id: 'therapy',
      label: 'Therapy types',
      blurb: 'CBT, ACT, DBT, IPT',
      count: 12,
      hue: 28,
    },
    {
      id: 'medication',
      label: 'Medication basics',
      blurb: 'Classes, side effects, adherence',
      count: 8,
      hue: 332,
    },
    {
      id: 'mindfulness',
      label: 'Mindfulness',
      blurb: 'Practices, posture, attention',
      count: 6,
      hue: 142,
    },
    {
      id: 'support',
      label: 'Support systems',
      blurb: 'Family, peers, communities',
      count: 5,
      hue: 12,
    },
  ],

  starters: [
    {
      id: 's1',
      title: 'I’ve been feeling low for weeks',
      sub: 'How do I tell if it’s depression?',
      topic: 'depression',
    },
    {
      id: 's2',
      title: 'My mind races at night',
      sub: 'Grounding techniques for anxious thoughts',
      topic: 'anxiety',
    },
    {
      id: 's3',
      title: 'What is CBT, exactly?',
      sub: 'A plain-language overview',
      topic: 'therapy',
    },
    {
      id: 's4',
      title: 'Help me build a calming routine',
      sub: 'Small daily practices that compound',
      topic: 'coping',
    },
  ],

  // Hand-curated mock answers paired with realistic citations.
  // The "match" array contains keywords that route a user query to a reply.
  replies: [
    {
      match: ['low', 'sad', 'depress', 'down', 'weeks', 'empty', 'hopeless'],
      text:
        "Feeling low for an extended period \u2014 say, most of the day, more days than not, for two weeks or longer \u2014 can be a sign of a depressive episode, especially when paired with a loss of interest in things you used to enjoy, changes in sleep or appetite, or persistent fatigue.\n\nIt’s worth tracking what you notice over the next few days: when the heaviness shows up, what makes it lighter or heavier, and whether it interferes with work, relationships, or basic care. That record is genuinely useful when you talk to a clinician, and a licensed physician or therapist is the right person to interpret it with you.\n\nIn the meantime, gentle anchoring practices \u2014 a short walk in daylight, a brief check-in with someone you trust, regular meals \u2014 don’t “fix” depression, but they tend to slow the spiral while you arrange care.",
      citations: [
        {
          doc: 'DSM-5-TR Mood Disorders Overview.pdf',
          page: 18,
          snippet:
            "A major depressive episode is characterized by depressed mood or loss of interest, present most of the day, nearly every day, for at least two weeks, accompanied by additional symptoms such as changes in sleep, appetite, energy, or concentration.",
        },
        {
          doc: 'NIMH Depression Patient Guide.pdf',
          page: 4,
          snippet:
            "Keeping a brief daily log of mood, sleep, and activity for one to two weeks can help you and your clinician identify patterns and make a more accurate assessment.",
        },
        {
          doc: 'WHO Mental Health Self-Care Booklet.pdf',
          page: 22,
          snippet:
            "Small protective routines \u2014 daylight exposure, regular meals, light physical activity, and one social contact per day \u2014 are widely recommended supports while professional care is being arranged.",
        },
      ],
    },
    {
      match: ['anxious', 'anxiety', 'race', 'racing', 'night', 'panic', 'worry', 'spiral'],
      text:
        "Racing thoughts at night are one of the most common forms anxiety takes, and they have a particular trick: the harder you push them away, the louder they tend to get. A useful first move is to shift attention from “stop thinking” to “come back to the body.”\n\nOne approach that’s well supported is the 5-4-3-2-1 grounding sequence \u2014 name five things you can see, four you can feel, three you can hear, two you can smell, one you can taste. Paired with slow exhales (longer out than in), it gently activates the parasympathetic system and breaks the loop.\n\nIf this happens most nights, or you’re losing significant sleep, please bring it to a licensed clinician \u2014 sustained anxiety is treatable, and there are several effective paths.",
      citations: [
        {
          doc: 'NICE Generalized Anxiety Guideline.pdf',
          page: 31,
          snippet:
            "Brief sensory grounding exercises and paced breathing with extended exhalation are recommended self-management tools for acute anxious arousal.",
        },
        {
          doc: 'Coping Skills Workbook \u2014 Anxiety.pdf',
          page: 12,
          snippet:
            "The 5-4-3-2-1 technique uses each of the five senses in turn to anchor attention in the present moment, interrupting cycles of anticipatory worry.",
        },
      ],
    },
    {
      match: ['cbt', 'cognitive', 'therapy', 'what is'],
      text:
        "Cognitive Behavioral Therapy (CBT) is a structured, time-limited form of talk therapy built on a simple idea: thoughts, feelings, and behaviors influence each other, so changing one can shift the others.\n\nA typical course runs 8\u201320 sessions. You’ll work with a therapist to notice automatic thoughts (“I’ll never get this right”), examine the evidence for and against them, and try small behavioral experiments \u2014 doing the thing your anxiety tells you not to do, in a way that’s manageable. Homework between sessions is part of the design, not a sign you’re behind.\n\nCBT has strong evidence for depression, anxiety disorders, insomnia, and more. A licensed therapist can help you decide whether it’s a good fit for what you’re working with.",
      citations: [
        {
          doc: 'APA Clinical Practice Guideline \u2014 CBT.pdf',
          page: 7,
          snippet:
            "CBT is a structured, present-focused psychotherapy that addresses the relationships among thoughts, emotions, and behaviors, typically delivered in a time-limited format.",
        },
        {
          doc: 'Therapy Types Patient Handout.pdf',
          page: 2,
          snippet:
            "Most courses of CBT involve between 8 and 20 sessions, with between-session practice considered an active ingredient of the treatment.",
        },
      ],
    },
    {
      match: ['routine', 'calm', 'daily', 'habit', 'practice', 'morning'],
      text:
        "A calming routine doesn’t need to be elaborate \u2014 the consistent ones tend to be small, repeatable, and forgiving. A useful frame is one anchor in the morning, one in the evening, and one micro-pause in the middle of the day.\n\nMornings: a few minutes of daylight before screens. Midday: a 90-second pause where you stretch, breathe, and name how you’re actually doing. Evenings: a wind-down cue that signals “off” \u2014 dim lights, a warm drink, a simple page of journaling.\n\nThe goal isn’t optimization, it’s rhythm. Skip a day, resume the next \u2014 the routine is what you come back to, not what you never break.",
      citations: [
        {
          doc: 'WHO Mental Health Self-Care Booklet.pdf',
          page: 14,
          snippet:
            "Brief, predictable daily routines act as protective scaffolding for mood and sleep, particularly during periods of elevated stress.",
        },
        {
          doc: 'Mindfulness-Based Practices Overview.pdf',
          page: 9,
          snippet:
            "Short, repeatable practices distributed across the day are generally more sustainable than longer single sessions for beginners.",
        },
      ],
    },
    {
      match: ['sleep', 'insomnia', 'tired', 'rest', 'awake'],
      text:
        "When sleep is the problem, the most effective starting point is sleep hygiene plus a consistent wake time \u2014 even on weekends, even after a rough night. Counterintuitively, protecting the wake time matters more than protecting bedtime.\n\nIf you’re lying awake more than 20 minutes, get up, go to a dim room, do something quiet and a little boring, and return when you feel sleepy. This trains your brain that the bed is for sleep, not for problem-solving.\n\nPersistent insomnia (three nights a week for three months) has a specific evidence-based treatment called CBT-I that outperforms medication long-term \u2014 worth asking a clinician about.",
      citations: [
        {
          doc: 'AASM Insomnia Clinical Guideline.pdf',
          page: 19,
          snippet:
            "Cognitive Behavioral Therapy for Insomnia (CBT-I) is recommended as first-line treatment for chronic insomnia in adults.",
        },
        {
          doc: 'Sleep Hygiene Patient Handout.pdf',
          page: 1,
          snippet:
            "Maintaining a consistent wake time, limiting time in bed when not sleeping, and reserving the bed for sleep are foundational behavioral recommendations.",
        },
      ],
    },
  ],

  // CAHE-RUC institutional context
  org: {
    name: 'CAHE-RUC',
    fullName: 'Center for Adolescent Health & Equity — Rural Unified Clinics',
    fqhcName: 'Bonner County Health Partners (FQHC)',
    fqhcPhone: '(208) 555-0142',
    behavioralLine: '(208) 555-0188',
    clinicalReviewer: 'Dr. M. Alvarez, LCSW · QPR-certified',
    pdfCount: 72,
    lastReview: 'Apr 28, 2026',
    qprVersion: 'QPR Protocol v3',
  },
  member: {
    name: 'Jordan Rivera',
    initials: 'JR',
    role: 'RYC Member',
    school: 'Bonner County HS · 11th grade',
    fqhc: 'Bonner County Health Partners',
  },

  // Crisis keywords trigger QPR flow (Question, Persuade, Refer)
  crisisKeywords: ['kill myself', 'suicide', 'end it', 'hurt myself', 'self harm', 'self-harm', "don't want to live", 'no reason to live', 'better off dead'],

  qpr: {
    question: {
      headline: 'I want to make sure I understand — and that you’re safe.',
      body: 'What you just shared matters. Are you having thoughts of ending your life or hurting yourself right now?',
      options: [
        { id: 'yes', label: 'Yes, I am', tone: 'crisis' },
        { id: 'maybe', label: 'Sometimes / not sure', tone: 'crisis' },
        { id: 'no', label: 'No, but I’m struggling', tone: 'soft' },
      ],
    },
    persuade: {
      headline: 'Thank you for telling me. You don’t have to carry this alone.',
      body: 'A trained person can help you right now. Talking to someone is a brave first step — not a commitment to anything beyond this conversation.',
    },
    refer: {
      headline: 'Here’s who can help, right now.',
      lines: [
        { label: '988 Suicide & Crisis Lifeline', value: 'Call or text 988', kind: 'phone', href: 'tel:988' },
        { label: 'CAHE-RUC Behavioral Health Line', value: '(208) 555-0188 · 24/7', kind: 'phone', href: 'tel:+12085550188' },
        { label: 'Crisis Text Line', value: 'Text HOME to 741741', kind: 'sms', href: 'sms:741741' },
        { label: 'Bonner County Health Partners', value: 'In-person FQHC · Mon–Sat', kind: 'place' },
      ],
      note: 'A QPR-certified counselor at your FQHC can call you back within 30 minutes if you’d like.',
    },
  },

  // Spanish translations for key UI surfaces
  i18n: {
    en: {
      crisis_strong: 'If you’re in crisis or thinking about self-harm',
      crisis_body: '— you deserve immediate care from a person.',
      crisis_988: '988 Suicide & Crisis Lifeline',
      crisis_text: 'Need Help with Primary Care? Call Nurse Advice Line PA',
      disclaimer_em: 'Not medical advice.',
      disclaimer_body: 'I share supportive information from a curated set of mental-health resources. Please consult a licensed physician or therapist for diagnosis or treatment.',
      welcome_h1_a: 'Hi, I’m Mira.',
      welcome_h1_b: 'What’s on your mind today?',
      welcome_p: 'I’m here to listen and share information drawn from a curated library of mental-health resources. I’m not a clinician, and I won’t pretend to be one.',
      welcome_p_rural: 'I know reaching care can mean a long drive or a slow connection out here. Take your time — I’ll wait.',
      placeholder: 'Share what’s on your mind…',
      composer_foot: 'Mira draws only from the curated library · not a substitute for professional care',
      send: 'Send',
      newchat: 'New conversation',
      topics: 'Topic library',
      sources: 'verified PDFs',
      reviewed: 'Reviewed',
      member_signed: 'Signed in via',
      callback: 'Request a callback',
      not_now: 'Not right now',
      continue: 'Continue chatting',
    },
    es: {
      crisis_strong: 'Si estás en crisis o pensando en hacerte daño',
      crisis_body: '— mereces atención inmediata de una persona.',
      crisis_988: '988 Línea de Crisis y Suicidio',
      crisis_text: 'Envía HOME al 741741',
      disclaimer_em: 'No es asesoramiento médico.',
      disclaimer_body: 'Comparto información de apoyo de una colección curada de recursos de salud mental. Por favor consulta a un médico o terapeuta licenciado para diagnóstico o tratamiento.',
      welcome_h1_a: 'Hola, soy Mira.',
      welcome_h1_b: '¿En qué piensas hoy?',
      welcome_p: 'Estoy aquí para escucharte y compartir información de una biblioteca curada de recursos de salud mental. No soy clínica, y no pretenderé serlo.',
      welcome_p_rural: 'Sé que llegar a la atención puede significar un viaje largo o una conexión lenta. Tómate tu tiempo — te espero.',
      placeholder: 'Comparte lo que sientes…',
      composer_foot: 'Mira solo usa la biblioteca curada · no sustituye la atención profesional',
      send: 'Enviar',
      newchat: 'Nueva conversación',
      topics: 'Biblioteca de temas',
      sources: 'PDFs verificados',
      reviewed: 'Revisado',
      member_signed: 'Sesión vía',
      callback: 'Pedir una llamada',
      not_now: 'Ahora no',
      continue: 'Seguir conversando',
    },
  },

  defaultReply: {
    text:
      "I want to be careful here \u2014 my answers are limited to a curated set of mental-health resources, and I’m not finding a strong match for that question in what I have access to.\n\nCould you rephrase, or tell me a bit more about what’s prompting it? If it’s urgent or clinical, please reach out to a licensed physician or your local crisis line.",
    citations: [],
  },
};
