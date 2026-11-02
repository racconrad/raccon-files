export type Locale = 'es' | 'en';
export type { Scene } from './navigation';
export type Localized<T> = Record<Locale, T>;
import { site } from '../site.config';
export const defaultProjectId = 'kwallet';

// Turn sections on or off. Home always shows; hidden scenes leave the menu,
// the scene dots, and the resume.
export const show = {
  projects: true,
  skills: true,
  about: true,
  journey: true,
  contact: true,
  timeline: true,
  certificates: true,
  resume: true,
};

export interface Project {
  id: string;
  name: string;
  icon: string;
  technologies: string[];
  content: Localized<{
    title: string;
    description: string;
    context: string;
    role: string;
    features: string[];
    // Step-by-step workflow rendered as diagram in preview.
    flow: string[];
  }>;
  url?: string;
  demo?: string;
}

export const profile = {
  name: site.name,
  github: site.github,
  description: {
    es: 'Desarrollador junior. Me gusta diseñar y programar herramientas útiles, con atención a cómo se sienten al usarlas.',
    en: 'Junior developer. I enjoy designing and building useful tools, with care for how they feel to use.',
  },
};

export const projects: Project[] = [
  {
    id: 'kwallet',
    name: 'KWallet',
    icon: 'cat',
    technologies: ['Flutter', 'Dart', 'SQLite', 'GitHub Gists'],
    url: 'https://github.com/racconrad/kwallet',
    content: {
      es: {
        title: 'Finanzas, hábitos y gatetes.',
        description:
          'Finanzas personales, hábitos diarios y notas en una sola app local-first, con un compañero pixelado que crece con tu progreso.',
        context: 'Proyecto personal · Android y Linux',
        role: 'Diseño y desarrollo completos. Uno de mis favoritos, y sí: tiene gatetes.',
        features: [
          'Cuentas, movimientos, presupuestos y monedas',
          'Pagos recurrentes y calendario de compromisos',
          'Hábitos con rachas y notas con listas',
          'Compañeros pixelados que suben de nivel',
          'Widget nativo de Android',
          'Datos en SQLite y respaldos opcionales en GitHub Gist',
        ],
        flow: [
          'Interfaz en Flutter',
          'Datos locales en SQLite',
          'XP para tu compañero',
          'Respaldo opcional en Gist',
        ],
      },
      en: {
        title: 'Money, habits, and little cats.',
        description:
          'Personal finances, daily habits, and notes in one local-first app, with a pixel companion that grows with your progress.',
        context: 'Personal project · Android and Linux',
        role: 'Full design and development. One of my favorites, and yes: there are little cats.',
        features: [
          'Accounts, transactions, budgets, and currencies',
          'Recurring payments and a commitments calendar',
          'Habits with streaks and notes with checklists',
          'Pixel companions that level up',
          'Native Android widget',
          'SQLite data and optional GitHub Gist backups',
        ],
        flow: [
          'Flutter interface',
          'Local SQLite data',
          'XP for your companion',
          'Optional Gist backup',
        ],
      },
    },
  },
  {
    id: 'fox',
    name: 'Foxy',
    icon: 'fox',
    technologies: [
      'Go',
      'Python',
      'FastAPI',
      'React Native',
      'Expo',
      'PostgreSQL',
      'pgvector',
      'Supabase',
    ],
    url: 'https://github.com/racconrad/foxy-app',
    content: {
      es: {
        title: 'Aprender con tu propio contexto.',
        description:
          'Plataforma educativa con IA que adapta explicaciones, planes y evaluaciones al perfil del estudiante y al material que sube.',
        context: 'Hackathon Nicaragua 2026 · Prototipo incompleto',
        role: 'Dirigí el proyecto, definí la arquitectura y desarrollé el backend en Go. Trabajé junto a un desarrollador frontend.',
        features: [
          'Arquitectura de tres servicios independientes',
          'API en Go con autenticación JWT',
          'Servicio de IA con FastAPI: chat, RAG y embeddings',
          'Datos y vectores en PostgreSQL + pgvector',
          'App móvil con React Native y Expo',
        ],
        flow: [
          'App móvil (Expo)',
          'API en Go · JWT',
          'Servicio de IA (FastAPI)',
          'Supabase + pgvector',
        ],
      },
      en: {
        title: 'Learning with your own context.',
        description:
          'An AI learning platform that adapts explanations, plans, and assessments to each student’s profile and the material they upload.',
        context: 'Hackathon Nicaragua 2026 · Unfinished prototype',
        role: 'I led the project, defined the architecture, and built the Go backend, working with a frontend developer.',
        features: [
          'Architecture of three independent services',
          'Go API with JWT authentication',
          'FastAPI AI service: chat, RAG, and embeddings',
          'Data and vectors in PostgreSQL + pgvector',
          'React Native and Expo mobile app',
        ],
        flow: [
          'Mobile app (Expo)',
          'Go API · JWT',
          'AI service (FastAPI)',
          'Supabase + pgvector',
        ],
      },
    },
  },
  {
    id: 'sentinel',
    name: 'Sys-Sentinel',
    icon: 'academy',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Zustand',
    ],
    url: 'https://github.com/racconrad/astro-sentinel',
    content: {
      es: {
        title: 'Menos vueltas. Más academia.',
        description:
          'Un sistema para gestionar academias de danza y centros deportivos: membresías, clases, pagos y el contenido de su web.',
        context: 'Proyecto universitario',
        role: 'Fui el único desarrollador, con retroalimentación del equipo.',
        features: [
          'Gestión de clientes y membresías',
          'Clases, pagos y recepción',
          'CMS para una web hecha en Astro',
          'Sesiones con Supabase en el servidor (SSR)',
          'Diseñado para tablets y despliegue en edge',
        ],
        flow: [
          'Recepción en tablet',
          'Next.js · Server Actions',
          'Supabase (Postgres + Auth)',
          'Web pública en Astro',
        ],
      },
      en: {
        title: 'Less busywork. More academy.',
        description:
          'A system for running dance academies and sports centers: memberships, classes, payments, and website content.',
        context: 'University project',
        role: 'I was the sole developer, with feedback from the team.',
        features: [
          'Client and membership management',
          'Classes, payments, and reception',
          'CMS for an Astro website',
          'Server-side Supabase sessions (SSR)',
          'Designed for tablets and edge deployment',
        ],
        flow: [
          'Front desk on a tablet',
          'Next.js · Server Actions',
          'Supabase (Postgres + Auth)',
          'Public Astro website',
        ],
      },
    },
  },
  {
    id: 'tinywidgets',
    name: 'tinyWidgets',
    icon: 'layout',
    technologies: ['Rust', 'Python', 'GTK', 'Eww', 'Wayfire'],
    url: 'https://github.com/racconrad/tinyWidgets',
    content: {
      es: {
        title: 'Pequeños widgets, su propio rincón.',
        description:
          'Un gestor de widgets para el escritorio Linux: gatos, relojes, música, tareas y actividad de GitHub, cada uno en su esquina.',
        context: 'Proyecto personal · Linux',
        role: 'Diseño y desarrollo completos: gestor en Rust, editor visual en Python y componentes.',
        features: [
          'Editor visual: arrastrar, redimensionar y duplicar',
          'Perfiles de distribución por escritorio',
          'Colores tomados del fondo de pantalla',
          'Componentes autocontenidos y extensibles',
          'Instalador que respalda tu configuración',
        ],
        flow: [
          'Editor visual (Python + GTK)',
          'Gestor en Rust',
          'Widgets en Eww',
          'Escritorio Wayfire (IPC)',
        ],
      },
      en: {
        title: 'Tiny widgets, their own corner.',
        description:
          'A widget manager for the Linux desktop: cats, clocks, music, tasks, and GitHub activity, each in its own corner.',
        context: 'Personal project · Linux',
        role: 'Full design and development: Rust manager, Python visual editor, and components.',
        features: [
          'Visual editor: drag, resize, and duplicate',
          'Layout profiles per workspace',
          'Colors taken from the wallpaper',
          'Self-contained, extensible components',
          'Installer that backs up your configuration',
        ],
        flow: [
          'Visual editor (Python + GTK)',
          'Rust manager',
          'Eww widgets',
          'Wayfire desktop (IPC)',
        ],
      },
    },
  },
  {
    id: 'attention',
    name: 'Attention & Habits',
    icon: 'eye',
    technologies: ['TypeScript', 'Vite', 'Supabase', 'PostgreSQL'],
    url: 'https://github.com/racconrad/dreams-root',
    demo: 'https://dreams-root.vercel.app',
    content: {
      es: {
        title: 'Investigación en una sola sesión.',
        description:
          'La plataforma de un estudio universitario sobre cómo los hábitos digitales se relacionan con la atención de estudiantes.',
        context: 'Investigación universitaria · En línea',
        role: 'Desarrollé la plataforma del estudio para el equipo de investigación.',
        features: [
          'Sesión anónima guiada de principio a fin',
          'Cuestionarios validados: MAAS y PPS',
          'Prueba de atención sostenida (CPT)',
          'Nada se guarda hasta el envío final',
          'Textos editables desde un solo archivo',
        ],
        flow: [
          'Consentimiento',
          'Cuestionarios (MAAS · PPS)',
          'Prueba de atención (CPT)',
          'Envío anónimo a Supabase',
        ],
      },
      en: {
        title: 'Research in a single sitting.',
        description:
          'The platform for a university study on how digital habits relate to students’ sustained attention.',
        context: 'University research · Live',
        role: 'I built the study platform for the research team.',
        features: [
          'Guided anonymous session from start to finish',
          'Validated questionnaires: MAAS and PPS',
          'Sustained attention test (CPT)',
          'Nothing is saved until the final submission',
          'All copy editable from a single file',
        ],
        flow: [
          'Consent',
          'Questionnaires (MAAS · PPS)',
          'Attention test (CPT)',
          'Anonymous submission to Supabase',
        ],
      },
    },
  },
  {
    id: 'glados',
    name: 'GlaD0sTy',
    icon: 'terminal',
    technologies: ['QML', 'Qt 6', 'Shell', 'SDDM'],
    url: 'https://github.com/racconrad/sddm-GlaD0sTy',
    content: {
      es: {
        title: 'Iniciar sesión en Aperture Science.',
        description:
          'Un tema de inicio de sesión para Linux que convierte la pantalla en una terminal CRT, con una IA que comenta lo que escribes.',
        context: 'Proyecto personal · Linux',
        role: 'Diseño y desarrollo completos.',
        features: [
          'Terminal de fósforo naranja con scanlines y glitches',
          'Una IA residente que reacciona al escribir',
          'Instalador que respalda la configuración original',
          'Verificación de dependencias al instalar',
        ],
        flow: [
          'Pantalla de SDDM',
          'Interfaz en QML (Qt 6)',
          'Efectos CRT',
          'IA que comenta',
        ],
      },
      en: {
        title: 'Log in to Aperture Science.',
        description:
          'A Linux login theme that turns the screen into a CRT terminal, with an AI that comments on your typing.',
        context: 'Personal project · Linux',
        role: 'Full design and development.',
        features: [
          'Orange-phosphor terminal with scanlines and glitches',
          'A resident AI that reacts as you type',
          'Installer that backs up the original configuration',
          'Dependency checks during installation',
        ],
        flow: [
          'SDDM screen',
          'QML interface (Qt 6)',
          'CRT effects',
          'Commenting AI',
        ],
      },
    },
  },
];

// Compact secondary repositories.
export const moreProjects = [
  {
    name: 'Urban',
    url: 'https://github.com/racconrad/Urban',
    tech: 'C# · .NET MAUI · Firebase',
    description: {
      es: 'App de transporte público en tiempo real (equipo universitario)',
      en: 'Real-time public transport app (university team)',
    },
  },
  {
    name: 'Dunobot',
    url: 'https://github.com/racconrad/dunobot',
    tech: 'Go',
    description: { es: 'Bot de Discord', en: 'Discord bot' },
  },
  {
    name: 'Limbo Keys',
    url: 'https://racconrad.github.io/Limbo-Keys-Javascript/',
    tech: 'JavaScript',
    description: {
      es: 'Juego web inspirado en Geometry Dash',
      en: 'Web game inspired by Geometry Dash',
    },
  },
];

// Technology proficiency levels.
export const stack = [
  {
    level: 3,
    label: { es: 'Uso con soltura', en: 'Comfortable' },
    tools: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    level: 2,
    label: { es: 'Experiencia en proyectos', en: 'Project experience' },
    tools: [
      'Go',
      'TypeScript',
      'Node.js',
      'Next.js',
      'Astro',
      'C#',
      'Supabase',
      'SQLite',
      'MySQL',
      'MongoDB',
      'Python',
      'React Native',
    ],
  },
  {
    level: 1,
    label: { es: 'Aprendiendo', en: 'Learning' },
    tools: ['Flutter', 'Dart', 'Rust', 'ASP.NET'],
  },
] as const;

export const skills = [
  {
    id: 'interfaces',
    icon: 'layout',
    tools: ['React', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Astro'],
    title: { es: 'Interfaces', en: 'Interfaces' },
    description: {
      es: 'Disfruto construir la parte que las personas ven y usan. React, Tailwind y JavaScript son herramientas con las que me siento cómodo; sigo mejorando en TypeScript.',
      en: 'I enjoy building what people see and use. React, Tailwind, and JavaScript are tools I feel comfortable with; I am still improving my TypeScript.',
    },
    evidence: {
      es: 'En práctica: Sys-Sentinel y este portafolio.',
      en: 'In practice: Sys-Sentinel and this portfolio.',
    },
  },
  {
    id: 'backend',
    icon: 'terminal',
    tools: ['Node.js', 'Go', 'C#', 'Express', 'Next.js'],
    title: { es: 'Sistemas y lógica', en: 'Systems & logic' },
    description: {
      es: 'Me interesa conectar las piezas para resolver necesidades reales. Trabajo con Node.js, C# y Go; en Go considero que tengo experiencia intermedia.',
      en: 'I like connecting the pieces to solve real needs. I work with Node.js, C#, and Go, with intermediate experience in Go.',
    },
    evidence: {
      es: 'En práctica: backend y dirección de Fox; desarrollo de Sentinel.',
      en: 'In practice: Fox backend and direction; Sentinel development.',
    },
  },
  {
    id: 'data',
    icon: 'database',
    tools: ['MySQL', 'SQL Server', 'MongoDB', 'Supabase', 'Firebase', 'SQLite'],
    title: { es: 'Datos', en: 'Data' },
    description: {
      es: 'He trabajado con bases de datos relacionales, documentos y servicios como Supabase y Firebase. En KWallet los datos viven en SQLite, en el dispositivo.',
      en: 'I have worked with relational databases, documents, and services such as Supabase and Firebase. KWallet stores data locally in SQLite.',
    },
    evidence: {
      es: 'En práctica: Supabase en Sentinel y SQLite en KWallet.',
      en: 'In practice: Supabase in Sentinel and SQLite in KWallet.',
    },
  },
  {
    id: 'mobile',
    icon: 'phone',
    tools: ['Flutter', 'Dart', 'React Native', 'Expo'],
    title: { es: 'Aplicaciones', en: 'Applications' },
    description: {
      es: 'Estoy aprendiendo Flutter y Dart mientras construyo KWallet. También he trabajado en un proyecto con React Native y Expo.',
      en: 'I am learning Flutter and Dart while building KWallet. I have also worked on a project using React Native and Expo.',
    },
    evidence: {
      es: 'En práctica: KWallet y Fox.',
      en: 'In practice: KWallet and Fox.',
    },
  },
  {
    id: 'direction',
    icon: 'compass',
    tools: ['Project management', 'Backend development', 'Team feedback'],
    title: { es: 'Conectar las piezas', en: 'Connecting the pieces' },
    description: {
      es: 'En Fox asumí la gestión y dirección del proyecto junto al backend. En Sentinel desarrollé el sistema con retroalimentación del equipo. Me gusta ayudar y simplificar el trabajo de otros.',
      en: 'In Fox, I handled project management and direction alongside the backend. For Sentinel, I developed the system with team feedback. I enjoy helping and simplifying other people’s work.',
    },
    evidence: {
      es: 'Experiencia en proyectos universitarios y de hackathon.',
      en: 'Experience from university and hackathon projects.',
    },
  },
  {
    id: 'learning',
    icon: 'spark',
    tools: ['Rust', 'Algorithms', 'Software engineering', 'Flutter', 'ASP.NET'],
    title: { es: 'En exploración', en: 'Exploring' },
    description: {
      es: 'Sigo aprendiendo Rust, algoritmos, ingeniería de software y Flutter. Tengo experiencia inicial con ASP.NET y he explorado Angular y NestJS.',
      en: 'I am continuing to learn Rust, algorithms, software engineering, and Flutter. I have initial ASP.NET experience and have explored Angular and NestJS.',
    },
    evidence: {
      es: 'Aprendizaje en curso: Rust, algoritmos, ingeniería de software y Flutter.',
      en: 'Currently learning Rust, algorithms, software engineering, and Flutter.',
    },
  },
] as const;

export interface Step {
  date: Localized<string>;
  title: Localized<string>;
  detail: Localized<string>;
}

// Newest first. Project dates are when each repository was created.
export const timeline: Step[] = [
  {
    date: { es: 'Actual', en: 'Now' },
    title: { es: 'Ingeniería en Sistemas', en: 'Systems Engineering' },
    detail: { es: 'Último año', en: 'Final year' },
  },
  {
    date: { es: 'Oct 2026', en: 'Oct 2026' },
    title: { es: 'KWallet', en: 'KWallet' },
    detail: {
      es: 'App local-first en Flutter con SQLite',
      en: 'Local-first Flutter app with SQLite',
    },
  },
  {
    date: { es: 'Sep 2026', en: 'Sep 2026' },
    title: { es: 'Attention & Habits', en: 'Attention & Habits' },
    detail: {
      es: 'Plataforma para una investigación universitaria',
      en: 'Platform for a university research study',
    },
  },
  {
    date: { es: 'Jul 2026', en: 'Jul 2026' },
    title: { es: 'Hackathon Nicaragua', en: 'Hackathon Nicaragua' },
    detail: {
      es: 'Dirección y backend en Go de Foxy',
      en: 'Direction and Go backend for Foxy',
    },
  },
  {
    date: { es: 'Jun 2026', en: 'Jun 2026' },
    title: { es: 'Sys-Sentinel', en: 'Sys-Sentinel' },
    detail: {
      es: 'Sistema de gestión con Next.js y Supabase',
      en: 'Management system with Next.js and Supabase',
    },
  },
  {
    date: { es: 'Dic 2025', en: 'Dec 2025' },
    title: { es: 'Urban', en: 'Urban' },
    detail: {
      es: 'App de transporte en equipo universitario',
      en: 'Transport app with a university team',
    },
  },
  {
    date: { es: 'May 2025', en: 'May 2025' },
    title: { es: 'Limbo Keys', en: 'Limbo Keys' },
    detail: {
      es: 'Primer juego web en JavaScript',
      en: 'First web game in JavaScript',
    },
  },
];

export interface Certificate {
  name: Localized<string>;
  issuer: string;
  year: string;
  url?: string;
}

// Placeholders: replace with real certificates before publishing.
export const certificates: Certificate[] = [
  {
    name: { es: 'Nombre del certificado', en: 'Certificate name' },
    issuer: 'Institución',
    year: '2026',
  },
  {
    name: { es: 'Curso en línea', en: 'Online course' },
    issuer: 'Plataforma',
    year: '2026',
  },
];
