export interface ProjectCaseStudy {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  year: string;
  team: string;
  repoUrl: string;
  disciplines: string[];
  coverImage: string;
  coverAlt: string;
  overview: string;
  myRole: string[];
  problemOrContext: {
    kicker: string;
    heading: string;
    body: string;
  };
  approach: {
    number: string;
    title: string;
    description: string;
  }[];
  systemSpecs: {
    primaryFont: string;
    secondaryFont: string;
    palette: { name: string; hex: string }[];
    metrics: { label: string; value: string }[];
  };
}

export interface SkillItem {
  index: string;
  title: string;
  description: string;
}

export interface LabNodePiece {
  id: string;
  title: string;
  category: 'Mobile' | 'AI & Agents' | 'Frontend' | 'IoT & Hardware' | 'Backend' | 'Language';
  year: string;
  x: number;
  y: number;
  width: number;
  height: number;
  accentColor: string;
  bgColor: string;
  image?: string;
  imageFit?: 'cover' | 'contain';
  caption: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: 'Google' | 'Cisco & IBM' | 'Play Academy';
  year: string;
  focus: string;
  dateOrder: number;
  image: string;
  imageFit?: 'cover' | 'contain';
}

export const PORTFOLIO_DATA = {
  brand: {
    studioName: 'JANINDU ALWIS',
    shortName: 'Janindu Alwis',
    firstName: 'Janindu',
    lastName: 'Alwis',
    fullName: 'Janindu Dilshan De Alwis',
    tagline: 'Software Engineer & Full-Stack Developer.',
    subTagline: 'I build modern web experiences.',
    footerMotto: 'Engineering clarity between code and hardware.',
    email: 'janidujayd@gmail.com',
    phone: '(+94) 765488419',
    whatsappUrl: 'https://wa.me/94765488419',
    linkedinUrl: 'https://www.linkedin.com/in/janindu-alwis',
    githubUrl: 'https://github.com/janinduAlwis',
    cvPdfPath: '/assets/aistudio/janindu_alwis_cv_ef106b51.pdf',
    location: 'Colombo, Sri Lanka',
    university: 'University of Sri Jayewardenepura',
    universityUrl: 'https://www.sjp.ac.lk',
    degree: 'BICT (Hons) — Software Technology',
    degreeDates: '07/2024 – Present',
  },
  assets: {
    coverPortrait: '/assets/hero.png',
    portrait: '/assets/aistudio/fsg_e9c92de9.jpg',
    statementVisual: '/assets/aistudio/redcode.png',
    stackVisual: '/assets/aistudio/techstack.png',
    labVisualOne: '/assets/aistudio/image_f11c72f4.png',
    labVisualTwo: '/assets/aistudio/image_db37e834.png',
    contactSky: '/assets/sky-poster.jpg',
    contactSkyVideo: '/assets/aistudio/sky_d5dfe244.mp4',
  },
  disciplines: [
    'React & Next.js',
    'React Native & Expo',
    'Node.js & Databases',
    'AI & n8n Agents',
    'IoT & Embedded',
  ],
  bioStatement:
    "Hi, I'm Janindu, a BICT (Hons) undergraduate specializing in Software Technology at the University of Sri Jayewardenepura, seeking a software engineering internship. I build responsive web and mobile applications using React, React Native, Next.js, and TypeScript, backed by databases, AI integration, and real-world IoT systems.",
  stackRowOne: [
    'React.js',
    'React Native',
    'Expo',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Zustand',
    'HTML5',
    'CSS3',
    'Python',
    'Java',
  ],
  stackRowTwo: [
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'Firebase Firestore',
    'OpenAI',
    'n8n',
    'Docker',
    'ESP8266 NodeMCU',
    'MQTT',
    'Arduino',
    'Git & GitHub',
  ],
  projects: [
    {
      slug: 'boardlk',
      index: '01',
      title: 'BoardLK',
      subtitle: 'Mobile · Individual Project',
      role: 'Mobile Application Developer',
      timeline: 'Oct 2026 – Current',
      year: '2026',
      team: 'Individual Project',
      repoUrl: 'https://github.com/janinduAlwis/BoardLK',
      disciplines: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'React Native Maps'],
      coverImage: '/assets/aistudio/BoardLK_UX_Case_Study_f286eea3.png',
      coverAlt: 'BoardLK — Mobile boarding and accommodation discovery platform in Sri Lanka',
      overview:
        'BoardLK is a cross-platform mobile application built with React Native and Expo to help students and professionals discover boarding places across Sri Lanka, combining interactive map exploration, instant property filtering, and direct in-app messaging.',
      myRole: [
        'Architected and built the mobile application end-to-end as an individual developer using React Native, Expo, and TypeScript.',
        'Implemented interactive geospatial property discovery with React Native Maps and multi-criteria search filters.',
        'Engineered predictable client state with Zustand and structured multi-screen navigation via Expo Router.',
        'Built real-time in-app messaging flows connecting boarding seekers directly with property owners.',
      ],
      problemOrContext: {
        kicker: '(THE PROBLEM)',
        heading: 'Finding reliable boarding accommodation across Sri Lanka is fragmented',
        body: 'University students and relocating workers typically rely on scattered social posts and word-of-mouth to locate rooms. BoardLK unifies verified listings, map-first proximity search, and direct owner messaging inside one fast mobile experience.',
      },
      approach: [
        {
          number: '01',
          title: 'Map-First Discovery',
          description:
            'Integrated React Native Maps with dynamic viewport filtering so users inspect commute distance, nearby universities, and pricing at a glance.',
        },
        {
          number: '02',
          title: 'Zustand & Expo Router',
          description:
            'Used lightweight Zustand stores for zero-boilerplate filter/session sync paired with file-based Expo Router navigation.',
        },
        {
          number: '03',
          title: 'Direct In-App Messaging',
          description:
            'Eliminated external phone-tag friction with structured conversation threads right from each property detail view.',
        },
      ],
      systemSpecs: {
        primaryFont: 'React Native + Expo',
        secondaryFont: 'TypeScript + Zustand',
        palette: [
          { name: 'Map Slate', hex: '#0D0D0B' },
          { name: 'Pin Crimson', hex: '#D12424' },
          { name: 'Card Paper', hex: '#EFEEEB' },
          { name: 'Stone Border', hex: '#B8B5B0' },
        ],
        metrics: [
          { label: 'Core Stack', value: 'RN + Expo' },
          { label: 'State Engine', value: 'Zustand' },
          { label: 'Scope', value: 'Solo Build' },
        ],
      },
    },
    {
      slug: 'agent-medlink',
      index: '02',
      title: 'Agent MedLink',
      subtitle: 'AI Healthcare · Group Project',
      role: 'Full-Stack Engineer',
      timeline: 'May – Jul 2026',
      year: '2026',
      team: 'University Group Project',
      repoUrl: 'https://github.com/hesandasamadith/agent-medlink',
      disciplines: ['Next.js', 'Tailwind CSS', 'OpenAI', 'n8n', 'Firebase', 'Docker', 'Telegram'],
      coverImage: '/assets/aistudio/medlink.png',
      coverAlt: 'Agent MedLink — AI-powered healthcare appointment and hospital information platform',
      overview:
        'Agent MedLink is an AI-powered healthcare appointment platform built with Next.js, Tailwind CSS, OpenAI, n8n, and Firebase Firestore, enabling patients to query hospital information, check doctor schedules, and book appointments directly through messaging apps like Telegram.',
      myRole: [
        'Developed full-stack Next.js and Tailwind CSS interfaces for managing hospital directories, doctor schedules, and live appointment queues.',
        'Integrated OpenAI natural-language orchestration with n8n automation workflows to handle conversational booking requests.',
        'Connected real-time Firebase Firestore storage with containerized Docker services and Telegram bot webhooks.',
      ],
      problemOrContext: {
        kicker: '(WHY IT EXISTS)',
        heading: 'Bridging hospital scheduling databases with everyday messaging apps',
        body: 'Patients frequently struggle with complex clinic portals or unanswered phone lines just to verify doctor availability. Agent MedLink lets users ask naturally in Telegram while keeping Firestore schedules synchronized in real time.',
      },
      approach: [
        {
          number: '01',
          title: 'Conversational AI + n8n',
          description:
            'Chained OpenAI intent parsing with n8n workflow nodes to validate doctor slots, hospital branches, and patient confirmations automatically.',
        },
        {
          number: '02',
          title: 'Real-Time Firestore Sync',
          description:
            'Backed both the Next.js admin dashboard and Telegram agent with a single Firebase Firestore source of truth.',
        },
        {
          number: '03',
          title: 'Containerized Deployment',
          description:
            'Packaged automation and service layers using Docker for consistent local and cloud execution.',
        },
      ],
      systemSpecs: {
        primaryFont: 'Next.js + Tailwind',
        secondaryFont: 'OpenAI + n8n',
        palette: [
          { name: 'Clinical Obsidian', hex: '#0D0D0B' },
          { name: 'Agent Cyan', hex: '#1ECAD3' },
          { name: 'Surface Mist', hex: '#EFEEEB' },
          { name: 'Graphite', hex: '#262B33' },
        ],
        metrics: [
          { label: 'Messaging Channel', value: 'Telegram' },
          { label: 'Data Store', value: 'Firestore' },
          { label: 'Duration', value: '3 Months' },
        ],
      },
    },
    {
      slug: 'live-crowds',
      index: '03',
      title: 'Live Crowds',
      subtitle: 'Web App · Individual Project',
      role: 'Frontend Developer',
      timeline: 'Apr – Jun 2026',
      year: '2026',
      team: 'Individual Project',
      repoUrl: 'https://github.com/janinduAlwis/Live-Crowds',
      disciplines: ['React', 'Vite', 'JavaScript', 'Responsive UI'],
      coverImage: '/assets/aistudio/livecrowds.png',
      coverAlt: 'Live Crowds — Smart tourist crowd tracking web application',
      overview:
        'Live Crowds is a responsive web application built with React and Vite to track real-time tourist crowd density across destinations in Sri Lanka, featuring group check-in workflows, automatic checkout timers, and persistent local storage.',
      myRole: [
        'Designed and developed the entire responsive frontend application using React, Vite, and modern JavaScript.',
        'Implemented group check-in flows allowing tour guides and visitors to log headcounts quickly on mobile and desktop.',
        'Built automatic checkout logic and client-side localStorage persistence for reliable state continuity without heavy backend overhead.',
      ],
      problemOrContext: {
        kicker: '(THE CHALLENGE)',
        heading: 'Preventing destination overcrowding with lightweight check-ins',
        body: 'Popular cultural and coastal destinations face sudden visitor spikes. Live Crowds provides a fast, low-friction web interface to monitor active group occupancy and automatically expire stale check-ins.',
      },
      approach: [
        {
          number: '01',
          title: 'Group Check-In Flow',
          description:
            'Streamlined multi-visitor registration into a single responsive screen optimized for quick mobile entry at venue gates.',
        },
        {
          number: '02',
          title: 'Automatic Checkout Engine',
          description:
            'Added scheduled session expiry and auto-checkout sweeps so crowd counts remain accurate throughout the day.',
        },
        {
          number: '03',
          title: 'Instant Client Persistence',
          description:
            'Structured clean localStorage state hydration for zero-latency reloads and offline-resilient tracking.',
        },
      ],
      systemSpecs: {
        primaryFont: 'React + Vite',
        secondaryFont: 'JavaScript ES2022',
        palette: [
          { name: 'Signal Red', hex: '#D12424' },
          { name: 'Cobalt Route', hex: '#1D4ED8' },
          { name: 'Canvas Paper', hex: '#EFEEEB' },
          { name: 'Stark Ink', hex: '#0A0A0A' },
        ],
        metrics: [
          { label: 'Build Tool', value: 'Vite' },
          { label: 'Persistence', value: 'LocalStore' },
          { label: 'Scope', value: 'Solo Build' },
        ],
      },
    },
    {
      slug: 'smart-construction-helmet',
      index: '04',
      title: 'Smart Helmet',
      subtitle: 'IoT Safety · Group Project',
      role: 'IoT & Embedded Systems Developer',
      timeline: 'Feb – Mar 2026',
      year: '2026',
      team: 'University Group Project',
      repoUrl: 'https://github.com/itspsb2/Smart-Construction-Helmet',
      disciplines: ['NodeMCU (ESP8266)', 'MPU6050', 'DHT11', 'MQTT', 'MERN Stack'],
      coverImage: '/assets/aistudio/helmet.png',
      coverAlt: 'Smart Construction Helmet — IoT-based construction worker safety telemetry system',
      overview:
        'An IoT-based worker safety system engineered around NodeMCU (ESP8266), implementing automated fall detection, GPS location tracking, ambient temperature/humidity monitoring, and proximity obstacle alerts streamed over MQTT to a MERN Stack dashboard.',
      myRole: [
        'Programmed NodeMCU (ESP8266) firmware integrating MPU6050 accelerometer, DHT11 thermal/humidity sensor, Ultrasonic proximity sensor, and LDR light sensor.',
        'Implemented real-time fall detection thresholds, GPS telemetry capture, and MQTT message publishing.',
        'Conducted hardware wiring, sensor calibration, integration testing, and end-to-end debugging with the MERN Stack monitoring interface.',
      ],
      problemOrContext: {
        kicker: '(SAFETY PROBLEM)',
        heading: 'Giving site supervisors real-time visibility into worker hazards',
        body: 'Construction workers face falls, extreme heat, low visibility, and blind-spot collisions every day. Embedding lightweight sensors inside a standard helmet creates continuous safety telemetry without impeding movement.',
      },
      approach: [
        {
          number: '01',
          title: 'Multi-Sensor Hardware Array',
          description:
            'Combined MPU6050 motion sensing, Ultrasonic obstacle detection, DHT11 climate reading, and LDR ambient light detection on ESP8266.',
        },
        {
          number: '02',
          title: 'MQTT Telemetry Pipeline',
          description:
            'Published low-latency sensor packets over MQTT to trigger instant alerts on the MERN Stack supervision dashboard.',
        },
        {
          number: '03',
          title: 'Field Testing & Calibration',
          description:
            'Bench-tested impact thresholds and sensor noise filtering to minimize false-positive fall alerts.',
        },
      ],
      systemSpecs: {
        primaryFont: 'ESP8266 + C/C++',
        secondaryFont: 'MQTT + MERN',
        palette: [
          { name: 'Hardware White', hex: '#F4F2EE' },
          { name: 'Telemetry Blue', hex: '#2B7FFF' },
          { name: 'Hazard Amber', hex: '#EAB308' },
          { name: 'Chassis Dark', hex: '#1A1B1E' },
        ],
        metrics: [
          { label: 'Microcontroller', value: 'ESP8266' },
          { label: 'Sensors Wired', value: '05' },
          { label: 'Protocol', value: 'MQTT' },
        ],
      },
    },
  ] as ProjectCaseStudy[],
  credentialsHome: {
    heading: 'Credentials & Lab',
    paragraphOne:
      "Pursuing a BICT (Hons) in Software Technology at the University of Sri Jayewardenepura (2024–Present), backed by hands-on industry exposure as a Student Trainee at People's Bank in Walasmulla (10/2023 – 03/2024).",
    paragraphTwo:
      'Alongside academic and real-world engineering builds, I hold six 2026 certifications across Google, Cisco, Google Play Academy, and IBM SkillsBuild — spanning AI Agents, Analytics, Data Foundations, Performance Ads, App Store Readiness, and Computer Hardware.',
  },
  skillset: [
    {
      index: '01',
      title: 'Frontend & Mobile',
      description: 'React.js, React Native, Expo, Next.js, JavaScript, TypeScript, HTML, CSS.',
    },
    {
      index: '02',
      title: 'Backend & Databases',
      description: 'Node.js, Express.js, MongoDB, MySQL, SQL, Firebase Firestore.',
    },
    {
      index: '03',
      title: 'Programming & AI',
      description: 'Python, C, C++, C#, Java — plus OpenAI, n8n workflows & AI Agents.',
    },
    {
      index: '04',
      title: 'IoT, Tools & Craft',
      description: 'Git, GitHub, Postman, Arduino, ESP8266 Sensor Integration, Docker & MQTT.',
    },
  ] as SkillItem[],
  profile: {
    introLead:
      "I'm Janindu Dilshan De Alwis, a BICT (Hons) undergraduate specializing in Software Technology at the University of Sri Jayewardenepura, based in Colombo, Sri Lanka.",
    bodyParagraphs: [
      'I focus on building dependable web and mobile software with React, React Native, Expo, Next.js, TypeScript, and modern JavaScript — pairing clean user interfaces with Node.js, Express, MongoDB, MySQL, and Firebase Firestore.',
      'Beyond standard CRUD web apps, I enjoy connecting software to intelligent and physical systems: orchestrating OpenAI + n8n + Telegram healthcare workflows in Agent MedLink, and wiring ESP8266 microcontrollers with MPU6050, DHT11, and Ultrasonic sensors in Smart Construction Helmet.',
      "Prior to university, I completed a six-month Student Trainee placement at People's Bank (10/2023 – 03/2024) in Walasmulla, building workplace discipline, teamwork, and adaptability alongside problem-solving.",
    ],
    manifesto:
      'Eager to apply technical knowledge, learn from industry professionals, and contribute meaningfully to real-world software engineering teams.',
    facts: [
      { label: 'Degree', value: 'BICT (Hons)' },
      { label: 'University', value: 'USJ, Sri Lanka' },
      { label: 'Based in', value: 'Colombo, SL' },
      { label: 'Availability', value: 'Internship' },
    ],
    experience: {
      role: 'Student Trainee',
      organization: "People's Bank",
      period: '10/2023 – 03/2024',
      location: 'Walasmulla, Sri Lanka',
    },
    education: {
      degree: 'Bachelor of Information and Communication Technology (Honours)',
      field: 'Software Technology',
      institution: 'University of Sri Jayewardenepura',
      period: '01/07/2024 – Present',
      location: 'Nugegoda, Sri Lanka',
      website: 'https://www.sjp.ac.lk',
    },
    referee: {
      name: 'Ms. Upeksha Madhu Hansani',
      title: 'Lecturer · Department of Information and Communication Technology',
      faculty: 'Faculty of Technology, University of Sri Jayewardenepura',
      phone: '+94 76 395 3691',
      email: 'upekshahansani@sjp.sc.lk',
    },
    faqs: [
      {
        q: 'What roles am I currently looking for?',
        a: 'I am actively seeking a Software Engineering Internship (Full-Stack, Frontend, Mobile, or AI/IoT-integrated product teams) where I can ship production code and learn from experienced engineers.',
      },
      {
        q: 'Which languages and frameworks am I strongest in?',
        a: 'JavaScript, TypeScript, React.js, React Native, Expo, and Next.js on the frontend/mobile side; Node.js, Express.js, Firebase Firestore, MongoDB, and MySQL on the backend; plus Python, C, C++, C#, and Java.',
      },
      {
        q: 'How can teams review my code and projects?',
        a: 'Every featured project links directly to its GitHub repository, and my complete PDF resume is available right from this site.',
      },
    ],
  },
  labNodes: [
    {
      id: 'node-01',
      title: 'BoardLK · React Native + Maps',
      category: 'Mobile',
      year: '2026',
      x: 110,
      y: 80,
      width: 360,
      height: 240,
      accentColor: '#D12424',
      bgColor: '#EFEEEB',
      image: '/assets/aistudio/BoardLK_UX_Case_Study_f286eea3.png',
      caption: 'Expo Router + Zustand + React Native Maps accommodation discovery app.',
    },
    {
      id: 'node-02',
      title: 'Agent MedLink · OpenAI + n8n',
      category: 'AI & Agents',
      year: '2026',
      x: 520,
      y: 110,
      width: 345,
      height: 230,
      accentColor: '#1ECAD3',
      bgColor: '#EFEEEB',
      image: '/assets/aistudio/medlink.png',
      caption: 'Next.js + Firestore + Telegram conversational appointment automation.',
    },
    {
      id: 'node-03',
      title: 'TypeScript · Zustand · Expo',
      category: 'Language',
      year: '2026',
      x: 910,
      y: 70,
      width: 260,
      height: 260,
      accentColor: '#D12424',
      bgColor: '#0D0D0B',
      caption: 'Strictly typed cross-platform architecture for mobile and web.',
    },
    {
      id: 'node-04',
      title: 'Live Crowds · React + Vite',
      category: 'Frontend',
      year: '2026',
      x: 180,
      y: 390,
      width: 330,
      height: 220,
      accentColor: '#D12424',
      bgColor: '#0D0D0B',
      image: '/assets/aistudio/livecrowds.png',
      caption: 'Tourist crowd tracking with group check-in and automatic checkout.',
    },
    {
      id: 'node-05',
      title: 'Smart Helmet · ESP8266 + MQTT',
      category: 'IoT & Hardware',
      year: '2026',
      x: 575,
      y: 410,
      width: 330,
      height: 220,
      accentColor: '#2B7FFF',
      bgColor: '#0D0D0B',
      image: '/assets/aistudio/helmet.png',
      caption: 'NodeMCU, MPU6050, DHT11, Ultrasonic & LDR streamed to MERN Stack.',
    },
    {
      id: 'node-06',
      title: 'Node.js · MongoDB · MySQL',
      category: 'Backend',
      year: '2026',
      x: 960,
      y: 390,
      width: 270,
      height: 230,
      accentColor: '#D12424',
      bgColor: '#D12424',
      caption: 'REST APIs with Express.js, relational SQL schemas, and Firestore.',
    },
  ] as LabNodePiece[],
  certifications: [
    {
      id: 'ibm-ai-agents',
      title: 'Unleashing the Power of AI Agents',
      issuer: 'IBM SkillsBuild',
      category: 'Cisco & IBM',
      year: '2026',
      focus: 'Autonomous Workflows & Agent Design',
      dateOrder: 6,
      image: '/assets/aistudio/unleash_7a61449e.jpg',
      imageFit: 'contain',
    },
    {
      id: 'google-play-store-listing',
      title: 'Store Listing Certificate',
      issuer: 'Google Play Academy',
      category: 'Play Academy',
      year: '2026',
      focus: 'Mobile App Publishing & ASO Readiness',
      dateOrder: 5,
      image: '/assets/aistudio/1772535784146_696dd976.jpg',
      imageFit: 'contain',
    },
    {
      id: 'cisco-hardware',
      title: 'Computer Hardware Basics',
      issuer: 'Cisco',
      category: 'Cisco & IBM',
      year: '2026',
      focus: 'Hardware Architecture & Embedded Foundations',
      dateOrder: 4,
      image: '/assets/aistudio/1772554289027_f989df83.jpg',
      imageFit: 'contain',
    },
    {
      id: 'google-analytics',
      title: 'Google Analytics Certification',
      issuer: 'Google',
      category: 'Google',
      year: '2026',
      focus: 'Product Telemetry & Conversion Insights',
      dateOrder: 3,
      image: '/assets/aistudio/1772607503067_ea3bcc77.jpg',
      imageFit: 'contain',
    },
    {
      id: 'google-ai-ads',
      title: 'AI-Powered Performance Ads Certification',
      issuer: 'Google',
      category: 'Google',
      year: '2026',
      focus: 'AI Optimization & Growth Systems',
      dateOrder: 2,
      image: '/assets/aistudio/1772609271802_626f8e2f.jpg',
      imageFit: 'contain',
    },
    {
      id: 'google-data-foundations',
      title: 'Foundations: Data, Data, Everywhere',
      issuer: 'Google · Coursera',
      category: 'Google',
      year: '2026',
      focus: 'Data Analytics Foundations & Decision Systems',
      dateOrder: 1,
      image: '/assets/aistudio/1770986213556_cfd4c06a.jpg',
      imageFit: 'contain',
    },
  ] as CertificationItem[],
  socials: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/janindu-alwis' },
    { name: 'GitHub', url: 'https://github.com/janinduAlwis' },
    { name: 'WhatsApp', url: 'https://wa.me/94765488419' },
  ],
};
