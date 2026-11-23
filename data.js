/* ==========================================================================
   DATOS DEL SITIO  (edita aquí el contenido sin tocar el diseño)
   ========================================================================== */

window.SITE = {
  name: 'Elvin Morales',
  whatsapp: '50234064744',            // código de país + número
  email: 'elvinmorales48@gmail.com',
  linkedin: 'https://www.linkedin.com/in/elvin-morales/',
  github: 'https://github.com/emoralesd3'
};

/* --------------------------------------------------------------------------
   PROYECTOS
   - images: [{ src: 'img/sistema-contable/login.png', caption: 'Inicio de sesión' }]
   - links.live: URL del sitio funcionando (si está vacío, no se muestra el botón)
   - links.repo: URL del repositorio (opcional)
   - stack: tecnologías usadas en ese proyecto (opcional, si está vacío no se muestra)
   - hue: color de la portada (0-360)
   -------------------------------------------------------------------------- */
window.PROJECTS = [
  {
    slug: 'sistema-contable',
    title: 'Sistema contable',
    subtitle: 'Contabilidad y bancos en un solo lugar: de la partida al balance general.',
    mono: 'SC',
    year: '2026',
    company: 'BITESEIT',
    role: 'Analista desarrollador de software',
    type: 'Sistema web a la medida',
    area: 'Contabilidad',
    hue: 160,
    tags: ['Contabilidad', 'Bancos', 'Reportes'],
    summary: 'Plataforma contable que centraliza cuentas, bancos, cheques, conciliaciones y cierres, y genera los estados financieros listos para consulta.',
    about: [
      'Sistema contable completo pensado para llevar la contabilidad de una organización sin depender de hojas de cálculo: catálogo de cuentas, centros de costos, cuentas bancarias y control de chequeras en una sola plataforma.',
      'Incluye conciliaciones bancarias, partidas contables de bancos y ajustes, cierres contables y la configuración de formatos de cheques y numeración de pólizas, para adaptarse a la forma de trabajar de cada empresa.'
    ],
    solves: [
      'Información contable y bancaria centralizada y consistente.',
      'Conciliaciones y cierres ordenados, con menos trabajo manual.',
      'Estados financieros y libros contables disponibles cuando se necesitan.',
      'Control de accesos por usuario, rol y permisos.'
    ],
    modules: [
      { group: 'Administración', items: ['Gestión de usuarios, roles, menús y permisos', 'Sistema de notificaciones push/email'] },
      { group: 'Catálogos contables', items: ['Cuentas contables', 'Centros de costos', 'Configuración de numeración de pólizas'] },
      { group: 'Bancos', items: ['Cuentas bancarias', 'Gestión de chequeras', 'Configuración de formatos de cheques', 'Conciliaciones bancarias', 'Partidas contables bancarias y ajustes'] },
      { group: 'Cierres y reportes', items: ['Cierres contables', 'Estado de resultados', 'Libro diario', 'Libro mayor', 'Balance general'] },
      { group: 'Facturación electrónica', items: ['Emisión y certificación de facturas electrónicas mediante certificador SAT', 'Anulación de facturas electrónicas'] }
    ],
    stack: [],
    images: [],
    links: { live: '', repo: '' }
  },
  {
    slug: 'sistema-financiero',
    title: 'Sistema financiero de créditos',
    subtitle: 'Del expediente del cliente a la recuperación de cartera.',
    mono: 'SF',
    year: '2026',
    company: 'BITESEIT',
    role: 'Analista desarrollador de software',
    type: 'Sistema web a la medida',
    area: 'Finanzas',
    hue: 38,
    tags: ['Créditos', 'Cartera', 'Firma digital'],
    summary: 'Gestión integral de créditos: solicitudes, aprobación por comité, plan de pagos, cartera, mora y recuperación, con firmas digitales y notificaciones.',
    about: [
      'Sistema para instituciones que otorgan créditos: administra al cliente, su historial crediticio y las solicitudes de crédito individual, de empleado y grupal, con productos crediticios configurables.',
      'Cada solicitud pasa por un flujo de aprobación por comité configurable, genera su tabla de amortización o plan de pagos y se da seguimiento a la cartera, los pagos, las exoneraciones y la recuperación.'
    ],
    solves: [
      'Solicitudes y expedientes de crédito ordenados y trazables.',
      'Aprobación por comité con reglas configurables.',
      'Pagos, reasignaciones y exoneraciones con control.',
      'Reportes de cartera, historial crediticio y recuperación.'
    ],
    modules: [
      { group: 'Administración', items: ['Gestión de usuarios, roles, menús y permisos', 'Sistema de notificaciones push/email', 'Sistema de firmas digitales'] },
      { group: 'Clientes y solicitudes', items: ['Formularios de gestión de clientes', 'Solicitudes de crédito individual, empleado y grupal', 'Historial crediticio', 'Aprobación de créditos por comité configurado'] },
      { group: 'Cartera y productos', items: ['Productos crediticios', 'Cartera de créditos', 'Reasignación de pagos y carteras'] },
      { group: 'Pagos y recuperación', items: ['Gestión de pagos', 'Tabla de amortización o plan de pagos', 'Gestión de exoneración de pagos', 'Reportes crediticios y de recuperación'] },
      { group: 'Facturación electrónica', items: ['Emisión y certificación de facturas electrónicas mediante certificador SAT', 'Anulación de facturas electrónicas'] }
    ],
    stack: [],
    images: [],
    links: { live: '', repo: '' }
  },
  {
    slug: 'control-tickets',
    title: 'Sistema de control de tickets',
    subtitle: 'Soporte medible: asignación, tiempos de atención y satisfacción del usuario.',
    mono: 'CT',
    year: '2025',
    company: 'BITESEIT',
    role: 'Analista desarrollador de software',
    type: 'Mesa de ayuda a la medida',
    area: 'Atención al cliente',
    hue: 12,
    tags: ['Soporte', 'KPI', 'Dashboard'],
    summary: 'Mesa de ayuda donde el cliente solicita soporte, un analista revisa y asigna al técnico, y se monitorean los tiempos y la satisfacción con encuestas KPI.',
    about: [
      'Plataforma de soporte para recibir, clasificar y dar seguimiento a las solicitudes de los clientes. El usuario solicita ayuda desde un formulario, un analista revisor evalúa el ticket y lo asigna al técnico responsable.',
      'El administrador cuenta con un dashboard para controlar y dar seguimiento a cada técnico y a los tickets asignados, y al finalizar la atención el usuario responde una encuesta KPI.'
    ],
    solves: [
      'Ninguna solicitud se pierde: todo queda registrado y asignado.',
      'Control y monitoreo del tiempo de atención.',
      'Medición de la satisfacción con encuestas KPI.',
      'Visibilidad de la carga de trabajo de cada técnico.'
    ],
    modules: [
      { group: 'Administración', items: ['Gestión de usuarios, roles, menús y permisos', 'Formulario de primer ingreso de usuario', 'Sistema de notificaciones push/email'] },
      { group: 'Atención', items: ['Formulario para que el cliente solicite soporte', 'Formulario del analista revisor y asignación a técnico responsable', 'Reasignación de tickets', 'Control y monitoreo del tiempo de atención'] },
      { group: 'Medición', items: ['Encuesta KPI después de la atención', 'Dashboard administrativo por técnico y tickets asignados', 'Reportes de atención de tickets'] }
    ],
    stack: [],
    images: [],
    links: { live: '', repo: '' }
  },
  {
    slug: 'sistema-parroquial',
    title: 'Sistema Parroquial',
    subtitle: 'Pagos, ofrendas y constancias de la parroquia, ordenados y consultables.',
    mono: 'SP',
    year: '2024',
    company: 'Consultoría individual',
    role: 'Desarrollador de software',
    type: 'Sistema web a la medida',
    area: 'Organizaciones',
    hue: 285,
    tags: ['Consultoría', 'Pagos', 'Constancias'],
    summary: 'Sistema para la administración parroquial: control de pagos y ofrendas, emisión de constancias y reportes de ingresos.',
    about: [
      'Consultoría individual para digitalizar la administración de una parroquia: el control de pagos (crédito, transferencia y efectivo), el registro de ofrendas y la emisión de constancias.',
      'Permite consultar eventos y obtener reportes de ingresos diarios o por rango de fechas, con acceso controlado por usuarios, roles y permisos.'
    ],
    solves: [
      'Registro ordenado de pagos y ofrendas.',
      'Constancias de bautismo, casamiento, 15 años, difuntos y más.',
      'Reportes de ingresos diarios y por rango de fechas.',
      'Consulta rápida de eventos.'
    ],
    modules: [
      { group: 'Administración', items: ['Gestión de usuarios, roles, menús y permisos'] },
      { group: 'Control financiero', items: ['Control de pagos: crédito, transferencia y efectivo', 'Control de ofrendas'] },
      { group: 'Constancias y reportes', items: ['Constancias de bautismo, casamiento, 15 años, difuntos y otras', 'Reportes de ingresos diarios y por rango de fechas', 'Consulta de eventos'] }
    ],
    stack: [],
    images: [],
    links: { live: '', repo: '' }
  }
];

/* --------------------------------------------------------------------------
   SERVICIOS  (problema -> solución), filtrables por área
   areas posibles: finanzas, contabilidad, operaciones, ventas, atencion,
                   personas, organizaciones, profesionales, tecnologia
   project: slug de un proyecto relacionado (muestra enlace "Ver proyecto")
   -------------------------------------------------------------------------- */
window.AREAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'organizaciones', label: 'Organizaciones' },
  { id: 'contabilidad', label: 'Contabilidad' },
  { id: 'finanzas', label: 'Finanzas' },
  { id: 'operaciones', label: 'Operaciones' },
  { id: 'ventas', label: 'Ventas y marketing' },
  { id: 'atencion', label: 'Atención al cliente' },
  { id: 'personas', label: 'Personas y RRHH' },
  { id: 'profesionales', label: 'Profesionales' },
  { id: 'tecnologia', label: 'Tecnología' }
];

window.SERVICES = [
  { areas: ['finanzas', 'operaciones'], title: 'Gestión de créditos y cartera',
    problem: 'Expedientes en papel o Excel y poca claridad sobre quién debe qué y cuándo.',
    solution: 'Solicitudes individuales, de empleado y grupales, aprobación por comité, plan de pagos, seguimiento de cartera y recuperación.',
    project: 'sistema-financiero' },
  { areas: ['finanzas', 'operaciones'], title: 'Control de pagos y exoneraciones',
    problem: 'Pagos difíciles de aplicar a la cuota correcta, de reasignar o de corregir cuando hay errores.',
    solution: 'Gestión de pagos, reasignación entre créditos y carteras, exoneraciones con control y notificaciones automáticas por email o push.',
    project: 'sistema-financiero' },
  { areas: ['contabilidad', 'finanzas', 'operaciones'], title: 'Sistema contable y bancario a la medida',
    problem: 'Contabilidad dispersa, bancos conciliados a mano, cheques con formatos propios y cierres que toman días.',
    solution: 'Catálogo de cuentas, centros de costos, bancos con chequeras y formatos de cheque configurables, conciliaciones, partidas, cierres, libros y estados financieros.',
    project: 'sistema-contable' },
  { areas: ['operaciones'], title: 'Automatización de procesos',
    problem: 'Tareas repetitivas, aprobaciones por correo y seguimiento en hojas de cálculo.',
    solution: 'Flujos digitales con roles, aprobaciones, formularios y notificaciones por email o push.' },
  { areas: ['operaciones', 'organizaciones'], title: 'Modernización de sistemas de gestión de actividades y servicios',
    problem: 'Sistemas internos antiguos para registrar actividades, servicios y seguimiento que ya no responden a lo que la institución necesita.',
    solution: 'Rediseño y migración a una plataforma web moderna, con flujos, roles, reportes y trazabilidad de cada actividad y servicio.' },
  { areas: ['operaciones'], title: 'Dashboards e indicadores',
    problem: 'Decisiones tomadas sin datos a tiempo.',
    solution: 'Paneles con KPIs en vivo y reportes exportables para cada área.',
    project: 'control-tickets' },
  { areas: ['operaciones'], title: 'Inventarios y control de activos',
    problem: 'No se sabe qué hay, dónde está ni quién lo tiene.',
    solution: 'Control de existencias, movimientos, responsables y reportes de auditoría.' },
  { areas: ['ventas'], title: 'CRM y seguimiento de ventas',
    problem: 'Prospectos que se enfrían porque nadie les da seguimiento a tiempo.',
    solution: 'Embudo de ventas, historial por cliente, recordatorios y reportes por vendedor.' },
  { areas: ['ventas'], title: 'Tiendas en línea y catálogos',
    problem: 'Vender solo por mensajes y fotos limita el alcance del negocio.',
    solution: 'Catálogo web, carrito, pedidos y atención por WhatsApp integrada.' },
  { areas: ['organizaciones', 'tecnologia'], title: 'Sitio web institucional y portal de servicios',
    problem: 'Una institución sin presencia web ordenada, con trámites e información dispersos que obligan al usuario a ir en persona.',
    solution: 'Desarrollo e implementación del sitio institucional y de un portal de servicios: información clara, trámites y consultas en línea.' },
  { areas: ['ventas'], title: 'Sitios y páginas de aterrizaje',
    problem: 'Campañas que mandan tráfico a páginas lentas o sin medición.',
    solution: 'Sitios rápidos, formularios que capturan clientes potenciales y analítica de resultados.' },
  { areas: ['ventas', 'atencion'], title: 'Mensajería y notificaciones',
    problem: 'Avisos, recordatorios y campañas enviados a mano.',
    solution: 'Envíos automáticos por correo, push y WhatsApp según eventos o segmentos.' },
  { areas: ['atencion'], title: 'Mesa de ayuda y tickets',
    problem: 'Solicitudes de soporte que se pierden y tiempos de respuesta que nadie mide.',
    solution: 'Tickets con asignación, control de tiempos, encuestas KPI y panel por técnico.',
    project: 'control-tickets' },
  { areas: ['atencion'], title: 'Portales de autoservicio y chatbots',
    problem: 'Las mismas preguntas respondidas cientos de veces.',
    solution: 'Portales para consultar estados y trámites, y bots que atienden lo frecuente.' },
  { areas: ['personas'], title: 'Gestión de personal y solicitudes',
    problem: 'Permisos, vacaciones y expedientes manejados en papel o chats.',
    solution: 'Solicitudes con flujo de aprobación, expedientes digitales y firmas electrónicas.' },
  { areas: ['organizaciones', 'operaciones'], title: 'Administración para iglesias y parroquias',
    problem: 'Aportes, ofrendas y constancias registrados en cuadernos.',
    solution: 'Control de pagos, constancias, eventos y reportes de ingresos.',
    project: 'sistema-parroquial' },
  { areas: ['profesionales'], title: 'Herramientas para profesionales independientes',
    problem: 'Cotizar, agendar y cobrar se vuelve un trabajo aparte del trabajo.',
    solution: 'Agenda, cotizaciones, portal para clientes y presencia web profesional.' },
  { areas: ['tecnologia'], title: 'Aplicaciones móviles (Flutter)',
    problem: 'Tu servicio vive solo en una computadora y tus clientes están en el celular.',
    solution: 'Apps para Android e iOS con un solo código, conectadas a tus sistemas.' },
  { areas: ['tecnologia', 'operaciones'], title: 'Firma electrónica con la Cámara de Comercio',
    problem: 'Documentos y trámites que se imprimen, se firman a mano y se escanean, con demoras y sin trazabilidad.',
    solution: 'Integración de la firma electrónica de la Cámara de Comercio en tu sistema: se firma desde la propia plataforma y el documento queda registrado dentro del flujo de aprobación.',
    project: 'sistema-financiero' },
  { areas: ['tecnologia', 'contabilidad', 'finanzas'], title: 'Facturación electrónica con certificador SAT',
    problem: 'Facturas emitidas en portales aparte y datos digitados dos veces, con riesgo de errores y de incumplimiento.',
    solution: 'Integración con un certificador autorizado por la SAT: tu sistema emite, certifica y anula facturas electrónicas, con consulta de NIT para validar al cliente.',
    project: 'sistema-contable' },
  { areas: ['tecnologia'], title: 'APIs e integraciones',
    problem: 'Sistemas que no se hablan entre sí y obligan a digitar dos veces.',
    solution: 'APIs y conectores con bancos, pasarelas de pago, WhatsApp, consulta de NIT y RENAP, además de firma electrónica y facturación electrónica.' },
  { areas: ['tecnologia'], title: 'Seguridad y modernización',
    problem: 'Sistemas antiguos, lentos o con accesos poco controlados.',
    solution: 'Revisión de seguridad, roles y permisos, migración y arquitectura mantenible.' }
];

/* Filtros para el formulario de contacto */
window.PROJECT_TYPES = [
  'Desarrollo a la medida', 'Finanzas / créditos', 'Contabilidad', 'Operaciones y procesos',
  'Ventas y marketing', 'Atención al cliente', 'Aplicación móvil', 'Integraciones / API',
  'Sitio web o tienda en línea', 'Otro'
];
