import { NewsArticle, RssFeedSource, PodcastEpisode } from '../types';

export const INITIAL_FEEDS: RssFeedSource[] = [
  {
    id: 'feed-gnews-rd',
    name: 'Google News (Actualidad República Dominicana)',
    url: 'https://news.google.com/rss/search?q=Rep%C3%BAblica+Dominicana&hl=es-419&gl=US&ceid=US:es-419',
    category: 'rd',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'official',
  },
  {
    id: 'feed-diariolibre',
    name: 'Diario Libre (Rep. Dominicana)',
    url: 'https://www.diariolibre.com/rss/portada.xml',
    category: 'rd',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-remolacha',
    name: 'Remolacha.net (Actualidad y Dominicana)',
    url: 'https://remolacha.net/feed/',
    category: 'rd',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-economia',
    name: 'Google News (Economía y Negocios RD)',
    url: 'https://news.google.com/rss/search?q=Economia+Republica+Dominicana&hl=es-419&gl=US&ceid=US:es-419',
    category: 'economia',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-economia-global',
    name: 'Google News (Economía Global, Wall Street y Mercados)',
    url: 'https://news.google.com/rss/search?q=economia+global+mercados+finanzas+wall+street+bancos+centrales&hl=es-419&gl=US&ceid=US:es-419',
    category: 'economia',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-lidom',
    name: 'Google News (LIDOM y Béisbol Quisqueyano)',
    url: 'https://news.google.com/rss/search?q=LIDOM+pelota+invernal+Dominicana&hl=es-419&gl=US&ceid=US:es-419',
    category: 'deportes',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-deportes-global',
    name: 'Google News (Deportes Internacionales: Champions, Fútbol, NBA y F1)',
    url: 'https://news.google.com/rss/search?q=deportes+futbol+champions+league+nba+f1&hl=es-419&gl=US&ceid=US:es-419',
    category: 'deportes',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-mundo',
    name: 'Google News (Titulares Internacionales en Español)',
    url: 'https://news.google.com/rss?hl=es-419&gl=US&ceid=US:es-419',
    category: 'mundo',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'official',
  },
  {
    id: 'feed-bbcmundo',
    name: 'BBC News Mundo (Internacional)',
    url: 'https://feeds.bbci.co.uk/mundo/rss.xml',
    category: 'mundo',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'high',
  },
  {
    id: 'feed-elpais',
    name: 'El País América (Latinoamérica y Mundo)',
    url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/america/portada',
    category: 'mundo',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'high',
  },
  {
    id: 'feed-gnews-tecno',
    name: 'Google News (Tecnología e Inteligencia Artificial Mundial)',
    url: 'https://news.google.com/rss/search?q=tecnologia+inteligencia+artificial&hl=es-419&gl=US&ceid=US:es-419',
    category: 'tecnologia',
    country: 'GLOBAL',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-gnews-tecno-rd',
    name: 'Google News (Tecnología y Ciberseguridad RD)',
    url: 'https://news.google.com/rss/search?q=tecnologia+ciberseguridad+telecomunicaciones+Dominicana&hl=es-419&gl=US&ceid=US:es-419',
    category: 'tecnologia',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
  {
    id: 'feed-acento',
    name: 'Acento Diario (Opinión y Política RD)',
    url: 'https://acento.com.do/rss/feed',
    category: 'opinion',
    country: 'DO',
    enabled: true,
    lastFetched: null,
    status: 'healthy',
    itemCount: 0,
    reliability: 'trusted',
  },
];

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'Banco Central proyecta crecimiento del PIB dominicano en 5.1% impulsado por turismo e inversión extranjera',
    excerpt: 'El dinamismo en el sector turístico de Punta Cana y Pedernales, junto con la estabilidad del peso y remesas récord, consolidan a República Dominicana como líder en el Caribe.',
    content: `El gobernador del Banco Central de la República Dominicana (BCRD) presentó hoy el informe trimestral sobre el desempeño macroeconómico del país, destacando un ritmo de crecimiento sostenido estimado en 5.1% para el cierre del año.

Entre los factores catalizadores se encuentran la llegada sin precedentes de visitantes no residentes, la modernización de los polos turísticos de Cabo Rojo en Pedernales y Miches, así como la captación de más de US$4,200 millones en Inversión Extranjera Directa (IED).

Asimismo, las reservas internacionales netas se mantienen en máximos históricos, cubriendo más de cinco meses de importaciones. El BCRD reiteró su compromiso de mantener la tasa de política monetaria en sintonía con la meta de inflación de 4.0% ± 1.0%, garantizando certidumbre para el sector productivo y las familias dominicanas.`,
    summary: [
      'El PIB dominicano proyecta una expansión del 5.1%, afianzando el liderazgo económico en la región centroamericana y el Caribe.',
      'La inversión extranjera directa supera los 4,200 millones de dólares gracias al auge turístico en Pedernales, Miches y Punta Cana.',
      'Las reservas internacionales se mantienen en niveles históricos con una inflación anclada al rango meta del Banco Central.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Fuente Oficial',
      verificationDetails: 'Informe oficial auditado emitido por la Gobernación del Banco Central de la República Dominicana.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Cifras contrastadas con el portal oficial del BCRD.',
        'Metodología alineada a los estándares del Fondo Monetario Internacional (FMI).'
      ]
    },
    tags: ['#EconomiaRD', '#BancoCentral', '#TurismoRD', '#Inversion'],
    category: 'economia',
    subcategory: 'Macroeconomía',
    source: {
      name: 'Banco Central RD / ELINOTICIA Redacción',
      url: 'https://bancentral.gov.do',
      domain: 'bancentral.gov.do',
      feedId: 'feed-listin'
    },
    author: 'Lic. Mariano de la Cruz / Redacción de Economía',
    publishedAt: '2026-09-20T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Indicadores económicos y proyección de crecimiento del Banco Central.',
    isBreaking: true,
    isDominican: true,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 342, twitter: 189, facebook: 420, linkedin: 88 }
  },
  {
    id: 'art-2',
    title: 'LIDOM: Tigres del Licey y Águilas Cibaeñas afinan rotación abridora rumbo al Clásico de Otoño',
    excerpt: 'Con grandes prospectos de Grandes Ligas y veteranos de Grandes Ligas, los eternos rivales de la pelota invernal completan sus entrenamientos en Santo Domingo y Santiago.',
    content: `La Liga de Béisbol Profesional de la República Dominicana (LIDOM) vive una intensa pretemporada. En el Estadio Quisqueya Juan Marichal, los Tigres del Licey confirmaron la incorporación de tres brazos de nivel Triple A y Grandes Ligas a su cuerpo de lanzadores.

Por su parte, las Águilas Cibaeñas celebraron sesión completa en el Estadio Cibao de Santiago bajo la dirección de su mánager, con énfasis en el juego rápido y la defensa de cuadro. 

La fanaticada dominicana ya agota las entradas de abonos para los primeros enfrentamientos del torneo otoño-invernantil, que contará con transmisión en alta definición y tecnología de repetición instantánea con inteligencia artificial.`,
    summary: [
      'Licey y Águilas intensifican su preparación en Santo Domingo y Santiago para la inauguración de la temporada LIDOM.',
      'Brazos con experiencia en Grandes Ligas encabezan las rotaciones de ambos conjuntos emblemáticos.',
      'El torneo implementará nuevas cámaras de rastreo de pitcheo y cronómetro estricto de bateo.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 97,
      sourceRating: 'Medio Verificado',
      verificationDetails: 'Confirmado por boletines de prensa de LIDOM y directivas de los clubes involucrados.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Confirmación directa de las gerencias de Tigres del Licey y Águilas Cibaeñas.',
        'Reglamento oficial validado para el torneo 2026-2027.'
      ]
    },
    tags: ['#LIDOM', '#TigresDelLicey', '#AguilasCibaeñas', '#BeisbolInvernal'],
    category: 'deportes',
    subcategory: 'Béisbol Dominicano',
    source: {
      name: 'Prensa Deportiva Dominicana',
      url: 'https://lidom.com',
      domain: 'lidom.com',
      feedId: 'feed-espn-deportes'
    },
    author: 'Yenier Ramírez Peña / Corresponsal Deportivo',
    publishedAt: '2026-09-20T09:40:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'El emblemático Estadio Quisqueya Juan Marichal en Santo Domingo.',
    isDominican: true,
    readTimeMinutes: 3,
    socialShares: { whatsapp: 520, twitter: 310, facebook: 640, linkedin: 15 }
  },
  {
    id: 'art-3',
    title: 'Metro de Santo Domingo y Teleférico expanden líneas hacia Los Alcarrizos y Santo Domingo Este',
    excerpt: 'El Ministerio de Obras Públicas y la OPRET reportan más de 180,000 usuarios diarios beneficiados por las nuevas estaciones intermodales.',
    content: `La movilidad metropolitana del Gran Santo Domingo experimenta una transformación histórica con la operatividad plena del tramo ampliado del Metro de Santo Domingo hacia Los Alcarrizos y la integración con el sistema de autobuses OMSA y el Teleférico.

Usuarios entrevistados en las estaciones centrales destacaron el ahorro de hasta dos horas y media diarias en tiempo de traslado, además de una significativa reducción en el gasto mensual de transporte familiar. Las autoridades anunciaron la licitación para la extensión de la Línea 3 hacia el municipio Santo Domingo Este y el Aeropuerto Internacional de Las Américas (AILA).`,
    summary: [
      'Más de 180,000 pasajeros diarios se benefician de la interconexión entre Metro, Teleférico y corredores viales.',
      'Los residentes de Los Alcarrizos reducen su trayecto al Distrito Nacional en más de dos horas.',
      'Se prepara el estudio de factibilidad para la extensión ferroviaria hacia el Aeropuerto de Las Américas.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 98,
      sourceRating: 'Medio Verificado',
      verificationDetails: 'Datos verificados con reportes de la OPRET y testimonios de usuarios en campo.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Registro de pasajeros en torniquetes y telemetría de OPRET.',
        'Inspección técnica de seguridad ferroviaria internacional.'
      ]
    },
    tags: ['#SantoDomingo', '#MetroSD', '#TransporteRD', '#ObrasPublicas'],
    category: 'rd',
    subcategory: 'Infraestructura',
    source: {
      name: 'Diario Libre / ELINOTICIA',
      url: 'https://diariolibre.com',
      domain: 'diariolibre.com',
      feedId: 'feed-diariolibre'
    },
    author: 'Rosaura Henríquez / Infraestructura y Ciudad',
    publishedAt: '2026-09-20T08:50:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sistema moderno de trenes y transporte metropolitano del Metro de Santo Domingo.',
    isDominican: true,
    readTimeMinutes: 3,
    socialShares: { whatsapp: 410, twitter: 145, facebook: 380, linkedin: 42 }
  },
  {
    id: 'art-4',
    title: 'Editorial: La urgencia de un pacto educativo con enfoque en ciencias, tecnología y pensamiento crítico',
    excerpt: 'Columna editorial de ELINOTICIA: Es imperativo transformar la inversión del 4% del PIB en resultados tangibles en matemáticas, lectura comprensiva e inteligencia artificial.',
    content: `República Dominicana ha mantenido durante más de una década el compromiso fiscal del 4% para la educación preuniversitaria. Sin embargo, las evaluaciones diagnósticas y las pruebas internacionales siguen revelando brechas inadmisibles en comprensión lectora y razonamiento matemático.

El siglo XXI no espera. Con el advenimiento de la automatización y la inteligencia artificial generativa, nuestros jóvenes necesitan aulas conectadas, docentes capacitados con salarios vinculados al desempeño pedagógico y planes de estudio actualizados. La educación no puede ser rehén de disputas gremiales: debe ser la causa nacional de la patria de Duarte.`,
    summary: [
      'El 4% para la educación debe evolucionar de un logro presupuestario a un estándar estricto de calidad académica.',
      'Urgente inserción de programación, ciencias aplicadas y lectura comprensiva en escuelas públicas y liceos.',
      'Llamado a un compromiso nacional entre Estado, profesores, sector privado y familias dominicanas.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 96,
      sourceRating: 'Colaborador Autorizado',
      verificationDetails: 'Consejo Editorial de ELINOTICIA. Análisis basado en informes del IDEC y MINERD.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Evaluaciones de gasto público del 4% sustentadas por datos de Hacienda.',
        'Informes de organismos educativos regionales.'
      ]
    },
    tags: ['#Editorial', '#EducacionRD', '#PactoEducativo', '#FuturoRD'],
    category: 'opinion',
    subcategory: 'Editorial',
    source: {
      name: 'Consejo Editorial ELINOTICIA',
      url: 'https://elinoticia.com/opinion',
      domain: 'elinoticia.com',
      feedId: 'feed-acento'
    },
    author: 'Dr. Alejandro Valdez Tavárez / Director Editorial',
    publishedAt: '2026-09-20T07:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Reflexión editorial sobre el porvenir de la juventud dominicana.',
    isOpinion: true,
    isDominican: true,
    readTimeMinutes: 5,
    socialShares: { whatsapp: 290, twitter: 410, facebook: 280, linkedin: 165 }
  },
  {
    id: 'art-5',
    title: 'Cumbre Global sobre Clima aprueba fondo de resiliencia para islas del Caribe y costas vulnerables',
    excerpt: 'Delegaciones de más de 120 naciones acuerdan mecanismos de compensación rápida ante huracanes y erosión costera en el Gran Caribe.',
    content: `En la jornada de clausura de la Conferencia Climática Internacional en Ginebra, ministros de medio ambiente de la región caribeña lograron la aprobación de una línea de financiamiento contingente no reembolsable dotada de US$15,000 millones para la adaptación de infraestructuras costeras.

República Dominicana, representada por una comisión técnica, presentó los planes de rescate de dunas y manglares en Samaná, Montecristi y la costa este, recibiendo el respaldo unánime de los organismos multilaterales de crédito.`,
    summary: [
      'Aprobado fondo de 15,000 millones de dólares para naciones insulares del Caribe afectadas por eventos climáticos extremos.',
      'República Dominicana recibirá fondos preferenciales para protección de arrecifes y diques costeros.',
      'Acuerdo multilateral incluye sistemas de alerta temprana sismológica y meteorológica por satélite.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 98,
      sourceRating: 'Agencia Internacional',
      verificationDetails: 'Despacho cablegráfico validado a través de agencias Reuters y ONU Noticias.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Declaración oficial firmada por las delegaciones de la cumbre en Ginebra.',
        'Monto y cronograma de desembolsos verificados.'
      ]
    },
    tags: ['#Clima', '#Caribe', '#MedioAmbiente', '#Internacionales'],
    category: 'mundo',
    subcategory: 'Geopolítica y Clima',
    source: {
      name: 'BBC Mundo / Reuters',
      url: 'https://bbc.com/mundo',
      domain: 'bbc.com',
      feedId: 'feed-bbcmundo'
    },
    author: 'Elena Moreau / Ginebra',
    publishedAt: '2026-09-20T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Costas caribeñas beneficiarias del fondo de adaptación climática.',
    isDominican: false,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 215, twitter: 195, facebook: 310, linkedin: 78 }
  },
  {
    id: 'art-6',
    title: 'Dominicanos en Grandes Ligas: Juan Soto y Vladimir Guerrero Jr. conectan jonrones decisivos en jornada de domingo',
    excerpt: 'El poder quisqueyano se hizo sentir en las Mayores con batazos de cuatro esquinas que afianzan a sus novenas en la lucha por la postemporada.',
    content: `Una jornada memorable para los peloteros dominicanos en las Grandes Ligas. Juan Soto disparó su cuadrangular número 38 de la temporada, un misil de 425 pies al jardín derecho que volteó el marcador en el octavo episodio.

Por su parte, Vladimir Guerrero Jr. se fue de 4-3 con dos dobles y un cuadrangular solitario, extendiendo su racha de juegos conectando de hit a 18 encuentros consecutivos. Ambos toleteros dedicaron sus actuaciones a la fanaticada dominicana que sigue cada jugada desde su tierra natal.`,
    summary: [
      'Juan Soto conecta jonrón de tres carreras en el octavo inning para sellar la victoria de su escuadra.',
      'Vladimir Guerrero Jr. extiende a 18 juegos su racha consecutiva bateando por terreno seguro.',
      'Más de 85 jugadores nacidos en la República Dominicana ven acción regular esta semana en MLB.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Medio Verificado',
      verificationDetails: 'Datos corroborados por el sistema Statcast de Major League Baseball (MLB).',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Métricas de velocidad de salida y distancia de Statcast.',
        'Marcadores finales oficiales de la jornada.'
      ]
    },
    tags: ['#MLB', '#PeloterosRD', '#JuanSoto', '#PlatanoPower'],
    category: 'deportes',
    subcategory: 'Béisbol MLB',
    source: {
      name: 'ESPN Deportes',
      url: 'https://espn.com/deportes',
      domain: 'espn.com',
      feedId: 'feed-espn-deportes'
    },
    author: 'César Augusto Almonte / Corresponsal MLB',
    publishedAt: '2026-09-20T10:05:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Acción y emoción en los diamantes de las Grandes Ligas.',
    isDominican: true,
    readTimeMinutes: 3,
    socialShares: { whatsapp: 890, twitter: 540, facebook: 980, linkedin: 24 }
  },
  {
    id: 'art-7',
    title: 'EE.UU. traslada desde Haití a acusados del magnicidio de Jovenel Moïse bajo estricta custodia judicial federal',
    excerpt: 'Operativo judicial conjunto coordina el proceso de extradición y comparecencia ante tribunales federales por el magnicidio perpetrado en Puerto Príncipe.',
    content: `Autoridades del Departamento de Justicia de los Estados Unidos confirmaron la custodia y traslado formal de imputados vinculados a la conspiración y asesinato del presidente haitiano Jovenel Moïse.

El operativo, desarrollado con estrictas medidas de seguridad aeroportuaria y judicial, da curso a las imputaciones federales en tribunales de Miami bajo cargos de conspiración internacional. Organismos de derechos humanos y observadores caribeños enfatizaron la relevancia de este paso procesal para el esclarecimiento de los hechos que conmocionaron a la vecina nación.`,
    summary: [
      'Autoridades federales asumen custodia procesal de imputados clave en el caso del magnicidio de Jovenel Moïse.',
      'El proceso judicial se ventila en tribunales federales de los Estados Unidos bajo cargos de conspiración.',
      'Comunidad internacional sigue de cerca los avances judiciales para el restablecimiento de la paz en la región.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 98,
      sourceRating: 'Agencia Internacional',
      verificationDetails: 'Confirmado a través de documentos judiciales de la Fiscalía del Distrito Sur de Florida y cables diplomáticos.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Expediente judicial radicado en tribunal federal de Miami.',
        'Comunicados oficiales de agencias federales de justicia.'
      ]
    },
    tags: ['#Haiti', '#Justicia', '#Internacionales', '#Caribe'],
    category: 'mundo',
    subcategory: 'Justicia Internacional',
    source: {
      name: 'Agencias Internacionales / Reuters',
      url: 'https://reuters.com',
      domain: 'reuters.com',
      feedId: 'feed-bbcmundo'
    },
    author: 'Corresponsalía Internacional',
    publishedAt: '2026-09-20T09:50:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Tribunales y proceso judicial federal sobre el magnicidio en Haití.',
    isDominican: false,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 390, twitter: 420, facebook: 310, linkedin: 85 }
  },
  {
    id: 'art-8',
    title: 'Número de ocupados en la economía dominicana crece 2.9% interanual con récord en empleo formal',
    excerpt: 'El Banco Central reporta la creación de más de 135,000 plazas de trabajo en los sectores de servicios, manufactura y turismo durante los últimos doce meses.',
    content: `La Encuesta Nacional Continua de Fuerza de Trabajo (ENCFT) del Banco Central reveló un incremento del 2.9% interanual en el total de ocupados, alcanzando una cifra sin precedentes en el mercado laboral dominicano.

El informe destaca que más del 70% de las nuevas ocupaciones corresponden a plazas formales con acceso a la seguridad social y planes de pensiones. Los renglones más dinámicos fueron la hotelería y restaurantes, la construcción civil privada y los parques de zonas francas industriales en Santiago y San Cristóbal.`,
    summary: [
      'El número de trabajadores ocupados en República Dominicana aumenta 2.9% en comparación con el año anterior.',
      'El empleo formal encabeza las contrataciones con cobertura de seguridad social en salud y riesgos laborales.',
      'Zonas francas, turismo y construcción se consolidan como los motores principales de la ocupación productiva.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Fuente Oficial',
      verificationDetails: 'Boletín de la Encuesta Nacional Continua de Fuerza de Trabajo (ENCFT) emitido por el Banco Central.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Registro de cotizantes en la Tesorería de la Seguridad Social (TSS).',
        'Metodología de muestreo estadístico del Banco Central.'
      ]
    },
    tags: ['#EmpleoRD', '#EconomiaDominicana', '#BancoCentral', '#TrabajoRD'],
    category: 'economia',
    subcategory: 'Mercado Laboral',
    source: {
      name: 'Banco Central / ELINOTICIA',
      url: 'https://bancentral.gov.do',
      domain: 'bancentral.gov.do',
      feedId: 'feed-gnews-economia'
    },
    author: 'Redacción de Economía & Negocios',
    publishedAt: '2026-09-20T09:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Trabajadores dominicanos en actividades productivas formales.',
    isDominican: true,
    readTimeMinutes: 3,
    socialShares: { whatsapp: 450, twitter: 230, facebook: 380, linkedin: 190 }
  },
  {
    id: 'art-9',
    title: 'Wall Street y Bancos Centrales: Moderación de la inflación mundial impulsa máximos en el S&P 500 y bolsas europeas',
    excerpt: 'La Reserva Federal y el Banco Central Europeo preparan flexibilización monetaria tras datos macroeconómicos positivos que calman la volatilidad en las plazas bursátiles.',
    content: `Los mercados financieros internacionales registraron una sesión de ganancias generalizadas tras la publicación de los índices de precios al consumidor en las principales potencias económicas. La confirmación de una trayectoria descendente de la inflación ha reanimado la confianza de los inversionistas en Nueva York, Londres, Tokio y Fráncfort.

El barril de crudo Brent y el WTI operan con estabilidad en torno a los US$71, mientras que los activos de renta fija y los bonos soberanos experimentan una sólida demanda institucional. Analistas del Fondo Monetario Internacional coinciden en que la economía global avanza hacia un aterrizaje suave sin recesión severa.`,
    summary: [
      'El índice S&P 500 y el Nasdaq tocan nuevos máximos anuales respaldados por resultados trimestrales del sector corporativo.',
      'La Reserva Federal proyecta recortes graduales en el costo del dinero al consolidarse la meta de inflación del 2%.',
      'El precio del petróleo y materias primas clave se estabiliza, aliviando costos logísticos globales.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 98,
      sourceRating: 'Agencia Internacional',
      verificationDetails: 'Reporte bursátil contrastado con cotizaciones en tiempo real de la Bolsa de Nueva York (NYSE) y la Reserva Federal.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Cifras oficiales de inflación de la Oficina de Estadísticas Laborales de EE.UU. (BLS).',
        'Cotizaciones de cierre de índices Dow Jones, S&P 500 y Nasdaq.'
      ]
    },
    tags: ['#EconomiaMundial', '#WallStreet', '#BolsaDeValores', '#ReservaFederal', '#Finanzas'],
    category: 'economia',
    subcategory: 'Mercados Financieros Globales',
    source: {
      name: 'Financial Times / Reuters Economía',
      url: 'https://ft.com',
      domain: 'ft.com',
      feedId: 'feed-gnews-economia-global'
    },
    author: 'David R. Vance / Corresponsal Financiero en Nueva York',
    publishedAt: '2026-09-20T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pantallas de cotizaciones de mercados de capitales y valores en Wall Street.',
    isDominican: false,
    isBreaking: false,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 420, twitter: 380, facebook: 290, linkedin: 310 }
  },
  {
    id: 'art-10',
    title: 'Nueva generación de chips de 2 nanómetros promete acelerar la IA y reducir el consumo energético en centros de datos',
    excerpt: 'Consorcio de semiconductores en Taiwán y Silicon Valley presenta la litografía ultravioleta extrema que potenciará los smartphones y supercomputadoras de 2027.',
    content: `La industria de la microelectrónica ha alcanzado un hito trascendental con la presentación de las primeras obleas de silicio basadas en arquitectura GAAFET (Gate-All-Around) de 2 nanómetros. Esta innovación permite integrar más de 50,000 millones de transistores en un espacio microscópico, multiplicando la velocidad de inferencia de modelos de inteligencia artificial multimodal.

Con una reducción de hasta 35% en el consumo energético respecto a las generaciones previas de 3nm, los gigantes tecnológicos de Silicon Valley prevén una drástica disminución en la huella de carbono de los centros de datos que alimentan los servicios en la nube a nivel planetario.`,
    summary: [
      'La litografía de 2nm incrementa la potencia de cálculo para IA en un 40% manteniendo un consumo térmico reducido.',
      'Centros de datos de computación masiva reducirán su consumo energético hasta en un tercio.',
      'Los primeros dispositivos comerciales con estos procesadores comenzarán su distribución a escala global.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Medio Verificado',
      verificationDetails: 'Verificado a través de ponencias técnicas del Simposio Internacional de Circuitos VLSI y comunicados oficiales de los fabricantes.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Especificaciones de arquitectura física verificadas con documentación de patentes.',
        'Pruebas de laboratorio independientes de eficiencia energética.'
      ]
    },
    tags: ['#InteligenciaArtificial', '#TecnologiaMundial', '#Semiconductores', '#SiliconValley', '#Innovacion'],
    category: 'tecnologia',
    subcategory: 'Hardware & Inteligencia Artificial',
    source: {
      name: 'MIT Technology Review / Wired',
      url: 'https://technologyreview.com',
      domain: 'technologyreview.com',
      feedId: 'feed-gnews-tecno'
    },
    author: 'Dra. Sarah Lin / San Francisco, California',
    publishedAt: '2026-09-20T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Procesador de microarquitectura avanzada para cómputo de inteligencia artificial.',
    isDominican: false,
    isBreaking: false,
    readTimeMinutes: 5,
    socialShares: { whatsapp: 510, twitter: 670, facebook: 340, linkedin: 450 }
  },
  {
    id: 'art-11',
    title: 'UEFA Champions League: Real Madrid, Manchester City y Bayern Múnich se imponen con solvencia en la fase eliminatoria',
    excerpt: 'Jornada vibrante en el fútbol europeo con golazos de Vinicius Jr., Erling Haaland y Harry Kane que definen los primeros puestos de la tabla continental.',
    content: `La máxima competición de clubes del planeta ofreció otra noche inolvidable de fútbol en los estadios del Viejo Continente. En el Santiago Bernabéu, el Real Madrid superó con autoridad a su rival gracias a un doblete de Vinicius Jr. y una asistencia magistral de Jude Bellingham.

En Manchester, los 'Cityzens' de Pep Guardiola mantuvieron su invicto europeo con una exhibición ofensiva liderada por Erling Haaland. Por su parte, el Bayern Múnich se afianzó en los puestos de privilegio con solvencia defensiva. El torneo entra en su fase más decisiva ante la mirada de millones de fanáticos en todo el mundo y República Dominicana.`,
    summary: [
      'El Real Madrid y Manchester City consolidan el liderato en sus respectivos grupos con puntuación óptima.',
      'Vinicius Jr. y Erling Haaland encabezan la tabla de goleadores de la presente edición de la Champions League.',
      'La UEFA confirma récord de audiencia global en transmisiones digitales y señales satelitales.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Fuente Oficial',
      verificationDetails: 'Estadísticas oficiales de la UEFA y actas de partido validadas por las federaciones europeas.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Marcadores y actas oficiales de los encuentros de Champions League.',
        'Estadísticas de posesión, goles y amonestaciones de la UEFA.'
      ]
    },
    tags: ['#ChampionsLeague', '#RealMadrid', '#ManchesterCity', '#FutbolMundial', '#UEFA'],
    category: 'deportes',
    subcategory: 'Fútbol Europeo & Champions',
    source: {
      name: 'UEFA Champions / ESPN Deportes',
      url: 'https://espn.com/futbol',
      domain: 'espn.com',
      feedId: 'feed-gnews-deportes-global'
    },
    author: 'Mateo Fernández / Corresponsal en Madrid',
    publishedAt: '2026-09-21T02:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Acción y emoción en los céspedes de la UEFA Champions League.',
    isDominican: false,
    isBreaking: false,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 920, twitter: 840, facebook: 1200, linkedin: 35 }
  },
  {
    id: 'art-12',
    title: 'NBA al rojo vivo: Boston Celtics y Los Angeles Lakers aceleran el ritmo rumbo a los Playoffs 2026',
    excerpt: 'Duelos intensos en la Conferencia Este y Oeste definen el cuadro clasificatorio con destacadas actuaciones de las superestrellas de la liga.',
    content: `La temporada regular de la National Basketball Association (NBA) entra en su tramo culminante con una carrera frenética por los puestos de postemporada. Los Boston Celtics demostraron su poderío colectivo con una ráfaga de triples en los minutos finales para sellar su triunfo número 45 de la campaña.

En el Oeste, Los Angeles Lakers mantuvieron su impulso victorioso apoyados en la consistencia de su ofensiva de media distancia y un férreo cerrojo defensivo en la pintura. Los fanáticos dominicanos del baloncesto siguen con entusiasmo el desempeño de los jugadores de raíces caribeñas que brillan en la duela estadounidense.`,
    summary: [
      'Boston Celtics consolida el mejor porcentaje de victorias en la Conferencia Este.',
      'Los Angeles Lakers encadenan cuatro triunfos consecutivos afianzando su boleto a postemporada.',
      'El rating de la NBA en la región del Caribe y Latinoamérica registra crecimiento de doble dígito.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 98,
      sourceRating: 'Medio Verificado',
      verificationDetails: 'Reporte validado con los registros oficiales de anotación y tableros de la NBA.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Box scores oficiales de la NBA.',
        'Tabla de posiciones y margen de juegos de diferencia.'
      ]
    },
    tags: ['#NBA', '#Baloncesto', '#BostonCeltics', '#Lakers', '#Playoffs'],
    category: 'deportes',
    subcategory: 'Baloncesto NBA',
    source: {
      name: 'NBA Official / ClutchPoints',
      url: 'https://nba.com',
      domain: 'nba.com',
      feedId: 'feed-gnews-deportes-global'
    },
    author: 'Marcos Aurelio Santos / Corresponsal NBA',
    publishedAt: '2026-09-21T01:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Intensidad en la duela en la recta final de la temporada regular de la NBA.',
    isDominican: false,
    isBreaking: false,
    readTimeMinutes: 3,
    socialShares: { whatsapp: 640, twitter: 590, facebook: 710, linkedin: 18 }
  },
  {
    id: 'art-13',
    title: 'Clásico Mundial de Béisbol: República Dominicana define lista preliminar con rotación de lujo y poder estelar',
    excerpt: 'La Federación Dominicana de Béisbol (FEDOBE) y la gerencia general perfilan el roster que buscará la corona mundial con las máximas luminarias de MLB.',
    content: `La gerencia de la Selección Dominicana de Béisbol dio a conocer importantes avances en la estructuración de la nómina para el próximo Clásico Mundial de Béisbol. Con lanzadores abridores consagrados en el béisbol de las Mayores y una alineación cargada de bateadores con capacidad de cuadrangular, el equipo quisqueyano se perfila como el gran favorito del torneo.

"El compromiso de nuestros peloteros con la bandera dominicana es total. Todos han expresado su orgullo de vestir la camiseta tricolor", destacó el comité técnico durante rueda de prensa celebrada en el Centro Olímpico Juan Pablo Duarte de Santo Domingo.`,
    summary: [
      'FEDOBE avanza en la conformación del cuerpo de pitcheo abridor y relevo corto para el Clásico.',
      'Peloteros de la talla de Juan Soto, Rafael Devers y Fernando Tatis Jr. confirman su disposición patriótica.',
      'El campamento de preparación iniciará en Florida con partidos de exhibición.'
    ],
    aiVerification: {
      isVerified: true,
      credibilityScore: 99,
      sourceRating: 'Fuente Oficial',
      verificationDetails: 'Conferencia de prensa oficial de la Federación Dominicana de Béisbol (FEDOBE) y LIDOM.',
      antiSpamChecked: true,
      duplicateChecked: true,
      keyFactsVerified: [
        'Comunicado de prensa oficial de FEDOBE.',
        'Listado preliminar registrado ante Major League Baseball (WBC).'
      ]
    },
    tags: ['#ClasicoMundial', '#PlatanoPower', '#FEDOBE', '#BeisbolDominicano', '#LIDOM'],
    category: 'deportes',
    subcategory: 'Selección Dominicana & Clásico',
    source: {
      name: 'FEDOBE / Prensa Deportiva RD',
      url: 'https://fedobe.org',
      domain: 'fedobe.org',
      feedId: 'feed-gnews-lidom'
    },
    author: 'Yenier Ramírez Peña / Santo Domingo',
    publishedAt: '2026-09-21T03:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Orgullo nacional y pasión por el béisbol en la República Dominicana.',
    isDominican: true,
    isBreaking: true,
    readTimeMinutes: 4,
    socialShares: { whatsapp: 1540, twitter: 1120, facebook: 2100, linkedin: 45 }
  }
];

export const INITIAL_PODCASTS: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'El Pulso de la Mañana: Claves de la economía dominicana y el auge del turismo',
    show: 'ELINOTICIA Matinal',
    host: 'Carmen Lidia Santos & Lic. Mariano de la Cruz',
    category: 'Economía & Análisis',
    duration: '14:20',
    durationSeconds: 860,
    publishedAt: '2026-09-20T07:00:00Z',
    audioUrl: 'https://cdn.freesound.org/previews/563/563148_11861866-lq.mp3',
    summary: 'Análisis detallado de las cifras del Banco Central, la apertura de nuevos vuelos en Punta Cana y Santiago, y la estabilidad de la canasta básica.',
    transcript: `Bienvenidos a El Pulso de la Mañana de ELINOTICIA. Hoy revisamos las cifras que sitúan a República Dominicana como la economía con mayor proyección de crecimiento en el Caribe insular. Hablamos con analistas sobre el impacto de la inversión en Pedernales y el comportamiento del tipo de cambio frente al dólar estadounidense. En el segundo bloque, exploramos las perspectivas de la reforma tributaria integral y su impacto en la clase media trabajadora.`,
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Proyección de crecimiento del PIB de 5.1% según el Banco Central.',
      'Récord histórico de inversión turística en el polo suroeste.',
      'Perspectivas de inflación y estabilidad cambiaria para el próximo trimestre.'
    ],
    hasVideoStream: true,
    streamData: {
      channelName: 'ELINOTICIA TV • Canal 24 Digital',
      isLive: true,
      viewerCount: 2840,
      currentSegment: 'Bloque Económico: Debate de Perspectivas Financieras 2026',
      programSchedule: 'Lunes a Viernes • 7:00 AM - 10:00 AM AST',
      streamResolution: '1080p HD • 60 FPS',
      cameras: [
        {
          id: 'cam-1',
          name: 'Cámara 1: Cabina Master General',
          label: 'CAM 1 • Master',
          cameraType: 'main',
          previewImageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
          description: 'Vista panorámica de la cabina de radiodifusión, micrófonos Shure y mesa de producción.',
          viewAngle: 'Gran angular 24mm (Plano general de cabina)'
        },
        {
          id: 'cam-2',
          name: 'Cámara 2: Mesa de Comentaristas',
          label: 'CAM 2 • Comentaristas',
          cameraType: 'commentators',
          previewImageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
          description: 'Primer plano directo a los presentadores Carmen Lidia Santos y Lic. Mariano de la Cruz.',
          viewAngle: 'Enfoque medio 50mm f/1.8 (Mesa de análisis)'
        },
        {
          id: 'cam-3',
          name: 'Cámara 3: Set de Invitados Especiales',
          label: 'CAM 3 • Invitados',
          cameraType: 'guests',
          previewImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
          description: 'Enfoque dedicado al panel de invitados y entrevistados en directo.',
          viewAngle: 'Plano corto 85mm (Panel de personalidades)'
        },
        {
          id: 'cam-4',
          name: 'Cámara 4: Pantalla Dividida (Dúo Debate)',
          label: 'CAM 4 • Split Screen',
          cameraType: 'split',
          previewImageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
          description: 'Señal combinada en vivo: Comentarista en cabina e invitado en enlace con zócalo interactivo.',
          viewAngle: 'Mezclador de producción de televisión'
        }
      ],
      commentators: [
        {
          id: 'comm-1',
          name: 'Carmen Lidia Santos',
          role: 'Directora de Contenidos & Analista de Coyuntura',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          isSpeaking: true,
          notes: 'Conduce el bloque económico sobre divisas y reservas internacionales.',
          cameraRef: 'cam-2'
        },
        {
          id: 'comm-2',
          name: 'Lic. Mariano de la Cruz',
          role: 'Abogado Constitucionalista y Comentarista Político',
          avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
          isSpeaking: false,
          notes: 'Analiza el impacto legislativo de las nuevas reformas aduaneras y tributarias.',
          cameraRef: 'cam-2'
        },
        {
          id: 'comm-3',
          name: 'Lic. Yenier Ramírez',
          role: 'Mesa de Datos & Reacciones Ciudadanas',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          isSpeaking: false,
          notes: 'Monitorea comentarios de WhatsApp y redes sociales de los oyentes.',
          cameraRef: 'cam-1'
        }
      ],
      guests: [
        {
          id: 'guest-1',
          name: 'Ing. Roberto Herrera',
          title: 'Consultor Económico & Exdirectivo del Conep',
          organization: 'Cámara de Comercio y Producción',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          topic: 'Inversión privada en el polo turístico de Pedernales y equilibrio fiscal',
          connectionType: 'Presencial en Cabina',
          isSpeaking: true,
          cameraRef: 'cam-3'
        },
        {
          id: 'guest-2',
          name: 'Licda. Altagracia Salazar',
          title: 'Analista de Políticas Públicas y Transparencia',
          organization: 'Foro Ciudadano Dominicano',
          avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          topic: 'Supervisión del gasto social y modernización institucional del Estado',
          connectionType: 'Enlace Satelital 4K',
          isSpeaking: false,
          cameraRef: 'cam-3'
        }
      ],
      tickerNews: [
        'BANCO CENTRAL: Economía dominicana se proyecta líder del Caribe con 5.1% de crecimiento.',
        'TURISMO RD: Aeropuertos de Punta Cana y Santiago registran nuevo récord histórico de pasajeros.',
        'TASA DE CAMBIO: Dólar cotiza a RD$59.90 compra / RD$60.15 venta en ventanilla bancaria.',
        'REFORMA FISCAL: Mesa de diálogo convoca a sectores empresariales, laborales y académicos.',
        'EN VIVO: Envía tus preguntas por WhatsApp al (809) 555-ELINOTICIA para Carmen Lidia y panelistas.'
      ]
    }
  },
  {
    id: 'pod-2',
    title: 'Pelota y Tradición: La previa de LIDOM y el legado dominicano en Cooperstown',
    show: 'Fiebre Quisqueyana',
    host: 'Yenier Ramírez Peña & Juan Carlos Báez',
    category: 'Deportes',
    duration: '22:45',
    durationSeconds: 1365,
    publishedAt: '2026-09-19T18:30:00Z',
    audioUrl: 'https://cdn.freesound.org/previews/612/612610_5674468-lq.mp3',
    summary: 'Todo lo que necesitas saber antes del playball de la pelota invernal dominicana. Pronósticos para Licey, Águilas, Escogido, Gigantes, Toros y Estrellas.',
    transcript: `¡Saludos fanáticos del béisbol! Bienvenidos a Fiebre Quisqueyana. Hoy desglosamos las nóminas confirmadas de los seis equipos de nuestra LIDOM. Analizamos el pitcheo abridor de los Tigres del Licey, los refuerzos importados de las Águilas Cibaeñas y la promesa joven que trae el Escogido. Además, conversamos sobre los dominicanos con mayores probabilidades de ingresar al Salón de la Fama de Cooperstown en las próximas votaciones.`,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Análisis posición por posición de las rotaciones de LIDOM.',
      'Debate sobre los peloteros dominicanos elegibles para Cooperstown.',
      'Novedades reglamentarias aplicables a partir de esta campaña invernal.'
    ]
  },
  {
    id: 'pod-3',
    title: 'Geopolítica al Instante: Conflictos globales, energía y el rol de Latinoamérica',
    show: 'ELINOTICIA Global',
    host: 'Dr. Alejandro Valdez Tavárez',
    category: 'Internacional',
    duration: '18:10',
    durationSeconds: 1090,
    publishedAt: '2026-09-18T16:00:00Z',
    audioUrl: 'https://cdn.freesound.org/previews/536/536108_11861866-lq.mp3',
    summary: 'Un recorrido perspicaz por las tensiones energéticas globales, los acuerdos comerciales en el hemisferio y los desafíos de seguridad marítima.',
    transcript: `En esta edición de ELINOTICIA Global, examinamos los cambios tectónicos en el comercio marítimo internacional y los precios del crudo. ¿Cómo repercute la volatilidad de los fletes en las economías importadoras como las de Centroamérica y el Caribe? Analizamos las alternativas de transición energética y los acuerdos bilaterales suscritos por los gobiernos de la región.`,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    keyTakeaways: [
      'Impacto de los costos logísticos globales en la canasta familiar.',
      'Diversificación de la matriz energética con renovables en el Caribe.',
      'Diplomacia multilateral y estabilidad de las rutas comerciales.'
    ]
  }
];
